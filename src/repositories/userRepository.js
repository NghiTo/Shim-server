import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data) => {
  const user = await prisma.user.create({ data });
  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({ where: { email } });
  return user;
};

export default { createUser, findUserByEmail };
