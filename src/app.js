import express from "express";
import dotenv from "dotenv";
import path from "path";
import setupMiddlewares from "./utils/setupMiddlewares.js";

dotenv.config({ path: path.resolve("environments/.env") });

const app = express();
const port = process.env.PORT;

setupMiddlewares(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
