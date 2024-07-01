import { Response } from "express";
import { CustomRequest } from "../types";
import { failed_response, success_response } from "../utils/response";
import dashboardService from "../services/dashboard.service";

export async function fetchStudentStats(req: CustomRequest, res: Response) {
  let result = {};

  try {
    const userId = req.userId;
    if (userId === undefined) {
      result = failed_response("User ID is required");
      return res.status(400).json(result);
    }

    const stats = await dashboardService.studentDashboardStats(userId);

    result = success_response("Fetched user stats successfully", stats);
    return res.status(200).json(result);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Error in fetching user profile" });
  }
}
