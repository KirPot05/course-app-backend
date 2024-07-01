import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type CourseSection = {
  courseId: number;
  title: string;
};

const courseSectionSchema = sequelize.define(
  "course_sections",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default courseSectionSchema;
