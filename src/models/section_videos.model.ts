import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type SectionVideo = {
  sectionId: number;
  videoUrl: string;
  title: string;
};

const sectionVideoSchema = sequelize.define(
  "section_videos",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    sectionId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "course_sections",
        key: "id",
      },
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default sectionVideoSchema;
