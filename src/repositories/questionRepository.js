import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const createFillInTheBlankQuestion = async (quizId, title, answers) => {
  const question = await prisma.question.create({
    data: {
      title,
      type: "fillInTheBlank",
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

const updateAnswers = async (questionId, answers) => {
    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        answers: {
          update: answers
            .filter((answer) => answer.id)
            .map((answer) => ({
              where: { id: answer.id },
              data: {
                content: answer.content,
                imageUrl: answer.imageUrl || null,
                isCorrect: !!answer.isCorrect,
              },
            })),
          create: answers
            .filter((answer) => !answer.id)
            .map((answer) => ({
              content: answer.content,
              isCorrect: !!answer.isCorrect,
            })),
        },
      },
      include: {
        answers: true,
      },
    });
  
    return updatedQuestion;
  };

export default {
  createFillInTheBlankQuestion,
  createMultipleChoiceQuestion,
  updateAllQuestions,
  updateQuestion,
  deleteQuestion,
  findQuestionById,
  updateAnswers
};
