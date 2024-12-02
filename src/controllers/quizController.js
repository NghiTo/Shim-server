import { StatusCodes } from "http-status-codes";
import quizService from "../services/quizService.js";
import catchAsync from "../utils/catchAsync.js";
import MESSAGES from "../constants/messages.js";

const createBlankQuiz = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const result = await quizService.createBlankQuiz(userId);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.CREATE_SUCCESS, data: result });
});

const findQuizById = catchAsync(async (req, res, next) => {
  const result = await quizService.findQuizById(req.params.quizId);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.CREATE_SUCCESS, data: result });
});

const updateQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const data = req.body;
  const result = await quizService.updateQuiz(quizId, data);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

const getAllQuizzes = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const result = await quizService.getAllQuizzes(userId, req.query);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.FIND_SUCCESS, data: result });
});

const createMultipleChoiceQuestion = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, answers } = req.body;
  const result = await quizService.createMultipleChoiceQuestion(
    quizId,
    title,
    answers
  );
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

const deleteQuestion = catchAsync(async (req, res, next) => {
  const { quizId, questionId } = req.params;
  const result = await quizService.deleteQuestion(quizId, questionId);
  res.status(StatusCodes.OK).json({ message: result });
});

const updateQuestion = catchAsync(async (req, res, next) => {
  const { questionId } = req.params;
  const data = req.body;
  const result = await quizService.updateQuestion(questionId, data);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

const updateAllQuestions = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const data = req.body;
  const result = await quizService.updateAllQuestions(quizId, data);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  createMultipleChoiceQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuizzes,
  updateAllQuestions
};
