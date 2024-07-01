// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type OrgUser = {
//   orgId: number;
//   userId: number;
// };

// const orgUserSchema = sequelize.define(
//   "org_users",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     orgId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "organizations",
//         key: "id",
//       },
//     },
//     userId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },
//   },
//   { timestamps: true }
// );

// export default orgUserSchema;

// models/orgUser.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface OrgUserAttributes {
  id: string;
  orgId: string;
  userId: string;
}

export interface OrgUserCreationAttributes
  extends Optional<OrgUserAttributes, "id"> {}

class OrgUser
  extends Model<OrgUserAttributes, OrgUserCreationAttributes>
  implements OrgUserAttributes
{
  public id!: string;
  public orgId!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrgUser.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    orgId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "org_users",
    timestamps: true,
  }
);

export default OrgUser;
