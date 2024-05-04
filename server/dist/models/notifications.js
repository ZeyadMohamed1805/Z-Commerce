"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Notifications Schema
const NotificationSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now(), required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
// Exports
exports.default = mongoose_1.default.model("Notification", NotificationSchema);
