import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import answerService from "../services/answerService.js";
import catchAsync from "../utils/catchAsync.js";

const createAnswer = catchAsync(async (req, res, next) => {
  const { userId, attemptId, questionId, quizId, answer } = req.body;
  const result = await answerService.createAnswer(
    userId,
    attemptId,
    questionId,
    quizId,
    answer
  );
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.ANSWER.CREATE_SUCCESS, data: result });
});

export default { createAnswer };
