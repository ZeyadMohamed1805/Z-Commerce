// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Notification from "../models/notifications";
import { createError } from "../errors/errors";

// Read Notifications
export const readNotifications = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Notifications From The Database
		const notifications = await Notification.find();
		// If Notifications Don't Exist
		if (!notifications.length)
			// Return The Error To The Client
			return next(createError(404, "No notifications found"));
		// Send The Notifications As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", notifications: notifications });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
