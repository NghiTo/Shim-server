import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import teacherService from "../services/teacherService.js";
import catchAsync from "../utils/catchAsync.js";

const getTeachers = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const schoolId = req.query.schoolId;
  const result = await teacherService.getTeachers(
    page,
    pageSize,
    schoolId,
    req.user.userId
  );
  res.status(StatusCodes.OK).json({
    message: MESSAGES.TEACHER.FIND_SUCCESS,
    data: result.teachers,
    pagination: {
      currentPage: page,
      pageSize: pageSize,
      totalItems: result.totalTeachers,
      totalPages: Math.ceil(result.totalTeachers / pageSize),
    },
  });
});

export default { getTeachers };
