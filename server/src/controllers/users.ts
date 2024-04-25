// Modules & Variables
import { NextFunction, Request, Response } from "express";
import User from "../models/users";
import { createError } from "../errors/errors";

// Read Users
export const readUsers = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Users From The Database
		const users = await User.find();
		// If Users Don't Exist
		if (!users.length)
			// Return The Error To The Client
			return next(createError(404, "No users found"));
		// Send The Users As A Response To The Client
		return response.status(200).json({ status: "Success", users: users });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
