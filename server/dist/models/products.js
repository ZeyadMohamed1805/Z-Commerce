"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = require("../types/products");
const { Schema } = mongoose_1.default;
// Product Schema
const ProductSchema = new Schema({
    images: [{ type: String }],
    name: { type: String, required: true, maxlength: 15 },
    price: { type: Number, required: true, max: 5000 },
    rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    },
    state: {
        type: Number,
        required: true,
        default: 1,
        enum: products_1.EProductState,
    },
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
    quantity: { type: Number, required: true, default: 0, max: 100 },
    seller: {
        _id: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
        name: { type: String, required: true },
    },
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Product", ProductSchema);
