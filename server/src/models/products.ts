// Modules
import mongoose, { Model } from "mongoose";
import { EProductState, IProduct } from "../types/products";
const { Schema } = mongoose;

// Product Schema
const ProductSchema = new Schema<IProduct, Model<IProduct>>(
	{
		images: [{ type: String }],
		name: { type: String, required: true },
		price: { type: Number, required: true },
		rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
		description: { type: String, required: true, minlength: 15 },
		state: {
			type: Number,
			required: true,
			default: 1,
			enum: EProductState,
		},
		creationDate: { type: Date, required: true, default: Date.now() },
		categories: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Category",
				},
				name: { type: String, required: true },
			},
		],
		quantity: { type: Number, required: true, default: 0 },
		seller: {
			_id: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
			name: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<IProduct, Model<IProduct>>(
	"Product",
	ProductSchema
);
