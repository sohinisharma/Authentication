import mongoose from "mongoose";

export const connectDB = async()=>{
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected with ${connection.host}`);
};



// offline url
// MONGO_URI = mongodb://127.0.0.1:27017/Authentication 

// username :- sharmasohini80
// password :- txVpB6XhM5c86Rfc