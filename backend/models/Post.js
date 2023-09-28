import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    department: {
      type: String,
      required: true,
    },
    level: {
      type: Number
    },
    facebook: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
