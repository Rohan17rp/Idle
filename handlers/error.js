// Custom error handler for express
function errorHandler(err, req, res, next) {
    return res.status(err.status || 500).json({
        err: {
            message: err.message || "Oops! something went wrong."
        }
    });
};

module.exports = errorHandler;