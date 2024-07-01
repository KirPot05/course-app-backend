// models/profile.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type Profile = {
  userId: number;
  firstName: string;
  lastName: string;
  portfolioLink?: string;
};

const profileSchema = sequelize.define(
  "profiles",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portfolioLink: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

export default profileSchema;
