import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validators/userValidator.js";
import { verifyUser } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", userController.createUser);
router.post(
  "/email",
  userValidation.emailValidation,
  userController.findUserByEmail
);
router.post("/login", userValidation.loginValidation, userController.login);
router.get("/:userId", verifyUser, userController.findUserById);
router.put("/:userId", userController.updateUser);
router.put(
  "/changePassword/:userId",
  userValidation.passwordValidation,
  userController.changePassword
);

export default router;
