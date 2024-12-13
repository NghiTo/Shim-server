import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import questionService from "../services/questionService.js";
import catchAsync from "../utils/catchAsync.js";

const createMultipleChoiceQuestion = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, answers } = req.body;
  const result = await questionService.createMultipleChoiceQuestion(
    quizId,
    title,
    answers
  );
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

const createFillInTheBlankQuestion = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, answers } = req.body;
  const result = await questionService.createFillInTheBlankQuestion(
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
  const result = await questionService.deleteQuestion(quizId, questionId);
  res.status(StatusCodes.OK).json({ message: result });
});

const updateQuestion = catchAsync(async (req, res, next) => {
  const { questionId } = req.params;
  const data = req.body;

  const result = await questionService.updateQuestion(questionId, data);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

const updateAllQuestions = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const data = req.body;
  const result = await question.updateAllQuestions(quizId, data);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: result });
});

export default {
  updateAllQuestions,
  updateQuestion,
  createFillInTheBlankQuestion,
  createMultipleChoiceQuestion,
  deleteQuestion,
};
