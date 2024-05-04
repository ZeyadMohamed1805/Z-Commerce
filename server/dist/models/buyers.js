"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Buyer Schema
const BuyerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User",
    },
    cart: [
        {
            _id: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number },
        },
    ],
    wishlist: [
        {
            _id: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number },
        },
    ],
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Buyer", BuyerSchema);
