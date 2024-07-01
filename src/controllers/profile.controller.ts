// import { Request, Response } from "express";
// import { z } from "zod";
// import { Types } from "mongoose";
// import { failed_response, success_response } from "../utils/response";
// import { CustomRequest } from "../types";
// import { UserModel, ProfileModel, Profile } from "../models";

// export async function createUserProfile(req: Request, res: Response) {
//   const profileFields = z.object({
//     firstName: z
//       .string()
//       .min(3, "First Name should atleast be of three characters"),

//     lastName: z
//       .string()
//       .min(3, "Last Name should atleast be of three characters"),

//     dob: z.string().transform((str) => new Date(str)),
//     address: z
//       .string()
//       .min(5, "Address should be atleast of 5 characters")
//       .optional(),
//     department: z.enum(
//       ["CSE", "ISE", "AERO", "MECH", "CIVIL", "EC", "EE", "PLACEMENT"],
//       { required_error: "Department field is required" }
//     ),
//     userId: z.string().refine((id) => Types.ObjectId.isValid(id)),
//   });

//   let result = {};
//   try {
//     const fields = profileFields.parse(req.body);

//     let profile = await ProfileModel.findOne({ userId: fields.userId });
//     if (profile !== null) {
//       result = failed_response("User Profile already exists");
//       return res.status(400).json(result);
//     }

//     profile = await ProfileModel.create(fields);
//     result = success_response("User Profile created successfully", profile);

//     return res.status(201).json(result);
//   } catch (error: unknown) {
//     console.error(error);
//     return res.status(500).json({ message: "Error in creating user profile" });
//   }
// }

// export async function fetchUserProfile(req: CustomRequest, res: Response) {
//   let result = {};

//   try {
//     const userId = req.userId;
//     if (userId === undefined) {
//       result = failed_response("User ID is required");
//       return res.status(400).json(result);
//     }

//     if (!Types.ObjectId.isValid(userId)) {
//       result = failed_response("A valid user ID is required");
//       return res.status(400).json(result);
//     }

//     const profile = await ProfileModel.findOne({ userId });

//     result = success_response("Fetched user profile successfully", profile);
//     return res.status(200).json(result);
//   } catch (error: unknown) {
//     console.error(error);
//     return res.status(500).json({ message: "Error in fetching user profile" });
//   }
// }

// export async function editUserProfile(req: CustomRequest, res: Response) {
//   let result = {};
//   const profileFields = z.object({
//     firstName: z
//       .string()
//       .min(3, "First Name should atleast be of three characters"),

//     lastName: z
//       .string()
//       .min(3, "Last Name should atleast be of three characters"),

//     dob: z.string().transform((str) => new Date(str)),
//     address: z
//       .string()
//       .min(5, "Address should be atleast of 5 characters")
//       .optional(),
//     department: z.enum(
//       ["CSE", "ISE", "AERO", "MECH", "CIVIL", "EC", "EE", "PLACEMENT"],
//       { required_error: "Department field is required" }
//     ),
//     // userId: z.string().refine((id) => Types.ObjectId.isValid(id)),
//   });

//   try {
//     const userId = req.userId;
//     if (userId === undefined) {
//       result = failed_response("User ID is required");
//       return res.status(400).json(result);
//     }

//     if (!Types.ObjectId.isValid(userId)) {
//       result = failed_response("A valid user ID is required");
//       return res.status(400).json(result);
//     }

//     const profileData = profileFields.parse(req.body);

//     const profile = await ProfileModel.findOneAndUpdate(
//       { userId },
//       { $set: profileData },
//       { new: true }
//     );

//     result = success_response("Fetched user profile successfully", profile);
//     return res.status(200).json(result);
//   } catch (error: unknown) {
//     console.error(error);
//     return res.status(500).json({ message: "Error in fetching user profile" });
//   }
// }
