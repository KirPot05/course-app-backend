// models/assignment.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type UserSubmissions = {
  userId: string;
  questionId: string;
  assignmentId: string;
  isCorrect: boolean;
};

const assignmentSchema = sequelize.define(
  "user_submissions",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUIDV4,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },

    assignmentId: {
      type: DataTypes.UUIDV4,
      references: {
        model: "assignments",
        key: "id",
      },
      allowNull: false,
    },

    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

export default assignmentSchema;
