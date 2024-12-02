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
  const newData = { ...data };
  if (data.coverImg) {
    const newImg = await uploadImg(data.coverImg, quizId, true, true);
    newData.coverImg = newImg.secure_url;
  }
  const updatedQuiz = await quizRepository.updateQuiz(quizId, newData);
  return updatedQuiz;
};

const getAllQuizzes = async (userId, query) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const quizzes = await quizRepository.getAllQuizzes(userId, query);
  return quizzes;
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

const deleteQuestion = async (quizId, questionId) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const question = await quizRepository.findQuestionById(questionId);
  if (!question) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.QUESTION_NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.QUESTION_NOT_FOUND,
    });
  }
  await quizRepository.deleteQuestion(questionId);
  return MESSAGES.QUIZ.QUESTION_DELETE_SUCCESS;
};

const updateQuestion = async (questionId, data) => {
  const question = await quizRepository.findQuestionById(questionId);
  if (!question) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.QUESTION_NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.QUESTION_NOT_FOUND,
    });
  }
  const updatedQuestion = await quizRepository.updateQuestion(questionId, data);
  return updatedQuestion;
};

const updateAllQuestions = async (quizId, data) => { 
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const questions = await quizRepository.updateAllQuestions(quizId, data)
  return questions;
}

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  createMultipleChoiceQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuizzes,
  updateAllQuestions,
};
