import { Router } from "express";
import * as Posts from "../controllers/posts.controller.js";

const router = Router();

router.get("/", Posts.list);
router.get("/:id", Posts.getById);
router.post("/", Posts.create);
router.put("/:id", Posts.update);
router.delete("/:id", Posts.remove);


export default router;
