import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role?: "INSTRUCTOR" | "STUDENT";
  blocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public email!: string;
  public password!: string;
  public role?: "INSTRUCTOR" | "STUDENT";
  public blocked?: boolean | undefined;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    password: { type: DataTypes.STRING, allowNull: false },

    role: {
      type: DataTypes.ENUM,
      values: ["INSTRUCTOR", "STUDENT"],
      allowNull: false,
      defaultValue: "STUDENT",
    },

    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
