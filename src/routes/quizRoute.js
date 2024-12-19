import { Router } from "express";
import quizController from "../controllers/quizController.js";
import { verifyUser } from "../middlewares/authentication.js";
import questionController from "../controllers/questionController.js";

const router = Router();

router.post("/", verifyUser, quizController.createBlankQuiz);
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

router.get("/:quizId", verifyUser, quizController.findQuizById);
router.get("/", verifyUser, quizController.getAllQuizzes);

router.delete("/:quizId", verifyUser, quizController.deleteQuiz);
router.delete(
  "/:quizId/:questionId",
  verifyUser,
  questionController.deleteQuestion
);

router.put("/:quizId", verifyUser, quizController.updateQuiz);
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
