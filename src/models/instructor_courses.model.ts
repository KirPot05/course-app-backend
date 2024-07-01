// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type InstructorCourse = {
//   instructorId: number;
//   courseId: number;
// };

// const instructorCourseSchema = sequelize.define(
//   "instructor_courses",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     instructorId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },
//     courseId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "courses",
//         key: "id",
//       },
//     },
//   },
//   { timestamps: true }
// );

// export default instructorCourseSchema;

// models/instructorCourse.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface InstructorCourseAttributes {
  id: string;
  instructorId: string;
  courseId: string;
}

export interface InstructorCourseCreationAttributes
  extends Optional<InstructorCourseAttributes, "id"> {}

class InstructorCourse
  extends Model<InstructorCourseAttributes, InstructorCourseCreationAttributes>
  implements InstructorCourseAttributes
{
  public id!: string;
  public instructorId!: string;
  public courseId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InstructorCourse.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    instructorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "instructor_courses",
    timestamps: true,
  }
);

export default InstructorCourse;
