import authService from "./auth.service";
import courseService from "./course.service";

class DashboardService {
  async studentDashboardStats(studentId: string) {
    const studentCourses = await courseService.getStudentCourses(studentId);
    const profile = await authService.getUserProfile(studentId);

    return { courses: studentCourses, profile };
  }

  async instructorDashboardStats(studentId: string) {}
}

export default new DashboardService();
