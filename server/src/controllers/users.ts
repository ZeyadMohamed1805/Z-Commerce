// Modules & Variables
import { NextFunction, Request, Response } from "express";
import User from "../models/users";
import { createError } from "../errors/errors";

// Read User
export const readUser = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Extract The User ID From The Request Params
	const { id } = request.params;

	try {
		// Get The User From The Database
		const user = await User.findById(id);
		// If User Doesn't Exist
		if (!user)
			// Return The Error To The Client
			return next(createError(404, `No user found with id = ${id}`));
		// Send The User As A Response To The Client
		return response.status(200).json({ status: "Success", user: user });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Create User
export const createUser = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Extract The User From The Body
	const { body } = request;

	try {
		// If User Wasn't Sent
		if (!body)
			// Return The Error To The Client
			return next(createError(404, `No user found in the body`));
		// Create A New User
		const newUser = new User(body);
		// Save The User To The Database
		const savedUser = await newUser.save();
		// Send The User As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", user: savedUser });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Update User
export const updateUser = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Extract The User From The Body
	const {
		body,
		params: { id },
	} = request;

	try {
		// If ID Wasn't Sent
		if (!id)
			// Return The Error To The Client
			return next(createError(404, `No user id was found in the params`));
		// If User Wasn't Sent
		if (!body)
			// Return The Error To The Client
			return next(createError(404, `No user found in the body`));
		// Update The User In The Database
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true }
		);
		// Send The User As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", user: updatedUser });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
