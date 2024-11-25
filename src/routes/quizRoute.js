import { Router } from "express";
import quizController from "../controllers/quizController.js";

const router = Router();

router.post("/", quizController.createQuiz);

export default router