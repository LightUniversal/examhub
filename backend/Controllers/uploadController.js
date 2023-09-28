import multer from "multer";
import path from "path";


// where images goes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./backend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}${Date.now()}-${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|png|jpeg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    console.log(file.mimetype);
    const mimetype = fileTypes.test(file.mimetype)
    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb("Images only");
    }
}

// handle for uploading images
const upload = multer({
    storage
});

export default upload;