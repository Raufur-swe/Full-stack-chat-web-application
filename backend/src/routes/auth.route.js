import express, { Router } from "express";
import { login, logout, signUp } from "../controller/auth.controller.js";



const router = express.Router();

//signup route
router.post("/signup",signUp)
//Login route
router.post("/login",login)
//Logout route
router.post("/logout",logout)

export default router