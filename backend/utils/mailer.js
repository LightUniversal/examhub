import nodemailer from "nodemailer";
import User from "../models/User.js";


const transporter = nodemailer.createTestAccount({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

// Define Email Options

const mailOption = {
  from: process.env.GMAIL,
};

export default transporter;
