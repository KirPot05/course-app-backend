import { Request, Response } from "express";
import PostService from "../services/post.service";

export const createPost = async (req: Request, res: Response) => {
  const { content, userId, threadId } = req.body;
  try {
    const post = await PostService.createPost(content, userId, threadId);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostsByThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;
  try {
    const posts = await PostService.getPostsByThread(threadId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
