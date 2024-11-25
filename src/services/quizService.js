import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import quizRepository from "../repositories/quizRepository.js";
import userRepository from "../repositories/userRepository.js";
import { AppError } from "../utils/errorHandler.js";

const createQuiz = async ({
  title,
  subject,
  grade,
  point,
  time,
  isPublic,
  userId,
  questions,
}) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const quiz = await quizRepository.createQuiz({
    title,
    subject,
    grade,
    point,
    time,
    isPublic,
    userId,
    questions,
  });
  return quiz;
};

export default { createQuiz };
