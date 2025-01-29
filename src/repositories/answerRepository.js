import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAnswer = async (
  userId,
  attemptId,
  questionId,
  quizId,
  answer,
  isCorrect
) => {
  const res = await prisma.userAnswer.create({
    data: {
      userId,
      attemptId,
      questionId,
      quizId,
      answer,
      isCorrect,
    },
  });
  return res;
};

export default { createAnswer };
