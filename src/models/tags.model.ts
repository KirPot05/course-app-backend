// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type Tags = {
//   id: string;
//   title: string;
// };

// const tagsSchema = sequelize.define(
//   "tags",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { timestamps: true }
// );

// export default tagsSchema;

// models/tags.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

interface TagsAttributes {
  id: string;
  title: string;
}

class Tags extends Model<TagsAttributes> implements TagsAttributes {
  public id!: string;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tags.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tags",
    timestamps: true,
  }
);

export default Tags;
