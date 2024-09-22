import { Router } from "express";
import multer from "multer";
import { login } from "../controllers/user/login.controller";
import { createUserController } from "../controllers/user/create-user-controller";
import { listUserController } from "../controllers/user/list-user-controller";
import { findUserController } from "../controllers/user/find-user-controller";
import { searchUserController } from "../controllers/user/search-user-controller";
import { updateUserController } from "../controllers/user/update-user-controller";
import { deleteUserController } from "../controllers/user/delete-user-controller";
import { updatePasswordController } from "../controllers/user/update-password-controller ";
import { updatePhotoController } from "../controllers/user/update-photo-controller";
import { updateCoverController } from "../controllers/user/update-cover-controller";


export const userRoutes = Router();

userRoutes.post("/login", (request, response) => {
  login(request, response);
});

userRoutes.post("/create", (request, response) => {
  createUserController(request, response);
});

userRoutes.get("/list", (request, response) => {
  listUserController(request, response);
});

userRoutes.get("/find/:id", (request, response) => {
  findUserController(request, response);
});

userRoutes.get("/search/:name", (request, response) => {
  searchUserController(request, response);
});

userRoutes.put("/update", (request, response) => {
  updateUserController(request, response);
});

userRoutes.delete("/delete/:id", (request, response) => {
  deleteUserController(request, response);
});

userRoutes.put("/update-password", (request, response) => {
  updatePasswordController(request, response);
});

// Upload routes
const upload = multer();

userRoutes.put("/update-photo", upload.single("image"), (request, response) => {
  updatePhotoController(request, response);
});

userRoutes.put("/update-cover", upload.single("image"), (request, response) => {
  updateCoverController(request, response);
});

