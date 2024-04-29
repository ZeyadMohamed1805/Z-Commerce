// Modules & Variables
import { NextFunction, Request, Response } from "express";
import User from "../models/users";
import Buyer from "../models/buyers";
import Seller from "../models/sellers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import comparePassword from "../utils/compare";
import { createError } from "../errors/errors";
import hashPassword from "../utils/hash";
import Payment from "../models/payments";

// Access Environment Variables
dotenv.config();

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
		const newUser = new User({
			email: body.email,
			password: hashPassword(body.password),
			name: body.name,
			role: body.role,
		});
		// Save The User To The Database
		const savedUser = await newUser.save();
		// Create A New Role
		!body.role
			? await new Buyer({ user: savedUser._id }).save()
			: await new Seller({
					user: savedUser._id,
					inventory: ["662ae178e49fef5c59b15606"],
			  }).save();
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

// Login User
export const loginUser = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct the Email & Password from the Request Body
	const { email, password } = request.body;

	try {
		// Find The User With The Requested Username
		const user = await User.findOne({ email: email });

		// Check If User Doesn't Exist
		if (!user)
			return next(createError(404, `No user with email ${email}...`));

		// Compare Passwords
		const passwordCheck = await comparePassword(password, user.password);

		// Check If Passwords Don't Match
		if (!passwordCheck)
			return next(createError(400, "Incorrect email or password"));

		// Create JWT Token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
			expiresIn: process.env.JWT_LIFETIME,
		});

		// Send The User As A Response To The Client
		response.status(200).json({ user: user, token: token });
	} catch (error) {
		// Send The Error As A Response To The Client
		return next(createError(500, "Login Failed..."));
	}
};

// Get User With Payment
export const getUserWithPayment = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct User ID From Params
	const { id } = request.params;

	try {
		if (!id)
			return next(createError(404, "User id was not sent in the params"));
		const user = await User.findById(id);
		if (!user)
			return next(createError(404, `No user was found with id = ${id}`));
		const payment = await Payment.findOne({ user: id });
		return payment
			? response
					.status(200)
					.json({ status: "Success", user: user, payment: payment })
			: response.status(200).json({ status: "Success", user: user });
	} catch (error: any) {
		// Send The Error As A Response To The Client
		return next(createError(500, error.message));
	}
};
