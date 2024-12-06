import { Router } from "express";
import quizController from "../controllers/quizController.js";
import { verifyUser } from "../middlewares/authentication.js";
import questionController from "../controllers/questionController.js";

const router = Router();

router.post("/", verifyUser, quizController.createBlankQuiz);
router.get("/:quizId", quizController.findQuizById);
router.put("/:quizId", verifyUser, quizController.updateQuiz);
router.delete("/:quizId", verifyUser, quizController.deleteQuiz);
router.get("/", verifyUser, quizController.getAllQuizzes);

router.post(
  "/:quizId/multiple-choice",
  verifyUser,
  questionController.createMultipleChoiceQuestion
);
router.post(
  "/:quizId/fill-in-the-blank",
  verifyUser,
  questionController.createFillInTheBlankQuestion
);
router.delete(
  "/:quizId/:questionId",
  verifyUser,
  questionController.deleteQuestion
);
router.put(
  "/:quizId/questions/:questionId",
  verifyUser,
  questionController.updateQuestion
);
router.put(
  "/:quizId/questions",
  verifyUser,
  questionController.updateAllQuestions
);

export default router;
