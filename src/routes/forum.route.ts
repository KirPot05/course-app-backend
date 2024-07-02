import { Router } from "express";
import { createThread, getThreads } from "../controllers/thread.controller";
import { createPost, getPostsByThread } from "../controllers/post.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createThread);
router.get("/", authMiddleware, getThreads);
router.post("/:id/posts", authMiddleware, createPost);
router.get("/:id/posts", authMiddleware, getPostsByThread);

export default router;
