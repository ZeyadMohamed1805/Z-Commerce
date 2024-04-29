// Modules
import mongoose, { Model } from "mongoose";
import { IOrder } from "../types/orders";
const { Schema } = mongoose;

// Order Schema
const OrderSchema = new Schema<IOrder, Model<IOrder>>(
	{
		deliveryDate: { type: Date, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		sellers: [
			{ type: Schema.Types.ObjectId, ref: "Seller", required: true },
		],
		products: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		summary: {
			type: Schema.Types.ObjectId,
			ref: "Summary",
		},
		state: { type: Number, default: 0, required: true },
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<IOrder, Model<IOrder>>("Order", OrderSchema);
