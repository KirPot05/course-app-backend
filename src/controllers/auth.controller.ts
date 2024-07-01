import { Request, Response } from "express";
import { failed_response, success_response } from "../utils/response";
import { ZodError, z } from "zod";
import authService from "../services/auth.service";
import { CustomRequest } from "../types";
import { encryptPassword } from "../utils/password.util";

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
      return res.status(400).json(response);
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

    firstName: z
      .string()
      .min(3, "Enter a valid first name with atleast three characters")
      .optional(),

    lastName: z
      .string()
      .min(3, "Enter a valid last name with atleast three characters")
      .optional(),
  });

  try {
    const creds = userFields.parse(req.body);

    const password = await encryptPassword(creds.password);
    const result = await authService.register(
      creds.email,
      password,
      creds.firstName,
      creds.lastName
    );

    let response;
    if (result.success === false) {
      response = failed_response(result.msg);
      return res.status(400).json(response);
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

export async function createProfile(req: CustomRequest, res: Response) {
  const profileSchema = z.object({
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
  });

  let result: any = {};
  try {
    const userId = req.userId;

    if (userId === undefined) {
      result = failed_response("User ID is required");
      return res.status(400).json(result);
    }

    const profileFields = profileSchema.parse(req.body);

    const newProfile = await authService.createProfile(
      userId,
      profileFields.firstName,
      profileFields.lastName
    );

    if (newProfile === null) {
      result = failed_response("Failed to create profile");
      return res.status(400).json(result);
    }

    result = success_response("Created profile successfully", newProfile);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in creating user" });
  }
}

export async function getProfile(req: CustomRequest, res: Response) {
  let result: any = {};
  try {
    const userId = req.userId;
    if (userId === undefined) {
      result = failed_response("User ID is required");
      return res.status(400).json(result);
    }

    const profileId = req.params.id;

    const newProfile = await authService.getUserProfile(profileId);

    if (newProfile === null) {
      result = failed_response("Failed to fetch profile");
      return res.status(400).json(result);
    }

    result = success_response("Created profile successfully", newProfile);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in creating user" });
  }
}
