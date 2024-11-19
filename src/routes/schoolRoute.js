import { Router } from "express";
import schoolController from "../controllers/schoolController.js";

const router = Router();

router.get("/", schoolController.getSchools);
router.get('/:schoolId', schoolController.findSchoolById)

export default router;
