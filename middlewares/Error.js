const errorMiddleware = (err, req, res, next)=>{
    err.statusCode =  err.statusCode || 500;
    err.msg = err.msg || "Internal server error";

    res.status(err.statusCode).json({
        success: false,
        message: err.msg,
    });
};

export default errorMiddleware;