"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Seller Schema
const SellerSchema = new Schema({
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
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Seller", SellerSchema);
