// Modules
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Access Environment Variables
dotenv.config();

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

// Exports
export default cloudinary;
