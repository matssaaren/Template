import { Router } from "express";
import * as Settings from "../controllers/settings.controller.js";

const router = Router();

// GET all settings for a user
router.get("/users/:userId", Settings.listForUser);

// PUT one setting (upsert)
router.put("/users/:userId/:key", Settings.setForUser);

export default router;
