// Import Cloudinary v2 SDK and rename it as cloudinary
import { v2 as cloudinary } from "cloudinary";

// Import environment variables (Cloudinary credentials)
import { ENV } from "./env.js";

// Configure Cloudinary with account credentials
cloudinary.config({
    // Cloudinary cloud name
    cloud_name: ENV.CLOUDINARY_NAME,

    // Cloudinary API key
    api_key: ENV.CLOUDINARY_API_KEY,

    // Cloudinary API secret
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

// Export configured cloudinary instance
export default cloudinary;


/* 🔍 What this file does (simple explanation)

Connects your backend to Cloudinary

Uses environment variables to keep credentials secure

Exports a ready-to-use cloudinary instance

You can use it anywhere to:

Upload images

Delete images

Manage media files*/