import jwt from "jsonwebtoken";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import errorHandler from "../utils/errorHandler.js";
import userModel from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token}= req.cookies;
    console.log(token);

    if (!token){
        return next(new errorHandler("Not logged In",401));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._Id);

        if (!user){
            return next(new errorHandler("user not found",404));
        }

        req.user = user;
        next();
    }

    catch(error){
        return next(new errorHandler("Invalid token",403));
    }
});