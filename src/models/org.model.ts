import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type Organization = {
  id: string;
  name: string;
};

const userSchema = sequelize.define(
  "organizations",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default userSchema;
