import { Request, Response } from "express";
import PostService from "../services/post.service";
import { CustomRequest } from "../types";

export const createPost = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  if (userId === undefined) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const threadId = req.params.id;
  if (threadId === undefined) {
    return res.status(400).json({ message: "Thread ID is required" });
  }

  const { content } = req.body;
  try {
    const post = await PostService.createPost(content, userId, threadId);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostsByThread = async (req: Request, res: Response) => {
  const threadId = req.params.id;
  if (threadId === undefined) {
    return res.status(400).json({ message: "Thread ID is required" });
  }
  try {
    const posts = await PostService.getPostsByThread(threadId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
