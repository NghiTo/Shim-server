import { json, urlencoded } from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { AppError, globalErrorHandler } from "./errorHandler.js";
import cookieParser from "cookie-parser";
import ERROR_CODES from "../constants/errorCode.js";
import { StatusCodes } from "http-status-codes";

export default function setupMiddlewares(app) {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(json({ limit: "600mb" }));
  app.use(urlencoded({ extended: true, limit: "600mb" }));
  app.use(cookieParser());
  app.use("/api", routes);
  app.all("*", (req, res, next) => {
    next(
      new AppError({
        message: `Can't find ${req.originalUrl} on this server`,
        errorCode: ERROR_CODES.AUTH.URL_NOT_FOUND,
        statusCode: StatusCodes.NOT_FOUND,
      })
    );
  });
  app.use(globalErrorHandler);
}
