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

export default { getSchools };
