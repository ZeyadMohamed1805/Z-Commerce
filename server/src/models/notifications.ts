// Modules
import mongoose, { Model } from "mongoose";
import { INotification } from "../types/notifications";
const { Schema } = mongoose;

// Notifications Schema
const NotificationSchema = new Schema<INotification, Model<INotification>>(
	{
		message: { type: String, required: true },
		date: { type: Date, default: Date.now, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<INotification, Model<INotification>>(
	"Notification",
	NotificationSchema
);
