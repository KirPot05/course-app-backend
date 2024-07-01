import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type UserRedeemedCoupon = {
  userId: number;
  couponId: number;
};

const userRedeemedCouponSchema = sequelize.define(
  "user_redeemed_coupons",
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
    couponId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "course_coupons",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default userRedeemedCouponSchema;
