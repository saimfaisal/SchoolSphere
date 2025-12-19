import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", authMiddleware, roleMiddleware("admin"), registerUser);

export default router;
