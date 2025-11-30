import express, { Router } from "express";



const router = express.Router();

//signup route
router.get("/signup",(req , res)=>{
    res.send("Signup endpoint");
})
//Login route
router.get("/login",(req , res)=>{
    res.send("Login endpoint");
})
//Logout route
router.get("/logout",(req , res)=>{
    res.send("Logout endpoint");
})








export default router