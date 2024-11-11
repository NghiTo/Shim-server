import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validators/userValidator.js";

const router = Router();

router.post("/register", userController.createUser);
router.post("/email", userValidation, userController.findUserByEmail);

export default router;
