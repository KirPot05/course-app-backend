import { Request, Response } from "express";
import ThreadService from "../services/thread.service";
import { CustomRequest } from "../types";

export const createThread = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  if (userId === undefined) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const { title, content } = req.body;
  try {
    const thread = await ThreadService.createThread(title, content, userId);
    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getThreads = async (req: Request, res: Response) => {
  try {
    const threads = await ThreadService.getThreads();
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
