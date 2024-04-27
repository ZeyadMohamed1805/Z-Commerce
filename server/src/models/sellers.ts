// Modules
import mongoose, { Model } from "mongoose";
import { ISeller } from "../types/sellers";
const { Schema } = mongoose;

// Seller Schema
const SellerSchema = new Schema<ISeller, Model<ISeller>>(
	{
		image: { type: String },
		cloudinary_id: { type: String },
		rating: { type: Number, default: 5, min: 1, max: 5 },
		inventory: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		user: {
			type: Schema.Types.ObjectId,
			unique: true,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<ISeller, Model<ISeller>>("Seller", SellerSchema);
