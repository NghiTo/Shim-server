import { StatusCodes } from "http-status-codes";
import userService from "../services/userService.js";
import MESSAGES from "../constants/messages.js";
import catchAsync from "../utils/catchAsync.js";
import { generateTokens } from "../utils/generateTokens.js";

const createUser = catchAsync(async (req, res, next) => {
  const result = await userService.createUser(req.body);
  const { accessToken, refreshToken } = generateTokens(result);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 15,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    message: MESSAGES.USER.CREATE_SUCCESS,
    data: result,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const findUserByEmail = catchAsync(async (req, res, next) => {
  const result = await userService.findUserByEmail(req.body);
  res.status(StatusCodes.OK).json(result);
});

const login = catchAsync(async (req, res, next) => {
  const result = await userService.login(req.body);
  const { accessToken, refreshToken } = generateTokens(result);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    message: MESSAGES.AUTH.LOGIN_SUCCESS,
    data: result,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const findUserById = catchAsync(async (req, res, next) => {
  const result = await userService.findUserById(req.params.userId);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.FIND_SUCCESS, data: result });
});

const updateUser = catchAsync(async (req, res, next) => {
  const result = await userService.updateUser(req.params.userId, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.UPDATE_SUCCESS, data: result });
});

const changePassword = catchAsync(async (req, res, next) => {
  const result = await userService.changePassword(req.params.userId, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.AUTH.PASSWORD_UPDATE_SUCCESS, data: result });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const result = await userService.deleteUser(req.params.userId);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(StatusCodes.OK).json({ message: result });
});

export default {
  createUser,
  findUserByEmail,
  login,
  findUserById,
  updateUser,
  changePassword,
  deleteUser,
};
