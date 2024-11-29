import { StatusCodes } from "http-status-codes";
import quizService from "../services/quizService.js";
import catchAsync from "../utils/catchAsync.js";
import MESSAGES from "../constants/messages.js";

const createBlankQuiz = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
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

const getAllQuestions = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const result = await quizService.getAllQuestions(quizId);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
})

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  createMultipleChoiceQuestion,
  getAllQuestions
};
