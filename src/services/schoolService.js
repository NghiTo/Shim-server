import { StatusCodes } from "http-status-codes";
import schoolRepository from "../repositories/schoolRepository.js";
import { AppError } from "../utils/errorHandler.js";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";

const getSchools = async (page, pageSize) => {
  const schools = await schoolRepository.getSchools(
    parseInt(page),
    parseInt(pageSize)
  );

  if (!schools || schools.length === 0) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.SCHOOL.NOT_FOUND,
      errorCode: ERROR_CODES.SCHOOL.NOT_FOUND,
    });
  }
  return schools;
};

export default { getSchools };