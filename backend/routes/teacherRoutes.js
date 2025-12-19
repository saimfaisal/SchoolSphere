import { Router } from "express";
import { recordAttendance, addMarks } from "../controllers/teacherController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/attendance", recordAttendance);
router.post("/marks", addMarks);

export default router;
