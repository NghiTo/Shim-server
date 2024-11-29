import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import quizRepository from "../repositories/quizRepository.js";
import userRepository from "../repositories/userRepository.js";
import { AppError } from "../utils/errorHandler.js";

const createBlankQuiz = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const quiz = await quizRepository.createBlankQuiz(userId);
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

const updateQuiz = async (quizId, data) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const updatedQuiz = await quizRepository.updateQuiz(quizId, data);
  return updatedQuiz;
};

const createMultipleChoiceQuestion = async (quizId, title, answers) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const question = await quizRepository.createMultipleChoiceQuestion(
    quizId,
    title,
    answers
  );
  return question;
};

const getAllQuestions = async (quizId) => {
  const questions = await quizRepository.getAllQuestions(quizId);
  return questions;
};

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  createMultipleChoiceQuestion,
  getAllQuestions,
};
