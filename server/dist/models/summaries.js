"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Summary Schema
const SummarySchema = new Schema({
    products: [
        {
            _id: { type: Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    subtotal: { type: Number, required: true, min: 5 },
    shipping: { type: Number, required: true, default: 0 },
    taxes: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, min: 5 },
    order: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Summary", SummarySchema);
