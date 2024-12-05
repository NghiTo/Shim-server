import { Router } from "express";
import quizController from "../controllers/quizController.js";
import { verifyUser } from "../middlewares/authentication.js";

const router = Router();

router.post("/", verifyUser, quizController.createBlankQuiz);
router.get("/:quizId", quizController.findQuizById);
router.put("/:quizId", verifyUser, quizController.updateQuiz);
router.delete("/:quizId", verifyUser, quizController.deleteQuiz);

router.post(
  "/:quizId/multiple-choice",
  verifyUser,
  quizController.createMultipleChoiceQuestion
);
router.post(
  "/:quizId/fill-in-the-blank",
  verifyUser,
  quizController.createFillInTheBlankQuestion
);
router.delete(
  "/:quizId/:questionId",
  verifyUser,
  quizController.deleteQuestion
);
router.put(
  "/:quizId/questions/:questionId",
  verifyUser,
  quizController.updateQuestion
);
router.get("/", verifyUser, quizController.getAllQuizzes);
router.put("/:quizId/questions", verifyUser, quizController.updateAllQuestions);

export default router;
