import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import errorHandler from "../utils/errorHandler.js";
import userModel from "../models/userModel.js";

export const register =  catchAsyncError(async(req, res, next)=>{
    const {name, email, password}= req.body;

    if (!name || !email || !password){
        return next (new errorHandler("please enter all fields", 400));
    }

    let user = await userModel.findOne({email});
    
    if (user){
        return next (new errorHandler("user already exist", 409));
    }

    user = await user.create({name, email, password});

    const token = user.getJWTToken();       // generate JWT Token

    res.status(201).json({
        success:true,
        message:"user registered successfully",
        token,
        user,
    });
});

export const login = catchAsyncError(async(req,res,next)=>{
    const {name, email, password}= req.body;

    if (!name || !email || !password){
        return next (new errorHandler ("please enter all fields",400));
    }

    const user = await userModel.findOne({email}).select("+password");

    if (!user){
        return next(new errorHandler("Invalid credentials",401));
    }

    const isMatch = await userModel.comparePassword(password);


    if (!isMatch){
        return next (new errorHandler("Invalid credentials",401));
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success:true,
        token,
        user,
    });
});


export const logout = catchAsyncError(async (req, res, next)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({
            success:true,
            message:"logged out successfully"
        });

    } catch (error){
        next (new errorHandler("Error logging out user"));
    }
});

export const loadUser = catchAsyncError(async(req, res, next)=>{
    const {email}= req.params;

    try {
        const user =  await userModel.findOne({email});

        if (user){
            res.json({
                success:true,
                username: user.email, 
                userId: user._Id,
                user
            });
        }
        else{
            res.status(400).json({
                success:false,
                message:"User does not exist"
            });
        }
        }
        catch (error){
            next(new errorHandler("Error getting user"));
    }
});