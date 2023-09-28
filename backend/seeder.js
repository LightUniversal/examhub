import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDb from "./config/db.js";
import users from "./data/seed.js";
import Post from "./models/Post.js";
import posts from "./data/post.js";
import Course from "./models/Course.js";
import courses from "./data/course.js";

dotenv.config();

connectDb();

const importData = async () => {
  // every mongoose method returns a promise
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Course.deleteMany();

    console.log("Data Destroyed!", User.find({}));
    await Post.insertMany(posts);
    await User.insertMany(users);
    await Course.insertMany(courses);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  // every mongoose method returns a promise
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Course.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

// console.log(process.argv[2]); //The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
