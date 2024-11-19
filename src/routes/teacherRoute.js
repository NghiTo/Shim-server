import { Router } from "express";
import { verifyUser } from "../middlewares/authentication.js";
import teacherController from "../controllers/teacherController.js";

const router = Router();

router.get("/", verifyUser, teacherController.getTeachers)

export default router;