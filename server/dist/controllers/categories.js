"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCategories = void 0;
const categories_1 = __importDefault(require("../models/categories"));
const errors_1 = require("../errors/errors");
// Read Categories
const readCategories = async (request, response, next) => {
    try {
        // Get The Categories From The Database
        const categories = await categories_1.default.find();
        // If Categories Don't Exist
        if (!categories.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No categories found"));
        // Send The Categories As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", categories: categories });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readCategories = readCategories;
