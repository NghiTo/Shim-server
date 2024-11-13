import { json, urlencoded } from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { globalErrorHandler } from "./errorHandler.js";
import bodyParser from "body-parser";

export default function setupMiddlewares(app) {
  app.use(cors());
  app.use(json({ limit: '600mb' }))
  app.use(urlencoded({ extended: true, limit: '600mb' }));
  app.use(bodyParser.json());
  app.use("/api", routes);
  app.use(globalErrorHandler);
}
