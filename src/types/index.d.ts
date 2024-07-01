import { Request } from "express";

type CustomRequest = Request & {
  userId?: string;
  role?: string;
};
