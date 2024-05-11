import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import user from "./routes/userRoute.js";
import errorMiddleware from "./middlewares/Error.js";


config({
    path:"./config/config.env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET', 'PUT', 'POST', 'DELETE'],
}));


// routes

app.use('/user', user);

app.use(errorMiddleware);

app.get("/", (req, res)=>
    res.send(
        `<h1>site is working.. click <a href=${process.env.FRONTEND_URL}>here</a>to visit frontend.</h1>`
    )
);

export default app;