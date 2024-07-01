import { Dialect } from "sequelize";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const PORT = process.env.PORT || 5000;

export const DB_URL = process.env.DB_URL || "";

export const JWT_SECRET = process.env.JWT_SECRET || "top_secret";

export const DB_NAME = process.env.DB_NAME || "";

export const DB_USER = process.env.DB_USER || "";

export const DB_PASSWORD = process.env.DB_PASSWORD || "";

export const DB_HOST = process.env.DB_HOST || "";

export const DB_DIALECT = process.env.DB_DIALECT as Dialect;
