// Modules
import mongoose, { Model } from "mongoose";
import { IUser, EUserRole } from "../types/users";
const { Schema, Types } = mongoose;

// User Schema
const UserSchema = new Schema<IUser, Model<IUser>>(
	{
		firstName: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 25,
		},
		lastName: { type: String, minlength: 5, maxlength: 25 },
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
				"Please enter a valid email address",
			],
		},
		password: { type: String, required: true, minlength: 12 },
		role: { type: Number, required: true, enum: EUserRole },
		paymentDetails: [{ type: Types.ObjectId, ref: "Payment" }],
		orders: [{ type: Types.ObjectId, ref: "Order" }],
		notifications: [{ type: Types.ObjectId, ref: "Notification" }],
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<IUser, Model<IUser>>("User", UserSchema);
