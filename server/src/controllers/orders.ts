// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Order from "../models/orders";
import { createError } from "../errors/errors";

// Read Orders
export const readOrders = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Orders From The Database
		const orders = await Order.find();
		// If Orders Don't Exist
		if (!orders.length)
			// Return The Error To The Client
			return next(createError(404, "No orders found"));
		// Send The Orders As A Response To The Client
		return response.status(200).json({ status: "Success", orders: orders });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
