// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type Organization = {
//   id: string;
//   name: string;
// };

// const userSchema = sequelize.define(
//   "organizations",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { timestamps: true }
// );

// export default userSchema;

// models/organization.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

interface OrganizationAttributes {
  id: string;
  name: string;
}

class Organization
  extends Model<OrganizationAttributes>
  implements OrganizationAttributes
{
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Organization.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "organizations",
    timestamps: true,
  }
);

export default Organization;
