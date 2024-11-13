import { Router } from "express";
import userRoute from "./userRoute.js";
import schoolRoute from "./schoolRoute.js";

const router = Router();

router.use("/users", userRoute);
router.use("/schools", schoolRoute);

export default router;
