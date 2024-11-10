import { StatusCodes } from "http-status-codes";
import userService from "../services/userService.js";
import MESSAGES from "../constants/messages.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const createUser = async (req, res, next) => {
  const result = await userService.createUser(req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.CREATE_SUCCESS, data: result });
};

const findUserByEmail = async (req, res, next) => {
  const result = await userService.findUserByEmail(req.body);
  if (result) {
    res.status(StatusCodes.OK).json(result);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: MESSAGES.USER.NOT_FOUND });
  }
};

export default { createUser, findUserByEmail };
