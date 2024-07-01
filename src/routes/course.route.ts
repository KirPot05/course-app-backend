import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createCourse);
router.get("/", authMiddleware, getAllCourses);
router.get("/:id", authMiddleware, getCourseById);

export default router;
