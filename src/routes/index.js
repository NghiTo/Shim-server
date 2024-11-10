import { Router } from "express";
import userRoute from "./userRoute.js";

const router = Router();

router.use("/users", userRoute);

export default router;
