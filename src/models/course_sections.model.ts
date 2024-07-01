// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type CourseSection = {
//   courseId: number;
//   title: string;
// };

// const courseSectionSchema = sequelize.define(
//   "course_sections",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     courseId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "courses",
//         key: "id",
//       },
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { timestamps: true }
// );

// export default courseSectionSchema;

// models/courseSection.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface CourseSectionAttributes {
  id: string;
  courseId: string;
  title: string;
}

export interface CourseSectionCreationAttributes
  extends Optional<CourseSectionAttributes, "id"> {}

class CourseSection
  extends Model<CourseSectionAttributes, CourseSectionCreationAttributes>
  implements CourseSectionAttributes
{
  public id!: string;
  public courseId!: string;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CourseSection.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "course_sections",
    timestamps: true,
  }
);

export default CourseSection;
