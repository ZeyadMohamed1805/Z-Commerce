"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSummaries = void 0;
const summaries_1 = __importDefault(require("../models/summaries"));
const errors_1 = require("../errors/errors");
// Read Summaries
const readSummaries = async (request, response, next) => {
    try {
        // Get The Summaries From The Database
        const summaries = await summaries_1.default.find();
        // If Summaries Don't Exist
        if (!summaries.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No summaries found"));
        // Send The Summaries As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", summaries: summaries });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readSummaries = readSummaries;
