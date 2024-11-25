import { Router } from "express";
import userRoute from "./userRoute.js";
import schoolRoute from "./schoolRoute.js";
import authRoute from "./authRoute.js";
import teacherRoute from "./teacherRoute.js";
import quizRoute from "./quizRoute.js";

const router = Router();

router.use("/users", userRoute);
router.use("/schools", schoolRoute);
router.use("/auth", authRoute);
router.use("/teachers", teacherRoute);
router.use("/quiz", quizRoute);

export default router;
