import asyncHandler from "../middlewares/asyncHandler.js";
import Course from "../models/Course.js";

const getQuestions = asyncHandler( async (req, res) => {
    let course = await Course.find({}).sort({ createdAt: -1 });
    console.log(course);
    res.status(200).json(course);
})

const addQuestions = asyncHandler( async (req, res) => {

});

export {
    getQuestions,
    addQuestions
}