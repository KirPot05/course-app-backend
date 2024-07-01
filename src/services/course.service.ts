import {
  Course,
  CourseModel,
  CourseSectionModel,
  InstructorCourseModel,
  SectionVideoModel,
  StudentCourseModel,
} from "../models";

class CourseService {
  async createCourse(instructorId: string, course: Course, tags: string[]) {
    const newCourse = await CourseModel.create(course);
    if (newCourse === null) throw new Error(`Course not created`);

    await InstructorCourseModel.create({
      instructorId,
      courseId: newCourse.id,
    });
    // Add logic to handle tags if required
    return newCourse;
  }
  async getAllCourses() {
    return await CourseModel.findAll();
  }

  async getCourseById(id: string) {
    return await CourseModel.findByPk(id);
  }

  async getStudentCourses(studentId: string) {
    const studentCourses: any = await StudentCourseModel.findAll({
      where: { studentId },
      include: [{ model: CourseModel }],
    });
    return studentCourses.map((sc: any) => sc.Course);
  }

  async getInstructorCourses(instructorId: string) {
    const instructorCourses: any = await InstructorCourseModel.findAll({
      where: { instructorId },
      include: [{ model: CourseModel }],
    });
    return instructorCourses.map((ic: any) => ic.Course);
  }

  async addCourseSections(courseId: string, title: string) {
    return await CourseSectionModel.create({ courseId, title });
  }

  async getCourseSections(courseId: string) {}

  async getCourseSectionVideos(videoId: string) {}

  async addCourseSectionVideo(
    courseId: string,
    sectionId: string,
    videoTitle: string,
    videoUrl: string
  ) {
    // Check if the section belongs to the course
    const section = await CourseSectionModel.findOne({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) {
      throw new Error("Section does not belong to the specified course");
    }

    return await SectionVideoModel.create({
      sectionId,
      videoUrl,
      title: videoTitle,
    });
  }
  async enrollStudent(studentId: string, courseId: string) {
    return await StudentCourseModel.create({ studentId, courseId });
  }
}

export default new CourseService();
