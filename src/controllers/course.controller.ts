import { Request, Response } from "express";
import { CustomRequest } from "../types";
import courseService from "../services/course.service";
import { failed_response } from "../utils/response";
import { Course } from "../models";

export async function createCourse(req: CustomRequest, res: Response) {
  let result = {};
  try {
    const courseFields = req.body.course as Course;
    const tags = req.body.tags as string[];
    const instructorId = req.userId;

    if (instructorId === undefined) {
      result = failed_response("User ID is required");
      return res.status(400).json(result);
    }

    const course = await courseService.createCourse(
      instructorId,
      courseFields,
      tags
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in creating user" });
  }
}

export async function getAllCourses(req: Request, res: Response) {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in fetching courses" });
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const courseId = req.params.id;

    // Basic validation
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await courseService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in fetching course" });
  }
}

export async function getStudentCourses(req: CustomRequest, res: Response) {
  try {
    const studentId = req.userId; // Assuming userId is extracted from authentication middleware

    // Basic validation
    if (!studentId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const studentCourses = await courseService.getStudentCourses(studentId);

    return res.status(200).json(studentCourses);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error in fetching student courses" });
  }
}
