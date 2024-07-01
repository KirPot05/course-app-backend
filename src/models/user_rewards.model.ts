import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type UserReward = {
  userId: number;
  tokens: number;
};

const userRewardSchema = sequelize.define(
  "user_rewards",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    tokens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default userRewardSchema;
