// // models/profile.ts
// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type Profile = {
//   userId: number;
//   firstName: string;
//   lastName: string;
//   portfolioLink?: string;
// };

// const profileSchema = sequelize.define(
//   "profiles",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     userId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     portfolioLink: {
//       type: DataTypes.STRING,
//     },
//   },
//   { timestamps: true }
// );

// export default profileSchema;

// models/profile.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface ProfileAttributes {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  portfolioLink?: string;
  imgUrl?: string;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: string;
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public portfolioLink?: string;
  public imgUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
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
  {
    sequelize,
    tableName: "profiles",
    timestamps: true,
  }
);

export default Profile;
