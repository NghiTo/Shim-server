import { json, urlencoded } from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { globalErrorHandler } from "./errorHandler.js";
import cookieParser from "cookie-parser";

export default function setupMiddlewares(app) {
  app.use(cors({origin: "http://localhost:5173", credentials: true}));
  app.use(json({ limit: '600mb' }))
  app.use(urlencoded({ extended: true, limit: '600mb' }));
  app.use(cookieParser())
  app.use("/api", routes);
  app.use(globalErrorHandler);
}
