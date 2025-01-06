import { Router } from "express";
import answerController from "../controllers/answerController.js";

const router = Router();

router.post("/", answerController.createAnswer);

export default router;
