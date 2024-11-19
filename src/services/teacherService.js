import teacherRepository from "../repositories/teacherRepository.js";
import omit from "lodash/omit.js";

const getTeachers = async (page, pageSize, schoolId, userId) => {
  const data = await teacherRepository.getTeachers(
    page,
    pageSize,
    schoolId,
    userId
  );
  const totalTeachers = await teacherRepository.countTotalTeachers(
    schoolId,
    userId
  );
  const teachers = data.map((teacher) => omit(teacher, ["password"]));
  return { teachers, totalTeachers };
};

export default { getTeachers };
