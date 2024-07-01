import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type Tags = {
  id: string;
  title: string;
};

const tagsSchema = sequelize.define(
  "tags",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default tagsSchema;
