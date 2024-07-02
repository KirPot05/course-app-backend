import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";
import User from "./user.model";
import Thread from "./thread.model";

export interface PostAttributes {
  id: string;
  content: string;
  userId: string;
  threadId: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;
  public content!: string;
  public userId!: string;
  public threadId!: string;
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    threadId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "threads",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
  }
);

Post.belongsTo(User, { foreignKey: "userId", as: "user", constraints: true });
User.hasMany(Post, { foreignKey: "userId", as: "posts", constraints: true });

// Post.belongsTo(Thread, {
//   foreignKey: "threadId",
//   as: "thread",
//   constraints: true,
// });
// Thread.hasMany(Post, {
//   foreignKey: "threadId",
//   as: "posts",
//   constraints: true,
// });

export default Post;
