import { Router } from "express";
import userRoute from "./userRoute.js";
import schoolRoute from "./schoolRoute.js";
import authRoute from "./authRoute.js";
import teacherRoute from "./teacherRoute.js"

const router = Router();

router.use("/users", userRoute);
router.use("/schools", schoolRoute);
router.use("/auth", authRoute);
router.use("/teachers", teacherRoute);

export default router;
