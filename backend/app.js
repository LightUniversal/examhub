import path from "path";
import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import uploadRoutes from "./routes/upload.js";
import courseRoutes from "./routes/course.js";
import { getPostById } from "./Controllers/postController.js";
import { shield } from "./middlewares/verify.js";
// import mailer from "./utils/mailer.js"

// CONFIGURATIONS
dotenv.config();
connectDb();

// CREATE AN EXPRESS APPLICATION
const app = express();


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());


// app.get('/', (req, res)=> {
//   res.send("App ruuning");
// })





// ROUTES SETUP
app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);
app.use("/post", postRoutes);
app.use('/course', courseRoutes);

app.get('/profile/:id',shield, getPostById)



// make the upload folder accessible/static folder
const __dirname = path.resolve(); // set the current directory to be __dirname
app.use("/backend/public", express.static(path.join(__dirname, "backend/public")));

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // get requests
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`App running at ${port}`);
});
