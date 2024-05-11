import express from "express";
import {register, login, logout, loadUser} from "../controllers/userController.js";
import { isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();


//Authenticated routes

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/load/:email", isAuthenticated, loadUser);


export default router;