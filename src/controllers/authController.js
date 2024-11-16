import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";

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

export default { generateNewToken };
