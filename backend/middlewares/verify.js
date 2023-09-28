import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";


// Protect routes or basically authorize only logged in users
const shield = asyncHandler(async (req, res, next) => {
    let token;

    // access the jwt from the cookie: are small blocks of data created by a web server while a user is browsing a website and placed on the user's computer or other device by the user's web browser. Cookies are placed on the device used to access a website, and more than one cookie may be placed on a user's device during a session.

    token = req.cookies.jwt;
    if(token) {

        try {
            const verified = jwt.verify(token, process.env.JWTOKEN);

            const { userId } = verified;
            req.user = await User.findById(userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed!")
        }
    } else {
        res.status(404);
        throw new Error("Not authorized, no token!")
    }

});

// Admin middleware
const Admin = (req, res, next) => {
    if(req.user && req.user.isAdmin ) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized! User is not an admin");
    }
}

export  {
    shield, Admin
}