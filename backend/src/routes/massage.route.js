import express from "express";
import { getAllContacts, getChatpertner, getMessagesByUserId, sendMessage } from "../controller/massage.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router = express.Router();


router.use(arcjetProtection, protectRoute)
// contacts routes
router.get("/contacts", getAllContacts);
// //chats routes
router.get("/chats", getChatpertner);
// // get messages
router.get("/:id", getMessagesByUserId);
// //sending mesages
router.post("/send/:id", sendMessage)




export default router