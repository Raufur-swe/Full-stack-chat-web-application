import express, { Router } from "express";
import { signUp } from "../controller/auth.controller.js";



const router = express.Router();

//signup route
router.post("/signup",signUp)
//Login route
router.get("/login",(req , res)=>{
    res.send("Login endpoint");
})
//Logout route
router.get("/logout",(req , res)=>{
    res.send("Logout endpoint");
})








export default router