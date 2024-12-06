import MESSAGES from "../constants/messages.js";
import quizService from "../services/quizService.js";
import catchAsync from "../utils/catchAsync.js";

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

const createFillInTheBlankQuestion = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, answers } = req.body;
  const result = await quizService.createFillInTheBlankQuestion(
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
  updateAllQuestions,
  updateQuestion,
  createFillInTheBlankQuestion,
  createMultipleChoiceQuestion,
  deleteQuestion
};
