import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validators/userValidator.js";

const router = Router();

router.post("/register", userController.createUser);
router.post(
  "/email",
  userValidation.emailValidation,
  userController.findUserByEmail
);
router.post("/login", userValidation.loginValidation, userController.login);
router.get("/:userId", userController.findUserById);
router.put("/:userId", userController.updateUser);

export default router;
