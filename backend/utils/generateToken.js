import jwt from "jsonwebtoken";

export const genToken = (res, userId) => {
    // create token

    const token = jwt.sign({ userId }, process.env.JWTOKEN, {
        expiresIn : "30d",
    });

    // set JWT as HTTP-Only cookie instead of the default way
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        httpOnly: true
    })
}