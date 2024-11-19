import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTeachers = async (page, pageSize, schoolId, userId) => {
  const teachers = await prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { role: "teacher", schoolId, NOT: { id: userId } },
    orderBy: {
      id: "asc",
    },
  });
  return teachers;
};

const countTotalTeachers = async (schoolId, userId) => {
  const totalTeachers = await prisma.user.count({
    where: { role: "teacher", schoolId, NOT: { id: userId } },
  });
  return totalTeachers;
};

export default { getTeachers, countTotalTeachers };
