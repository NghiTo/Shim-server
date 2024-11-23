import { StatusCodes } from "http-status-codes";
import schoolService from "../services/schoolService.js";
import catchAsync from "../utils/catchAsync.js";
import MESSAGES from "../constants/messages.js";

const getSchools = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const result = await schoolService.getSchools(page, pageSize);
  res.status(StatusCodes.OK).json({
    message: MESSAGES.SCHOOL.FIND_SUCCESS,
    data: result.schools,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: result.totalSchools,
      hasMore: pageSize * page < result.totalSchools,
    },
  });
});

const findSchoolById = catchAsync(async (req, res, next) => {
  const result = await schoolService.findSchoolById(req.params.schoolId);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.SCHOOL.FIND_SUCCESS, data: result });
});

export default { getSchools, findSchoolById };
