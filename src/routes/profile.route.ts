import { Router } from "express";
import { createProfile, getProfile } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createProfile);
router.get("/:id", authMiddleware, getProfile);

export default router;
