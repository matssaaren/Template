import { Router } from "express";
import * as Auth from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

router.post("/register", Auth.register);
router.post("/login", Auth.login);


router.get("/me", requireAuth, Auth.me);

export default router;
