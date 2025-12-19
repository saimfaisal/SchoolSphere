import { Router } from "express";
import { getAttendance, getMarks, getProfile } from "../controllers/studentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();
router.use(authMiddleware, roleMiddleware("student"));

router.get("/attendance", getAttendance);
router.get("/marks", getMarks);
router.get("/profile", getProfile);

export default router;
