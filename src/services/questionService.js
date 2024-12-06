import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";
import questionRepository from "../repositories/questionRepository.js";
import quizRepository from "../repositories/quizRepository.js";

const createMultipleChoiceQuestion = async (quizId, title, answers) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const question = await questionRepository.createMultipleChoiceQuestion(
    quizId,
    title,
    answers
  );
  return question;
};

const createFillInTheBlankQuestion = async (quizId, title, answers) => {
  const quiz = await quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
    });
  }
  const question = await questionRepository.createFillInTheBlankQuestion(
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
  const question = await questionRepository.findQuestionById(questionId);
  if (!question) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.QUESTION_NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.QUESTION_NOT_FOUND,
    });
  }
  await questionRepository.deleteQuestion(questionId);
  return MESSAGES.QUIZ.QUESTION_DELETE_SUCCESS;
};

const updateQuestion = async (questionId, data) => {
  const question = await questionRepository.findQuestionById(questionId);
  if (!question) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.QUIZ.QUESTION_NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.QUESTION_NOT_FOUND,
    });
  }
  const { answers, ...newData } = data;
  let updatedQuestion = await questionRepository.updateQuestion(
    questionId,
    newData
  );
  if (answers) {
    updatedQuestion = await questionRepository.updateAnswers(
      questionId,
      answers
    );
  }
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
  const questions = await questionRepository.updateAllQuestions(quizId, data);
  return questions;
};

export default {
  updateAllQuestions,
  updateQuestion,
  createFillInTheBlankQuestion,
  createMultipleChoiceQuestion,
  deleteQuestion,
};
