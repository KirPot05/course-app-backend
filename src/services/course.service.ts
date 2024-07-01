import { Course } from "../models";

class CourseService {
  async createCourse(instructorId: string, course: Course, tags: string[]) {}

  async getAllCourses() {}

  async getCourseById(id: string) {}

  async getStudentCourses(studentId: string) {}

  async getInstructorCourses(instructorId: string) {}

  async addCourseSections(courseId: string, title: string) {}

  async addCourseSectionVideo(
    courseId: string,
    sectionId: string,
    videoTitle: string,
    videoUrl: string
  ) {}

  async enrollStudent(studentId: string, courseId: string) {}
}

export default new CourseService();
