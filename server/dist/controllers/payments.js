"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPayment = void 0;
const payments_1 = __importDefault(require("../models/payments"));
const errors_1 = require("../errors/errors");
// Read Payment
const readPayment = async (request, response, next) => {
    const { id } = request.params;
    try {
        if (!id)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No payments found"));
        const payment = await payments_1.default.findOne({ user: id });
        // If Payments Don't Exist
        if (!payment)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, `No payment found with id = ${id}`));
        // Send The Payments As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", payment: payment });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readPayment = readPayment;
