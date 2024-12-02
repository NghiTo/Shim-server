import { Router } from "express";
import authController from "../controllers/authController.js";
import { verifyUser } from "../middlewares/authentication.js";

const router = Router();

router.get("/refreshToken", authController.generateNewToken);
router.get("/sendOtp", verifyUser, authController.sendOtp);
router.post("/verifyOtp", verifyUser, authController.verifyOtp);
router.post("/login", authController.loginWithGoogle);

export default router;
