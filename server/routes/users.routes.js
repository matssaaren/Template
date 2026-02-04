import { Router } from "express";
import * as Users from "../controllers/users.controller.js";

const router = Router();

router.get("/", Users.list);
router.get("/:id", Users.getById);
router.post("/", Users.create);

export default router;
