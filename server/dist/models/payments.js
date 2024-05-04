"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Payments Schema
const PaymentSchema = new Schema({
    address: { type: String, required: true, minlength: 10, maxlength: 50 },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Payment", PaymentSchema);
