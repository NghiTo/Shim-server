import { StatusCodes } from "http-status-codes";
import quizService from "../services/quizService.js";
import catchAsync from "../utils/catchAsync.js";

const createQuiz = catchAsync(async (req, res, next) => {
  const { title, subject, grade, point, time, isPublic, userId, questions } =
    req.body;
  const result = await quizService.createQuiz({
    title,
    subject,
    grade,
    point,
    time,
    isPublic,
    userId,
    questions,
  });
  res
    .status(StatusCodes.OK)
    .json({ message: "Quiz created successfully", data: result });
});

export default { createQuiz };
