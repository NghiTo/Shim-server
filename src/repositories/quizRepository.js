import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBlankQuiz = async (userId) => {
  const quizCode = Math.floor(10000000 + Math.random() * 90000000);
  const newQuiz = await prisma.quiz.create({
    data: {
      quizCode,
      title: "Untitled quiz",
      subject: "",
      grade: "",
      isPublic: true,
      status: "unFinished",
      userId,
    },
  });
  return newQuiz;
};

const getAllQuizzes = async (userId, query) => {
  const quizzes = await prisma.quiz.findMany({
    where: { userId, ...query },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return quizzes;
};

const findQuizById = async (quizId) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
  return quiz;
};

const updateQuiz = async (quizId, data) => {
  const updatedQuiz = await prisma.quiz.update({
    where: { id: quizId },
    data,
  });
  return updatedQuiz;
};

const deleteQuiz = async (quizId) => {
  return await prisma.quiz.delete({ where: { id: quizId } });
};

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  getAllQuizzes,
  deleteQuiz,
};
