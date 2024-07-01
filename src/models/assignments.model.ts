// models/assignment.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type Assignment = {
  title: string;
  sectionId: number;
};

const assignmentSchema = sequelize.define(
  "assignments",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sectionId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "course_sections",
        key: "id",
      },
    },

    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default assignmentSchema;
