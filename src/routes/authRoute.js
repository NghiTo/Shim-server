import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.get("/refreshToken", authController.generateNewToken);

export default router;
