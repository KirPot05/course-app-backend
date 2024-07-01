import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type InstructorCourse = {
  instructorId: number;
  courseId: number;
};

const instructorCourseSchema = sequelize.define(
  "instructor_courses",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    instructorId: {
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

export default instructorCourseSchema;
