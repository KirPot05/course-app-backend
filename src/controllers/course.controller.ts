import { Response } from "express";
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
