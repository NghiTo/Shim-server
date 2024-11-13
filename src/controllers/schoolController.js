import { StatusCodes } from "http-status-codes";
import schoolService from "../services/schoolService.js";
import catchAsync from "../utils/catchAsync.js";
import MESSAGES from "../constants/messages.js";

const getSchools = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
  const result = await schoolService.getSchools(
    page, pageSize
  );
  res.status(StatusCodes.OK).json({
    message: MESSAGES.SCHOOL.FIND_SUCCESS,
    data: result,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: 20,
      hasMore: result.length === pageSize
    }
  });
});

export default { getSchools };
