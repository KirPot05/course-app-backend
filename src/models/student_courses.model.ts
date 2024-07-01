// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type StudentCourse = {
//   studentId: number;
//   courseId: number;
// };

// const studentCourseSchema = sequelize.define(
//   "student_courses",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     studentId: {
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

// export default studentCourseSchema;

// models/studentCourse.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface StudentCourseAttributes {
  id: string;
  studentId: string;
  courseId: string;
}

export interface StudentCourseCreationAttributes
  extends Optional<StudentCourseAttributes, "id"> {}

class StudentCourse
  extends Model<StudentCourseAttributes, StudentCourseCreationAttributes>
  implements StudentCourseAttributes
{
  public id!: string;
  public studentId!: string;
  public courseId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudentCourse.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    studentId: {
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
    tableName: "student_courses",
    timestamps: true,
  }
);

export default StudentCourse;
