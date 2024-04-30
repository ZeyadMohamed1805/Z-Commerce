// Modules & Variables
import { NextFunction, Request, Response } from "express";
import { createError } from "../errors/errors";
import Payment from "../models/payments";
import Order from "../models/orders";
import Summary from "../models/summaries";
import User from "../models/users";
import Seller from "../models/sellers";

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

// Create Order
export const createOrder = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct ID & Body From The Request
	const {
		params: { id },
		body,
	} = request;

	try {
		if (!id)
			// Return The Error To The Client
			return next(createError(404, "User id was not sent in the params"));
		if (!body || !body.order || !body.summary)
			// Return The Error To The Client
			return next(
				createError(404, "Body was missing crucial information")
			);
		if (body.payment) {
			const userPayment = await Payment.findOne({ user: id });
			if (!userPayment) {
				const savedPayment = await new Payment(body.payment).save();
				if (!savedPayment)
					// Return The Error To The Client
					return next(
						createError(
							500,
							"Payment details was not saved successfully"
						)
					);
				const updatedUser = await User.findByIdAndUpdate(
					id,
					{ paymentDetails: [savedPayment._id] },
					{ new: true }
				);
				if (!updatedUser)
					// Return The Error To The Client
					return next(
						createError(
							500,
							"Payment details was not linked to the user successfully"
						)
					);
				console.log("Payment saved");
			}
		}
		const order = await new Order(body.order).save();
		if (!order)
			// Return The Error To The Client
			return next(createError(500, "Order was not created successfully"));
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $push: { orders: order._id } },
			{ new: true }
		);
		if (!updatedUser)
			// Return The Error To The Client
			return next(
				createError(
					500,
					"Order was not linked to the user successfully"
				)
			);
		const sellers = await Seller.find({ _id: { $in: order.sellers } });
		sellers.forEach(async (seller: any) => {
			const updatedSellerUser = await User.findByIdAndUpdate(
				seller.user,
				{ $push: { orders: order._id } },
				{ new: true }
			);

			if (!updatedSellerUser)
				// Return The Error To The Client
				return next(
					createError(500, "Seller order was not added successfully")
				);
		});
		const summary = await new Summary({
			...body.summary,
			order: order._id,
		}).save();
		if (!summary)
			// Return The Error To The Client
			return next(
				createError(500, "Summary was not created successfully")
			);
		const updatedOrder = await Order.findByIdAndUpdate(
			order._id,
			{ summary: summary._id },
			{ new: true }
		);
		if (!updatedOrder)
			// Return The Error To The Client
			return next(createError(500, "Order doesn't have the summary"));
		const newUser = await User.findById(id);
		return response.status(200).json({ status: "Success", user: newUser });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Read Orders With Summary
export const readOrdersWithSummary = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct ID & Body From The Request
	const { id } = request.params;

	try {
		if (!id)
			// Return The Error To The Client
			return next(createError(404, "User id was not send in the params"));
		const user = await User.findById(id);
		if (!user)
			// Return The Error To The Client
			return next(createError(404, "User was not found in the database"));
		const orders = await Order.find({ _id: { $in: user?.orders } });
		if (orders.length) {
			const summaries = await Summary.find({
				_id: { $in: orders.map((order) => order.summary) },
			});
			return response.status(200).json({
				status: "Success",
				orders: orders,
				summaries: summaries,
			});
		} else {
			return response
				.status(200)
				.json({ status: "Success", orders: [], summaries: [] });
		}
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
