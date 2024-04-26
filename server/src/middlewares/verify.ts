// Modules & Variables
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { createError } from "../errors/errors";

// Verify Token
export const verifyToken: RequestHandler = (
	request: Request & { user?: any },
	response: Response,
	next: NextFunction
) => {
	// Destruct The Token From The Request Cookies
	const { token } = request.body;

	// Check If Token Doesn't Exist
	if (!token) return next(createError(401, "You Are Not Authenticated..."));

	// Verify Token
	jwt.verify(token, process.env.JWT_SECRET!, (error: unknown, user: any) => {
		// Check Token Validity
		if (error) return next(createError(401, "Invalid Token..."));

		// Add The User To The Request
		request.user = user;

		// Pass To The Next Middleware
		next();
	});
};

// Verify User
export const verifyUser: RequestHandler = (
	request: Request & { user?: any },
	response: Response,
	next: NextFunction
) => {
	// Call the Verify Token
	verifyToken(request, response, () => {
		// Destruct The User & Params From The Request
		const { user, params } = request;
		// Check If IDs Match Or If The User Is An Admin
		if (user.id === params.id) return next();
		else return next(createError(403, "Invalid Token..."));
	});
};
