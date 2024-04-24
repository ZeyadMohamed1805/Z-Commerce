import { Request, Response, NextFunction } from "express";
import { TError } from "../types/error";

// Custom Error
const customError = (
	error: TError,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const errorStatus = error.status || 500;
	const errorMessage = error.message || "Something Went Wrong!";
	return response
		.status(errorStatus)
		.json({ status: "Fail", message: errorMessage });
};

// Exports
export default customError;
