import { Sequelize } from "sequelize";
import {
  Course,
  CourseModel,
  CourseSectionModel,
  InstructorCourseModel,
  ProfileModel,
  SectionVideoModel,
  StudentCourseModel,
  UserModel,
} from "../models";
import { v4 as uuidV4 } from "uuid";

class CourseService {
  async createCourse(instructorId: string, course: Course, tags: string[]) {
    const { id, ...remCourse } = course;
    const newCourse = await CourseModel.create({
      id: uuidV4(),
      ...remCourse,
      instructorId,
    });
    if (newCourse === null) throw new Error(`Course not created`);

    await InstructorCourseModel.create({
      instructorId,
      courseId: newCourse.id,
      id: uuidV4(),
    });
    // Add logic to handle tags if required
    return newCourse;
  }
  async getAllCourses() {
    const courses = await CourseModel.findAll();

    const modifiedCourses: any[] = courses.map((course) => ({
      courseId: course.id,
      title: course.title,
      rating: course.rating,
      reviews: course.reviews,
      price: course.price,
      bestseller: course.bestSeller,
      imgSrc: course.imgUrl,
      description: course.description,
      instructorId: course.instructorId,
    }));

    modifiedCourses.forEach(async (course) => {
      const instructorProfile = await ProfileModel.findOne({
        where: { userId: course.instructorId },
      });
      if (instructorProfile === null) return;

      course.instructor = instructorProfile.firstName;
    });

    return modifiedCourses;
  }

  async getCourseById(id: string) {
    const course = await CourseModel.findByPk(id);
    if (course === null) return false;

    const modifiedCourse: any = {
      courseId: course.id,
      title: course.title,
      rating: course.rating,
      reviews: course.reviews,
      price: course.price,
      bestseller: course.bestSeller,
      imgSrc: course.imgUrl,
      description: course.description,
      instructorId: course.instructorId,
    };

    const instructorProfile = await ProfileModel.findOne({
      where: { id: course.instructorId },
    });

    modifiedCourse.instructor = instructorProfile?.firstName;

    return modifiedCourse;
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
