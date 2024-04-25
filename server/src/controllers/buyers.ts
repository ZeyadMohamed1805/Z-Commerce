// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Buyer from "../models/buyers";
import { createError } from "../errors/errors";

// Read Buyers
export const readBuyers = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Buyers From The Database
		const buyers = await Buyer.find();
		// If Buyers Don't Exist
		if (!buyers.length)
			// Return The Error To The Client
			return next(createError(404, "No buyers found"));
		// Send The Buyers As A Response To The Client
		return response.status(200).json({ status: "Success", buyers: buyers });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
