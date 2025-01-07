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
    .json({ message: MESSAGES.QUIZ.FIND_SUCCESS, data: result });
});

const getAllQuizzes = catchAsync(async (req, res, next) => {
  const result = await quizService.getAllQuizzes(req.query);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.FIND_SUCCESS, data: result });
});

const updateQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const data = req.body;
  const result = await quizService.updateQuiz(quizId, data);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

const deleteQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const result = await quizService.deleteQuiz(quizId);
  res.status(StatusCodes.OK).json({ message: result });
});

const createQuizAttempt = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { userId } = req.user;
  const result = await quizService.createQuizAttempt(userId, quizId);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.ATTEMPT_CREATE_SUCCESS, data: result });
});

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  createQuizAttempt
};
