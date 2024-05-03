// Modules
import mongoose, { Model } from "mongoose";
import { IPayment } from "../types/payment";
const { Schema } = mongoose;

// Payments Schema
const PaymentSchema = new Schema<IPayment, Model<IPayment>>(
	{
		address: { type: String, required: true, minlength: 10, maxlength: 50 },
		phone: {
			type: String,
			required: true,
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
