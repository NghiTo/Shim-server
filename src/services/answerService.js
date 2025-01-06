import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import userRepository from "../repositories/userRepository.js";
import { AppError } from "../utils/errorHandler.js";
import answerRepository from "../repositories/answerRepository.js";
import quizRepository from "../repositories/quizRepository.js";
import questionRepository from "../repositories/questionRepository.js";

const createAnswer = async (userId, questionId, quizId, answer) => {
  const user = userRepository.findUserById(userId);
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const quiz = quizRepository.findQuizById(quizId);
  if (!quiz) {
    throw new AppError({
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const question = await questionRepository.findQuestionById(questionId);
  if (!question) {
    throw new AppError({
      message: MESSAGES.QUIZ.QUESTION_NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.QUESTION_NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const isCorrect = question.answers.find((ans) => ans.content === answer).isCorrect;
  const res = answerRepository.createAnswer(
    userId,
    questionId,
    quizId,
    answer,
    isCorrect
  );
  return res;
};

export default { createAnswer };
