import { Router } from "express";
import { userRoutes } from "./user.routes";
import { postRoutes } from "./post.routes";
import { commentRoutes } from "./comment.routes";
import { storyRoutes } from "./story.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/stories", storyRoutes);

export { router };
