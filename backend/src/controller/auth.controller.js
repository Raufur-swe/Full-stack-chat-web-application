import bcrypt, { truncates } from "bcryptjs";
import User from "../models/user.model.js";
import { genarateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emials/emailHandelers.js";
import dotenv from "dotenv"
import cloudinary from "../lib/cludinary.js";
dotenv.config();

//sign up routes
export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // User exists?
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "This email already has an account" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            fullName,
            email,
            password: hashPass
        });

        // Token + save
        // await newUser.save();
        //genarateToken(newUser._id, res);
        if (newUser) {

            const savedUser = await newUser.save();
            genarateToken(savedUser._id, res)


            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            });
            // send welcome email to user

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
            } catch (error) {
                console.error("Failed to send welcome email:", error)

            }
        } else {
            res.status(400).json({ massage: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// login routes

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ massage: "email and password required" });
    }

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ massage: "Invalid credentials" }); // never tell user which on incorrect
        const isPassCorrect = await bcrypt.compare(password, user.password)
        if (!isPassCorrect) return res.status(400).json({ massage: "Invalid credentials" });
        genarateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {

        console.log("Error in login controller:", error);
        res.status(500).json({ massage: "Invalid credentials" });
    }
}

// logout

export const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ massage: "Logout successfully" });
};

// updateProfile

// Controller function to update user profile picture
export const updateProfile = async (req, res) => {
    try {
        // Extract profilePic from request body
        const { profilePic } = req.body;

        // If profile picture is not provided, return bad request
        if (!profilePic) {
            return res.status(400).json({
                message: "Profile pic is required"
            });
        }

        // Get user ID from request body
        // (Usually this should come from req.user after auth middleware)
        const userID = req.user._id;

        // Upload profile picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // Update user's profilePic field in database
        // secure_url is the HTTPS image URL provided by Cloudinary
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { profilePic: uploadResponse.secure_url },
            { new: true } // Return updated document
        );

        // Send updated user data as response
        res.status(200).json(updatedUser);

    } catch (error) {
        // Log error for debugging
        console.log("Error in update profile:", error);

        // Send internal server error response
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
