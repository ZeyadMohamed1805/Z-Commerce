// Imports
import express, { Express } from "express";
import bodyParser from "body-parser";
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

// Middlewares
server.use(
	cors({
		origin: ["https://z-commerce-rho.vercel.app/"],
	})
);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Routes
routes.forEach((route) => {
	server.use(`/api/v1/${route.route}`, route.module);
});

// Errors
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
