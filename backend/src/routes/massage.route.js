import express from "express";

const router = express.Router()

// send massage
router.get("/send" , (req , res)=>{
    res.send("Send massage endpoint");
});
// reseive massage


router.get("/receive" , (req , res)=>{
    res.send("Receive massage endpoint");
});




export default router