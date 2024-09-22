import { Router } from "express";
import { createCommentController } from "../controllers/comment/create-comment-controller";
import { searchCommentController } from "../controllers/comment/search-comment-controller";

export const commentRoutes = Router();

commentRoutes.post("/create", (request, response) => {
  createCommentController(request, response);
});

commentRoutes.get("/search/:postId", (request, response) => {
  searchCommentController(request, response);
});
