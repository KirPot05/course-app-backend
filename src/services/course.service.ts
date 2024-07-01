import { Course } from "../models";

class CourseService {
  async createCourse(instructorId: string, course: Course) {}

  async getAllCourses() {}

  async getCourseById(id: string) {}

  async getStudentCourses(studentId: string) {}

  async getInstructorCourses(instructorId: string) {}
}

export default new CourseService();
