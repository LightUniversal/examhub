import express from "express";
import upload from "../Controllers/uploadController.js";
const router = express.Router();

router.route("/includeImage").post( upload.single('image'), async (req, res) => {


    res.send({
        message: "Image added successfully",
        image: `${req.file.path}`
    });
})


export default router;