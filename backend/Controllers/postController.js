import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Post feeds : POST REQUEST
const addPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { description, picturePath } = req.body;
  console.log(userId);
  const user = await User.findById(userId);
  console.log(user);
  if (user) {
    const newPost = new Post({
      userId,
      description,
      picturePath,
      profile: user.profile,
      likes: [],
      comments: [],
      department: user.department,
      facebook: user.facebook,
      level: user.level,
      name: user.name,
    });
    await newPost.save();

    // get al the post
    const post = await Post.find({});

    res.status(201).json(post);
  } else {
    res.status(409);
    throw new Error("");
  }
});

// Get all posts: GET REQUESTS
const getAllPosts = asyncHandler(async (req, res) => {
  let posts = await Post.find({}).sort({ createdAt: -1 });
  const newPost = posts.map((post) => ({
    ...post.toObject(),
    createdAt: new Date(post.createdAt).toDateString(),
  }));
  res.status(200).json(newPost);
});

// Get Post by Id
const getPostById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const posts = await Post.find({
    userId,
  });
  if (posts) {
    console.log(posts);
    return res.json(posts).status(200);
  } else {
    res.status(404);
    throw new Error("User does not exits");
  }
});

// Delete Post: DELETE REQUEST
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const postToBeDeleted = await Post.findById(id);
  console.log(id);
  if (postToBeDeleted) {
    await Post.deleteOne({
      _id: postToBeDeleted._id,
    });
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Post not found...");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { id, description, userId, picturePath } = req.body;
  const postToBeEdited = await Post.findById(id);
  if (postToBeEdited) {
    postToBeEdited.description = description;
    postToBeEdited.userId = userId;
    postToBeEdited.picturePath = picturePath;

    const updatedPost = await postToBeEdited.save();
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

const likePost = asyncHandler(async (req, res) => {
  const { id, userId } = req.body;
  console.log(id);
  const post = await Post.findById(id);
  if (post) {
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {
      likes: post.likes,
    });
    console.log(updatedPost);
    res.status(200).json(updatedPost);
  } else {
    res.status(400);
    throw new Error("Post not found");
  }
});
const commentPost = asyncHandler(async (req, res) => {
  const { id, comment } = req.body;
  const userId = req.user._id;
  // const user = await User.findById(userId);
  const post = await Post.findById(id);
  const user = await User.findById(userId);
  console.log(id, comment, user, userId);

  if (post) {
    const view = {
      name: req.user.name,
      comment: comment,
      user: {
        name: user.name,
        id: userId,
      },
    };
    post.comments.push(view);
    console.log(view);
    await post.save();
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// delete comment
const deleteView = asyncHandler(async (req, res) => {
  const { id, viewId } = req.params;
  const post = await Post.findById(id);

  if (post) {
    const comments = post.comments.filter((comment) => {
      return comment._id !== viewId;
    });
    post.comments = comments;
    await post.save();
  }
});

export {
  addPost,
  deletePost,
  updatePost,
  likePost,
  deleteView,
  commentPost,
  getAllPosts,
  getPostById,
};
