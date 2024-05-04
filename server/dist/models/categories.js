"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Categories Schema
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    supcategory: { type: Schema.Types.ObjectId, ref: "Category" },
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Category", CategorySchema);
