import { Router } from "express";
import quizController from "../controllers/quizController.js";
import { verifyUser } from "../middlewares/authentication.js";

const router = Router();

router.post("/", verifyUser, quizController.createBlankQuiz);
router.get("/:quizId", quizController.findQuizById);
router.put("/:quizId", verifyUser, quizController.updateQuiz);
router.post(
  "/:quizId",
  verifyUser,
  quizController.createMultipleChoiceQuestion
);
router.get("/:quizId/questions", quizController.getAllQuestions);

export default router;
