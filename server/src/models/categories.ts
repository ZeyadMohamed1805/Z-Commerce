// Modules
import mongoose, { Model } from "mongoose";
import { ICategory } from "../types/categories";
const { Schema } = mongoose;

// Categories Schema
const CategorySchema = new Schema<ICategory, Model<ICategory>>(
	{
		name: { type: String, required: true, unique: true },
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		subcategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<ICategory, Model<ICategory>>(
	"Category",
	CategorySchema
);
