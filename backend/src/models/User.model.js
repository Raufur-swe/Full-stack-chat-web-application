import mongoose from "mongoose";

// User schema definition
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

// ✅ SAFE model creation (prevents overwrite error)
const User =
    mongoose.models.User || mongoose.model("User", userSchema);

export default User;
