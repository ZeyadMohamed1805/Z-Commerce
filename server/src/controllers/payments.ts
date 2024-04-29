// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Payment from "../models/payments";
import { createError } from "../errors/errors";

// Read Payment
export const readPayment = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id } = request.params;

	try {
		if (!id)
			// Return The Error To The Client
			return next(createError(404, "No payments found"));
		const payment = await Payment.findOne({ user: id });
		// If Payments Don't Exist
		if (!payment)
			// Return The Error To The Client
			return next(createError(404, `No payment found with id = ${id}`));
		// Send The Payments As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", payment: payment });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
