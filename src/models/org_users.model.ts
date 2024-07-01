import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type OrgUser = {
  orgId: number;
  userId: number;
};

const orgUserSchema = sequelize.define(
  "org_users",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    orgId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default orgUserSchema;
