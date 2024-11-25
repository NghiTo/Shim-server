import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createQuiz = async ({
  title,
  subject,
  grade,
  point,
  time,
  isPublic,
  userId,
  questions,
}) => {
  console.log(questions);
  
  const quiz = await prisma.quiz.create({
    data: {
      title,
      subject,
      grade,
      point,
      time,
      isPublic,
      userId,
      questions: {
        create: questions.map((question) => ({
          title: question.title,
          type: question.type,
          answers: {
            create: question.answers.map((answer) => ({
              content: answer.content,
              isCorrect: answer.isCorrect,
            })),
          },
        })),
      },
    },
  });
  return quiz;
};

export default { createQuiz };
