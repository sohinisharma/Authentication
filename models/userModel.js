import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter name"],
        unique: true,
    },

    email: {
        type: String,
        required: [true,"please enter email"],
        unique: true,
        validate: [validator.isEmail,"please enter a valid email"],
    },

    password: {
        type: String,
        required: [true,"please enter password"],
        minLength: [6, "password must be at least 6 characters"],
        select : false,
    },
});

userSchema.pre("save", async function(next){
    if (!this.isModified("password"))
    return next();
this.password = await bcrypt.hash(this.password, 10);
next();
});

userSchema.methods.getJWTToken = function(){
    return jwt.sign({_id: this._Id}, process.env.JWT_SECRET,{
        expiresIn: "15d",
    });
};

userSchema.methods.comparePassword =  async function (password){
    return await bcrypt.compare (password, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;