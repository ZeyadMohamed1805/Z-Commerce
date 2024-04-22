// Imports
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Access Environment Variables
dotenv.config();

// Initialize Server & Port Number
const port = process.env.PORT || 5000;
const server: Express = express();

server.get("/", (request: Request, response: Response) =>
	response.status(200).end("Welcome To Z-Commerce Server")
);

// Connect To Database
const connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO!);
	} catch (error) {
		throw error;
	}
};

// Run The Server
server.listen(port, () => {
	connectDatabase();
	console.log("Connected to Backend...");
});
