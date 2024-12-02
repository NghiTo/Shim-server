import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBlankQuiz = async (userId) => {
  const newQuiz = await prisma.quiz.create({
    data: {
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

const createMultipleChoiceQuestion = async (quizId, title, answers) => {
  const question = await prisma.question.create({
    data: {
      title,
      type: "multipleChoice",
      quizId,
      point: 1,
      time: 5,
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

const findQuestionById = async (questionId) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      answers: true,
    },
  });
  return question;
};

const deleteQuestion = async (questionId) => {
  return await prisma.question.delete({
    where: { id: questionId },
  });
};

const updateQuestion = async (questionId, data) => {
  const question = await prisma.question.update({
    where: { id: questionId },
    data,
  });
  return question;
};

const updateAllQuestions = async (quizId, data) => {
  const updatedQuestions = await prisma.question.updateMany({
    where: { quizId },
    data,
  });
  return updatedQuestions;
};

export default {
  createBlankQuiz,
  findQuizById,
  updateQuiz,
  createMultipleChoiceQuestion,
  deleteQuestion,
  findQuestionById,
  updateQuestion,
  getAllQuizzes,
  updateAllQuestions,
};
