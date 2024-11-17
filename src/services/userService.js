import omit from "lodash/omit.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import { AppError } from "../utils/errorHandler.js";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";
import { StatusCodes } from "http-status-codes";
import { uploadImg } from "../utils/uploadImg.js";

const SALT_ROUNDS = 10;

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword,
  });
  return omit(user, ["password"]);
};

const findUserByEmail = async ({ email }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  return omit(user, ["password"]);
};

const login = async (data) => {
  const user = await userRepository.findUserByEmail(data.email);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new AppError({
      message: MESSAGES.AUTH.LOGIN_FAILURE,
      errorCode: ERROR_CODES.AUTH.LOGIN_FAILED,
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  }
  return omit(user, ["password"]);
};

const findUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  return omit(user, ["password"]);
};

const updateUser = async (id, data) => {
  const newData = { ...data };
  if (data.avatarUrl) {
    const newImg = await uploadImg(data.avatarUrl, id, true, true);
    newData.avatarUrl = newImg.secure_url;
  }
  const updatedUser = await userRepository.updateUser(id, newData);
  return omit(updatedUser, ["password"]);
};

const changePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError({
      message: MESSAGES.AUTH.PASSWORD_INVALID,
      errorCode: ERROR_CODES.AUTH.PASSWORD_INVALID,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const updatedUser = await userRepository.updateUser(userId, {
    password: hashedPassword,
  });
  return omit(updatedUser, ["password"]);
};

export default {
  createUser,
  findUserByEmail,
  login,
  findUserById,
  updateUser,
  changePassword,
};
