
// check the authintacation for changing profile

// Import jsonwebtoken package for verifying JWT tokens
import jwt, { decode } from "jsonwebtoken";

// Import User model to fetch user data from database
import User from "../models/user.model.js";

// Import environment variables (JWT secret key)
import { ENV } from "../lib/env.js";

// Middleware to protect private routes
export const protectRoute = async (req, res, next) => {
    try {
        // Get JWT token from cookies
        const token = req.cookies.jwt;

        // If token is not found, user is not authorized
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided"
            });
        }

        // Verify the token using secret key
        const decoded = jwt.verify(token, ENV.JWT_SECRATE);

        // If token is invalid
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token"
            });
        }

        // Find user by ID from decoded token
        // Exclude password field for security
        const user = await User.findById(decoded.userID).select("-password");

        // If user does not exist in database
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Attach user data to request object
        req.user = user;

        // Move to the next middleware or controller
        next();

    } catch (error) {
        // Log error for debugging
        console.log("Error in protectRoute middleware:", error);

        // Send internal server error response
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
