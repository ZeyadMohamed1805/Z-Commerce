// Modules
import mongoose, { Model } from "mongoose";
import { IBuyer } from "../types/buyers";
const { Schema } = mongoose;

// Buyer Schema
const BuyerSchema = new Schema<IBuyer, Model<IBuyer>>(
	{
		user: {
			type: Schema.Types.ObjectId,
			unique: true,
			required: true,
			ref: "User",
		},
		cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<IBuyer, Model<IBuyer>>("Buyer", BuyerSchema);
