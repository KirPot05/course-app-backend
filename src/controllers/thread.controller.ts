import { Request, Response } from "express";
import ThreadService from "../services/thread.service";

export const createThread = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
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
