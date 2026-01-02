import express, { Router } from "express";
import { login, logout, signUp, updateProfile } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";



const router = express.Router();

//test route
// router.get("/test", arcjetProtection ,(req ,res)=>{
//     res.status(200).json({massage : "Test pass successfully"})
// })

// protection toute for liiting too much login at a time

router.use(arcjetProtection);

//signup route
router.post("/signup",signUp)
//Login route
router.post("/login",login)
//Logout route
router.post("/logout",logout)
//update profile
router.put("/update-profile",protectRoute,updateProfile);
//check authentication
router.get("/check" ,protectRoute , (req , res)=>res.status(200).json(req.user))

export default router