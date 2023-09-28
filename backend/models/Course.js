import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        default:[],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        required: true
    }
});
const courseSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    level: {
        type:String,
        required: true
    },
    creditLoad: {
        type:Number,
        required: true
    },
    questions: [questionSchema],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;