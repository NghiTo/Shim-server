import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";
import ERROR_CODES from "../constants/errorCode.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(
      new AppError({
        message: MESSAGES.AUTH.UNAUTHORIZED,
        statusCode: StatusCodes.UNAUTHORIZED,
        errorCode: ERROR_CODES.AUTH.UNAUTHORIZED,
      })
    );
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new AppError({
            message: MESSAGES.AUTH.TOKEN_EXPIRED,
            statusCode: StatusCodes.UNAUTHORIZED,
            errorCode: ERROR_CODES.AUTH.TOKEN_EXPIRED,
          })
        );
      } else {
        return next(
          new AppError({
            message: MESSAGES.AUTH.TOKEN_INVALID,
            statusCode: StatusCodes.UNAUTHORIZED,
            errorCode: ERROR_CODES.AUTH.TOKEN_INVALID,
          })
        );
      }
    }
    req.user = decoded;

    next();
  });
};
