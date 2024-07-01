// models/assignment.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type AssignmentQuestionOptions = {
  questionId: string;
  option: string;
};

const assignmentSchema = sequelize.define(
  "assignment_question_options",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    questionId: {
      type: DataTypes.UUIDV4,
      references: {
        model: "assignment_questions",
        key: "id",
      },
      allowNull: false,
    },

    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default assignmentSchema;
