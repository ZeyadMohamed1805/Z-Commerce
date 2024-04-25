// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Seller from "../models/sellers";
import { createError } from "../errors/errors";

// Read Sellers
export const readSellers = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Sellers From The Database
		const sellers = await Seller.find();
		// If Sellers Don't Exist
		if (!sellers.length)
			// Return The Error To The Client
			return next(createError(404, "No sellers found"));
		// Send The Sellers As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", sellers: sellers });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
