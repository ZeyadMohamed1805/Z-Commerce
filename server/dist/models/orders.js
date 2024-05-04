"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Order Schema
const OrderSchema = new Schema({
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
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Order", OrderSchema);
