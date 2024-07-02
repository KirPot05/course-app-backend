import { Router } from "express";
import {
  createCourse,
  enrollStudent,
  fetchInstructorCourses,
  getAllCourses,
  getCourseById,
  getStudentCourses,
} from "../controllers/course.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createCourse);
router.get("/", authMiddleware, getAllCourses);
router.get("/students", authMiddleware, getStudentCourses);
router.get("/instructors", authMiddleware, fetchInstructorCourses);
router.get("/:id", authMiddleware, getCourseById);
router.post("/:id/enroll", authMiddleware, enrollStudent);

export default router;
