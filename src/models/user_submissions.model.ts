// // models/assignment.ts
// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type UserSubmissions = {
//   userId: string;
//   questionId: string;
//   assignmentId: string;
//   isCorrect: boolean;
// };

// const assignmentSchema = sequelize.define(
//   "user_submissions",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     userId: {
//       type: DataTypes.STRING,
//       references: {
//         model: "users",
//         key: "id",
//       },
//       allowNull: false,
//     },

//     assignmentId: {
//       type: DataTypes.STRING,
//       references: {
//         model: "assignments",
//         key: "id",
//       },
//       allowNull: false,
//     },

//     isCorrect: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   { timestamps: true }
// );

// export default assignmentSchema;

// models/userSubmissions.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface UserSubmissionsAttributes {
  id: string;
  userId: string;
  questionId: string;
  assignmentId: string;
  isCorrect: boolean;
}

export interface UserSubmissionsCreationAttributes
  extends Optional<UserSubmissionsAttributes, "id"> {}

class UserSubmissions
  extends Model<UserSubmissionsAttributes, UserSubmissionsCreationAttributes>
  implements UserSubmissionsAttributes
{
  public id!: string;
  public userId!: string;
  public questionId!: string;
  public assignmentId!: string;
  public isCorrect!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserSubmissions.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "questions",
        key: "id",
      },
    },
    assignmentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "assignments",
        key: "id",
      },
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "user_submissions",
    timestamps: true,
  }
);

export default UserSubmissions;
