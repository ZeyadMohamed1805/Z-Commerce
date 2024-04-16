import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
const server: Express = express();

server.get("/", (request: Request, response: Response) =>
	response.status(200).end("Welcome To Z-Commerce Server")
);

server.listen(port, () => console.log(`Server is running on port ${port}`));
