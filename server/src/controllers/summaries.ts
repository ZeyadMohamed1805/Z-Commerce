// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Summary from "../models/summaries";
import { createError } from "../errors/errors";

// Read Summaries
export const readSummaries = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Summaries From The Database
		const summaries = await Summary.find();
		// If Summaries Don't Exist
		if (!summaries.length)
			// Return The Error To The Client
			return next(createError(404, "No summaries found"));
		// Send The Summaries As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", summaries: summaries });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
