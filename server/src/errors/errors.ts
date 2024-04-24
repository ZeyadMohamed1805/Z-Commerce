import { Request, Response, NextFunction } from "express";
import { TError } from "../types/error";

// Custom Error
export const customError = (
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

// Create Error
export const createError = (status: number, message: string) => {
	const error: TError = new Error();
	error.status = status;
	error.message = message;

	return error;
};
