import { Request, Response } from "express";
import { failed_response, success_response } from "../utils/response";
import { ZodError, z } from "zod";
import authService from "../services/auth.service";

export async function userLogin(req: Request, res: Response) {
  const credentials = z.object({
    email: z.string().min(1, "Email is a required parameter").email(),
    password: z
      .string()
      .min(6, "Enter a valid password with atleast six characters"),
  });

  try {
    const creds = credentials.parse(req.body);

    let result = await authService.login(creds.email, creds.password);

    let response;
    if (result.success === false) {
      response = failed_response(result.msg);
    } else {
      response = success_response(result.msg, {
        token: result.token,
        user: result.user,
      });
    }

    return res.status(200).json(response);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Error in user login" });
  }
}

export async function createUser(req: Request, res: Response) {
  const userFields = z.object({
    email: z.string().min(1, "Email is a required parameter").email(),
    password: z
      .string()
      .min(6, "Enter a valid password with atleast six characters"),
  });

  try {
    const creds = userFields.parse(req.body);

    const result = await authService.register(creds.email, creds.password);

    let response;
    if (result.success === false) {
      response = failed_response(result.msg);
    } else {
      response = success_response(result.msg, {
        token: result.token,
        user: result.user,
      });
    }

    return res.status(200).json(response);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Error in creating user" });
  }
}
