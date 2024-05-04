"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBuyers = void 0;
const buyers_1 = __importDefault(require("../models/buyers"));
const errors_1 = require("../errors/errors");
// Read Buyers
const readBuyers = async (request, response, next) => {
    try {
        // Get The Buyers From The Database
        const buyers = await buyers_1.default.find();
        // If Buyers Don't Exist
        if (!buyers.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No buyers found"));
        // Send The Buyers As A Response To The Client
        return response.status(200).json({ status: "Success", buyers: buyers });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readBuyers = readBuyers;
