import express from "express";
import multer from "multer";
import { LoginUser, SignupUser } from "../controller/user-controller.js";
import { uploadBlogImage } from "../controller/upload-controller.js";
import path from "path"
import upload from "../utils/upload.js";

const router = express.Router();

// Route for Signup & Login

router.post("/signup",SignupUser);
router.post("/login",LoginUser);

//Route for uploading blog image

router.post("/file/upload", upload.single("file"),uploadBlogImage);

export default router;