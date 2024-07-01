import { DB_DIALECT, DB_HOST, DB_NAME, DB_USER } from "../config/constants";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_USER, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectDB();
