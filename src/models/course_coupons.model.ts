import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export type CourseCoupon = {
  courseId: number;
  code: string;
  isActive: boolean;
};

const courseCouponSchema = sequelize.define(
  "course_coupons",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    courseId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true }
);

export default courseCouponSchema;
