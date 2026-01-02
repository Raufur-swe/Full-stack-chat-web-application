// massage controller routes

import Message from "../models/massage.js";
import User from "../models/User.model.js";
import cloudinary from "cloudinary"


// get all contacts who are logged in
export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts : ", error);
        res.status(500).json({ massage: "Server error" })
    }
}



//getMessagesByUserId

export const getMessagesByUserId = async (req, res) => {

    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const massage = await Message.find({
            $or: [
                { senderId: myId, receverId: userToChatId },
                { senderId: userToChatId, receverId: myId },
            ],
        });

        res.status(200).json(massage);
    } catch (error) {

        console.log("Error in getMassage controller: ", error.massage);
        res.status(500).json({ error: "Internal server Error" })

    }


}

//send massage
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // upload base64 image to cloudinary

            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receverId,
            text,
            image: imageUrl,
        });
        await newMessage.save()

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMassage controller: ", error.massage);
        res.status(500).json({ error: "Internal server Error" })
    }
}


// getAllChatpertner

export const getChatpertner = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const mesages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receverId: loggedInUserId }],
        });
        const chatPartnerId = [...new Set(
            mesages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receverId.toString() : msg.senderId.toString()
            ),
        ),
        ]

        const chatPartners = await User.find({_id:{$in : chatPartnerId}}).select("-password")
        res.status(200).json(chatPartners)
    } catch (error) {

        console.log("Error in getChatPartners: ", error.massage);
        res.status(500).json({ error: "Internal server Error" })
    }
}
