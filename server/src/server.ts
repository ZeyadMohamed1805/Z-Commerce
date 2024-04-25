// Imports
import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./exports/routes";
import { customError } from "./errors/errors";

// Access Environment Variables
dotenv.config();

// Initialize Server & Port Number
const port = process.env.PORT || 5000;
const server: Express = express();

// Routes
routes.forEach((route) => {
	server.use(`/api/v1/${route.route}`, route.module);
});

// Middlewares
server.use(
	cors({
		origin: ["http://localhost:4200"],
	})
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(customError);

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
