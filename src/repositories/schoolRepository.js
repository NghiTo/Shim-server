import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSchools = async (page, pageSize) => {
  const schools = await prisma.school.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      id: "asc",
    },
  });
  return schools;
};

const countTotalSchools = async () => {
  const totalSchools = await prisma.school.count();
  return totalSchools;
};

const findSchoolById = async (id) => {
  const school = await prisma.school.findUnique({
    where: { id },
  });
  return school;
};

export default { getSchools, countTotalSchools, findSchoolById };
