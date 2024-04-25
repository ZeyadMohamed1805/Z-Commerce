// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Product from "../models/products";
import { createError } from "../errors/errors";

// Read Products
export const readProducts = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Products From The Database
		const products = await Product.find();
		// If Products Don't Exist
		if (!products.length)
			// Return The Error To The Client
			return next(createError(404, "No products found"));
		// Send The Products As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", products: products });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
