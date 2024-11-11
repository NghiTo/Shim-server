import { json } from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { globalErrorHandler } from "./errorHandler.js";

export default function setupMiddlewares(app) {
  app.use(cors());
  app.use(json());
  app.use("/api", routes);
  app.use(globalErrorHandler);
}
