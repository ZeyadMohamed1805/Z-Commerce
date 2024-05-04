"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("../types/users");
const { Schema } = mongoose_1.default;
// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            "Please enter a valid email address",
        ],
    },
    password: { type: String, required: true, minlength: 12 },
    role: { type: Number, required: true, enum: users_1.EUserRole },
    paymentDetails: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("User", UserSchema);
