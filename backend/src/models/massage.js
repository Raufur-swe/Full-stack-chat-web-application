// creat text messeging model


import mongoose from "mongoose";

// Message schema definition
const messageSchema = new mongoose.Schema(
    {
        // Sender user ID
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Receiver user ID
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Text message
        text: {
            type: String,
            trim : true,
            maxlength : 2000,
        },

        // Image URL (optional)
        image: {
            type: String,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

// Prevent OverwriteModelError
const Message =
    mongoose.models.Message || mongoose.model("Message", messageSchema);

// Export Message model
export default Message;

