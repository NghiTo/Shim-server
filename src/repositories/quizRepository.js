import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBlankQuiz = async (userId) => {
  const newQuiz = await prisma.quiz.create({
    data: {
      title: "Untitled quiz",
      subject: "",
      grade: "",
      point: 1,
      time: 5,
      isPublic: true,
      userId,
    },
  });
  return newQuiz;
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

const createMultipleChoiceQuestion = async (quizId, title, answers) => {
  const question = await prisma.question.create({
    data: {
      title,
      type: "multipleChoice",
      quizId,
      answers: {
        create: answers.map((answer) => ({
          content: answer.content,
          imageUrl: answer.imageUrl || null,
          isCorrect: !!answer.isCorrect,
        })),
      },
    },
    include: {
      answers: true,
    },
  });
  return question;
};

const getAllQuestions = async (quizId) => {
  const questions = await prisma.question.findMany({
    where: { quizId },
    include: {
      answers: true,
    },
  });
  return questions;
};

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  createMultipleChoiceQuestion,
  getAllQuestions,
};
