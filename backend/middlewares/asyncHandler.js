const asyncHandler = ahandler => (req, res, next) => {
    Promise.resolve(ahandler(req, res, next)).catch(next);
}

export default asyncHandler;