import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post("/register", userController.createUser);
router.post("/email", userController.findUserByEmail);

export default router;
