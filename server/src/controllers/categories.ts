// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Category from "../models/categories";
import { createError } from "../errors/errors";

// Read Categories
export const readCategories = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Categories From The Database
		const categories = await Category.find();
		// If Categories Don't Exist
		if (!categories.length)
			// Return The Error To The Client
			return next(createError(404, "No categories found"));
		// Send The Categories As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", categories: categories });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
