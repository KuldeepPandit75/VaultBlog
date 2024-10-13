import express from "express";
import multer from "multer";
import { LoginUser, SignupUser } from "../controller/user-controller.js";
import { uploadBlogImage, getImage } from "../controller/upload-controller.js";
import path from "path"
import upload from "../utils/upload.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { createPost, deletePost, getAllPosts, getPostDetails, updatePost } from "../controller/post-controller.js";

const router = express.Router();

// Route for Signup & Login

router.post("/signup",SignupUser);
router.post("/login",LoginUser);

//Route for uploading blog image

router.post("/file/upload", upload.single("file"),uploadBlogImage);
router.get("/file/:filename", getImage)

router.post("/create",authenticateToken,createPost);
router.get("/posts",authenticateToken,getAllPosts);
router.get("/post/:id",authenticateToken,getPostDetails);
router.post("/post/update/:id",authenticateToken,updatePost);
router.delete("/post/:id",authenticateToken,deletePost)

export default router;