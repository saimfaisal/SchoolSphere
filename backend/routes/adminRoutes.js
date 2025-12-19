import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeachers,
  deleteTeacher,
  getAttendanceReport,
  getMarksReport
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();
router.use(authMiddleware, roleMiddleware("admin"));

router.get("/students", getStudents);
router.post("/student", createStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);
router.get("/teachers", getTeachers);
router.delete("/teacher/:id", deleteTeacher);
router.get("/attendance", getAttendanceReport);
router.get("/marks", getMarksReport);

export default router;
