import { isCelebrateError } from "celebrate";

class AppError extends Error {
  constructor({ message, statusCode, errorCode, details }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorDetails = [];
    err.details.forEach((value, key) => {
      value.details.forEach((detail) => {
        errorDetails.push({
          field: detail.context.key,
          message: detail.message,
        });
      });
    });

    return res.status(400).json({
      status: "fail",
      errorCode: "VALIDATION_FAILED",
      message: err.message,
      details: errorDetails,
    });
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    errorCode: err.errorCode,
    message: err.message,
    details: err.details || null,
  });
};

export { AppError, globalErrorHandler };