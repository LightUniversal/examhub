import express from 'express';
import { addPost, deletePost, updatePost, likePost, deleteView, commentPost, getAllPosts, getPostById } from '../Controllers/postController.js';
import { shield } from '../middlewares/verify.js';

const router = express.Router();

// Make a post and Get all post
router.route("/").get(getAllPosts).post(shield, addPost);
// Update post

router.route("/:id").put(shield, updatePost);
// Delete Post
router.route('/:id').delete(shield, deletePost);    
// Like Post
router.route("/").put(likePost);
// Comment Post
router.route("/:id").post(shield, commentPost);
// delete comment
router.route("/:id/:viewId").delete(shield, deleteView);

export default router;