// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Payment from "../models/payments";
import { createError } from "../errors/errors";

// Read Payments
export const readPayments = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Payments From The Database
		const payments = await Payment.find();
		// If Payments Don't Exist
		if (!payments.length)
			// Return The Error To The Client
			return next(createError(404, "No payments found"));
		// Send The Payments As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", payments: payments });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
