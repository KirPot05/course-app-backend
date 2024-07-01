import { Router } from "express";
import { createProfile, getProfile } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import { fetchStudentStats } from "../controllers/dashboard.controller";

const router = Router();

router.post("/", authMiddleware, createProfile);
router.get("/dashboard/students", authMiddleware, fetchStudentStats);
router.get("/:id", authMiddleware, getProfile);

export default router;
