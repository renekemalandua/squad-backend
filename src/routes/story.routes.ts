import { Router } from "express";
import multer from "multer";
import { createStoryController } from "../controllers/story/create-story-controller";
import { listStoriesController } from "../controllers/story/list-story-controller";

export const storyRoutes = Router();

const upload = multer();

storyRoutes.post("/create", upload.single("image"), (request, response) => {
  createStoryController(request, response);
});

storyRoutes.get("/list", (request, response) => {
  listStoriesController(request, response);
});
