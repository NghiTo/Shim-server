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

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { school: true },
  });
  return user;
};

const updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

const deleteUser = async (id) => {
  await prisma.user.delete({ where: { id } });
};

export default { createUser, findUserByEmail, findUserById, updateUser, deleteUser };
