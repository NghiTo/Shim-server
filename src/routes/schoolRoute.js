import { Router } from "express";
import schoolController from "../controllers/schoolController.js";

const router = Router();

router.get("/", schoolController.getSchools);

export default router;
