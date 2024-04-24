// Modules
import mongoose, { Model } from "mongoose";
import { ISummary } from "../types/summaries";
const { Schema } = mongoose;

// Summary Schema
const SummarySchema = new Schema<ISummary, Model<ISummary>>(
	{
		subtotal: { type: Number, required: true, min: 5 },
		shipping: { type: Number, required: true, default: 0 },
		taxes: { type: Number, required: true, default: 0 },
		total: { type: Number, required: true, min: 5 },
		order: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
	},
	{ timestamps: true }
);

// Exports
export default mongoose.model<ISummary, Model<ISummary>>(
	"Summary",
	SummarySchema
);
