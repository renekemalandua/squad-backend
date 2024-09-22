import { Router } from "express";
import multer from "multer";
import { createPostController } from "../controllers/post/create-post-controller";
import { findPostController } from "../controllers/post/find-post-controller";
import { listPostController } from "../controllers/post/list-post-controller";
import { searchPostController } from "../controllers/post/search-post-controller";
import { deletePostController } from "../controllers/post/delete-post-controller";

export const postRoutes = Router(); 

const upload = multer(); 

postRoutes.post("/create", upload.single("image"), (request, response) => {
  createPostController(request, response);
});

postRoutes.get("/find/:id", (request, response) => {
  findPostController(request, response);
});

postRoutes.get("/list", (request, response) => {
  listPostController(request, response);
});

postRoutes.get("/search/:userId", (request, response) => {
  searchPostController(request, response);
});

postRoutes.delete("/delete/:id", (request, response) => {
  deletePostController(request, response);
});