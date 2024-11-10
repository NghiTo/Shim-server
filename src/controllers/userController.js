import { StatusCodes } from "http-status-codes";
import userService from "../services/userService.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const createUser = async (req, res, next) => {
  const result = await userService.createUser(req.body);
  res.status(StatusCodes.OK).json(result);
};

const findUserByEmail = async (req, res, next) => {
  const result = await userService.findUserByEmail(req.body);
  res.status(StatusCodes.OK).json(result);
};

export default { createUser, findUserByEmail };
