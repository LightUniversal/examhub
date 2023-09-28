// To handle error if no other middleware responsed to it

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// Override express default error handling
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Handle MongoDb  ObjectId error
    if(err.name === "CastError" && err.kind === "ObjectId") {
        message = "Resource not found";
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "_ _ _ _" : err.stack
    })
}

export  {
    notFound,
    errorHandler
}