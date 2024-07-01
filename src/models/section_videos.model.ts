// import { DataTypes } from "sequelize";
// import { sequelize } from "../utils/db";

// export type SectionVideo = {
//   sectionId: number;
//   videoUrl: string;
//   title: string;
// };

// const sectionVideoSchema = sequelize.define(
//   "section_videos",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },

//     sectionId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "course_sections",
//         key: "id",
//       },
//     },
//     videoUrl: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { timestamps: true }
// );

// export default sectionVideoSchema;

// models/sectionVideo.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export interface SectionVideoAttributes {
  id: string;
  sectionId: string;
  videoUrl: string;
  title: string;
}

export interface SectionVideoCreationAttributes
  extends Optional<SectionVideoAttributes, "id"> {}

class SectionVideo
  extends Model<SectionVideoAttributes, SectionVideoCreationAttributes>
  implements SectionVideoAttributes
{
  public id!: string;
  public sectionId!: string;
  public videoUrl!: string;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SectionVideo.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sectionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "course_sections",
        key: "id",
      },
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "section_videos",
    timestamps: true,
  }
);

export default SectionVideo;
