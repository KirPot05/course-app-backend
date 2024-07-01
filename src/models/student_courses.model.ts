import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type StudentCourse = {
  studentId: number;
  courseId: number;
};

const studentCourseSchema = sequelize.define(
  "student_courses",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    studentId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default studentCourseSchema;
