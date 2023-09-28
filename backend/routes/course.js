import express from "express";
import { getQuestions } from "../Controllers/courseController.js";
import { shield } from "../middlewares/verify.js"
const router = express.Router();

// get all questions
router.route("/").get(shield, getQuestions)

export default router;