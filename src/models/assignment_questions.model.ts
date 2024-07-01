import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type AssignmentQuestions = {
  id: string;
  assignmentId: string;
  answer: string;
  type: "MCQ" | "CODE";
  content: string;
};

const assignmentSchema = sequelize.define(
  "assignment_questions",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    assignmentId: {
      type: DataTypes.STRING,
      references: {
        model: "assignments",
        key: "id",
      },
    },

    answer: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM,
      values: ["MCQ", "CODE"],
      defaultValue: "MCQ",
      allowNull: false,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default assignmentSchema;
