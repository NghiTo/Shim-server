import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import quizRepository from "../repositories/quizRepository.js";
import userRepository from "../repositories/userRepository.js";
import { AppError } from "../utils/errorHandler.js";
import { uploadImg } from "../utils/uploadImg.js";

const createBlankQuiz = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  let quizCode;
  let isUnique = false;

  while (!isUnique) {
    quizCode = Math.floor(10000000 + Math.random() * 90000000);
    const existingQuiz = await quizRepository.findQuizByQuizCode(quizCode);

    if (!existingQuiz) {
      isUnique = true;
    }
  }
  const quiz = await quizRepository.createBlankQuiz(userId, quizCode);
  return quiz;
};

const findQuizById = async (quizId) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  return quiz;
};

const getAllQuizzes = async (query) => {
  if (query.quizCode) {
    query.quizCode = parseInt(query.quizCode);
    const quiz = await quizRepository.findQuizByQuizCode(query.quizCode);
    return quiz;
  }
  const quizzes = await quizRepository.getAllQuizzes(query);
  return quizzes;
};

const updateQuiz = async (quizId, data) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const newData = { ...data };
  if (data.coverImg) {
    const newImg = await uploadImg(data.coverImg, quizId, true, true);
    newData.coverImg = newImg.secure_url;
  }
  const updatedQuiz = await quizRepository.updateQuiz(quizId, newData);
  return updatedQuiz;
};

const deleteQuiz = async (quizId) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  await quizRepository.deleteQuiz(quizId);
  return MESSAGES.QUIZ.DELETE_SUCCESS;
};

const createQuizAttempt = async (userId, quizId) => {
  const user = userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const quizAttempt = await quizRepository.createQuizAttempt(userId, quizId);
  return quizAttempt;
};

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  createQuizAttempt,
};
