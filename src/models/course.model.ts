// models/course.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type Course = {
  title: string;
  description?: string;
  rating: number;
  bestSeller: boolean;
  imgUrl: string;
};

const courseSchema = sequelize.define(
  "courses",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    bestSeller: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default courseSchema;
