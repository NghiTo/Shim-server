import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import nodemailer from "nodemailer";
import userService from "../services/userService.js";
import { generateTokens } from "../utils/generateTokens.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const generateNewToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError({
      message: MESSAGES.AUTH.TOKEN_INVALID,
      errorCode: ERROR_CODES.AUTH.TOKEN_INVALID,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new AppError({
        message: MESSAGES.AUTH.TOKEN_INVALID,
        errorCode: ERROR_CODES.AUTH.TOKEN_INVALID,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 15,
    });

    return res.json({ accessToken: newAccessToken });
  });
});

const otpStore = {};

const sendOtp = catchAsync(async (req, res, next) => {
  const { email } = await userService.findUserById(req.user.userId);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Verify Your Account</h2>
      <p style="font-size: 16px; color: #555;">
        Hello, 
      </p>
      <p style="font-size: 16px; color: #555;">
        You requested to delete your Shim account. Please use the following OTP to verify your identity:
      </p>
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #4caf50;">
        ${otp}
      </p>
      <p style="font-size: 16px; color: #555;">
        If you did not request this action, please ignore this email or contact our support team.
      </p>
      <p style="font-size: 14px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Shim Inc. All rights reserved.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: {
      name: "Shim",
      address: process.env.MAIL_USERNAME,
    },
    to: email,
    subject: "OTP for deleting Shim account (no reply)",
    html: htmlContent,
  });

  res.status(StatusCodes.OK).json({ message: "Email sent successfully" });
});

const verifyOtp = catchAsync(async (req, res, next) => {
  const { email } = await userService.findUserById(req.user.userId);
  const { otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.status(StatusCodes.OK).json({ message: "Valid OTP" });
  } else {
    throw new AppError({
      message: MESSAGES.AUTH.OTP_INVALID,
      errorCode: ERROR_CODES.AUTH.OTP_INVALID,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
});

const loginWithGoogle = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const user = await userService.findUserById(id);
  const { accessToken, refreshToken } = generateTokens(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 6000 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    message: MESSAGES.AUTH.LOGIN_SUCCESS,
    data: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.findUserByEmail(email);
  const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #fe5f5c; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Reset Your Shim Account Password</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p>Dear <strong>User</strong>,</p>
        <p>We received a request to reset your password for your Shim account associated with this email address. To reset your password, please click on the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" 
            style="background-color: #fe5f5c; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p>If you did not request this password reset, please ignore this email or contact our support team if you have concerns.</p>
        <p>This link will expire in <strong>15 minutes</strong>.</p>
        <p>Thank you,</p>
        <p>The Shim Team</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">If you have any questions, feel free to contact us at <a href="mailto:support@shim.com" style="color: #fe5f5c;">support@shim.com</a>.</p>
        <p style="margin: 0;">&copy; 2024 Shim. All rights reserved.</p>
      </div>
    </div>
  </div>
`;

  await transporter.sendMail({
    from: {
      name: "Shim",
      address: process.env.MAIL_USERNAME,
    },
    to: email,
    subject: "Reset Shim account password(no reply)",
    html: htmlContent,
  });
  res.status(StatusCodes.OK).json({ message: "Email sent successfully" });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token, password } = req.body;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userService.updateUser(decoded.userId, {
    password: hashedPassword,
  });
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.AUTH.PASSWORD_UPDATE_SUCCESS, data: user });
});

export default {
  generateNewToken,
  sendOtp,
  verifyOtp,
  loginWithGoogle,
  forgotPassword,
  resetPassword,
};
