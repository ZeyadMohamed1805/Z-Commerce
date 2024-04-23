// Modules
import mongoose, { Model } from "mongoose";
import { IPayment } from "../types/payment";
const { Schema } = mongoose;

// Payments Schema
const PaymentSchema = new Schema<IPayment, Model<IPayment>>(
	{
		address: { type: String, required: true, minlength: 8, maxlength: 50 },
		card: { type: Number, required: true, minlength: 16, maxlength: 16 },
		cvv: {
			type: Number,
			required: true,
			match: [/^[0-9]{3,4}$/, "Invalid cvv number"],
		},
		phone: {
			type: Number,
			required: true,
			unique: true,
			minlength: 8,
			maxlength: 15,
		},
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<IPayment, Model<IPayment>>(
	"Payment",
	PaymentSchema
);
