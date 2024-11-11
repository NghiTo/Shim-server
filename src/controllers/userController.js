import { StatusCodes } from "http-status-codes";
import userService from "../services/userService.js";
import MESSAGES from "../constants/messages.js";
import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/errorHandler.js";
import ERROR_CODES from "../constants/errorCode.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const createUser = catchAsync(async (req, res, next) => {
  const result = await userService.createUser(req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.CREATE_SUCCESS, data: result });
});

const findUserByEmail = catchAsync(async (req, res, next) => {
  const result = await userService.findUserByEmail(req.body);
  if (result) {
    res.status(StatusCodes.OK).json(result);
  } else {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
});

export default { createUser, findUserByEmail };
