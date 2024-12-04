import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import nodemailer from "nodemailer";
import userService from "../services/userService.js";
import { generateTokens } from "../utils/generateTokens.js";

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

export default {
  generateNewToken,
  sendOtp,
  verifyOtp,
  loginWithGoogle,
};
