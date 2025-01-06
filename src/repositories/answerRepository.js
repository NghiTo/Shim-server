import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAnswer = async (userId, questionId, quizId, answer, isCorrect) => {
  const res = await prisma.userAnswer.create({
    data: {
      userId,
      questionId,
      quizId,
      answer,
      isCorrect,
    },
  });
  return res;
};

const findAnswer = async (answer) => {
    const res = await prisma.answer.findUnique({
      where: { content: answer },
    });
    return res.isCorrect;
}

export default { createAnswer, findAnswer };
