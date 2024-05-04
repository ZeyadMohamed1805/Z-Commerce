"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeller = exports.createSeller = exports.readSellers = void 0;
const sellers_1 = __importDefault(require("../models/sellers"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const errors_1 = require("../errors/errors");
// Read Sellers
const readSellers = async (request, response, next) => {
    try {
        // Get The Sellers From The Database
        const sellers = await sellers_1.default.find();
        // If Sellers Don't Exist
        if (!sellers.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No sellers found"));
        // Send The Sellers As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", sellers: sellers });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readSellers = readSellers;
// Create Seller
const createSeller = async (request, response, next) => {
    // Destruct The File And Body From The Request
    const { body, file } = request;
    try {
        // If Body Was Not Sent
        if (!body)
            return response.status(404).json({
                status: "Fail",
                message: "Body was not found in the params",
            });
        let uploadedFile;
        // If File Was Sent
        if (file) {
            // Upload Image To Cloudinary
            uploadedFile = await cloudinary_1.default.uploader.upload(file.path);
        }
        // Create The Seller
        const seller = new sellers_1.default({
            ...body,
            image: uploadedFile && uploadedFile.secure_url,
            cloudinary_id: uploadedFile && uploadedFile.public_id,
        });
        // Save The Seller To The Database
        const savedSeller = await seller.save();
        // Return The Seller As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", seller: savedSeller });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.createSeller = createSeller;
// Update Seller
const updateSeller = async (request, response, next) => {
    // Destruct The Body, File, & Params From The Request
    const { body, file, params: { id }, } = request;
    try {
        // If Id Was Not Sent
        if (!id)
            return response.status(404).json({
                status: "Fail",
                message: "Id was not found in the params",
            });
        // If Body Was Not Sent
        if (!body)
            return response.status(404).json({
                status: "Fail",
                message: "Body was not found in the params",
            });
        // Get The Seller From The Database
        const seller = await sellers_1.default.findById(id);
        // If Seller Was Not Found
        if (!seller)
            return response.status(404).json({
                status: "Fail",
                message: `No seller was found by id = ${id}`,
            });
        let uploadedFile;
        // If File Was Sent
        if (file) {
            // Delete image from cloudinary
            await cloudinary_1.default.uploader.destroy(seller.cloudinary_id);
            // Upload image to cloudinary
            uploadedFile = await cloudinary_1.default.uploader.upload(file.path);
        }
        // Initialize The Seller's New Data
        const data = {
            ...body,
            image: uploadedFile ? uploadedFile.secure_url : seller.image,
            cloudinary_id: uploadedFile
                ? uploadedFile.public_id
                : seller.cloudinary_id,
        };
        // Update The Seller In The Database
        const newSeller = await sellers_1.default.findByIdAndUpdate(id, data, {
            new: true,
        });
        // Return The Response To The Client
        return response
            .status(200)
            .json({ status: "Success", user: newSeller });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.updateSeller = updateSeller;
