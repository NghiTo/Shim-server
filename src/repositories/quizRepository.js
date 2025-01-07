import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBlankQuiz = async (userId, quizCode) => {
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

const getAllQuizzes = async (query) => {
  const quizzes = await prisma.quiz.findMany({
    where: { ...query },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      user: true,
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

const findQuizByQuizCode = async (quizCode) => {
  const quiz = await prisma.quiz.findUnique({
    where: { quizCode },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      user: true,
    },
  });
  return quiz;
};

const createQuizAttempt = async (userId, quizId) => {
  const newQuizAttempt = await prisma.userQuizAttempt.create({
    data: {
      userId,
      quizId,
    },
  });
  return newQuizAttempt;
};

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  getAllQuizzes,
  deleteQuiz,
  findQuizByQuizCode,
  createQuizAttempt
};
