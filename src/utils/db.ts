import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} from "../config/constants";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export async function connectDB() {
  console.log(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT);

  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: false, alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectDB();
