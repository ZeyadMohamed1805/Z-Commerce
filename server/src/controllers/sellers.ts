// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Seller from "../models/sellers";
import cloudinary from "../utils/cloudinary";
import { createError } from "../errors/errors";

// Read Sellers
export const readSellers = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Sellers From The Database
		const sellers = await Seller.find();
		// If Sellers Don't Exist
		if (!sellers.length)
			// Return The Error To The Client
			return next(createError(404, "No sellers found"));
		// Send The Sellers As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", sellers: sellers });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Create Seller
export const createSeller = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
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
			uploadedFile = await cloudinary.uploader.upload(file.path);
		}
		// Create The Seller
		const seller = new Seller({
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
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Update Seller
export const updateSeller = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The Body, File, & Params From The Request
	const {
		body,
		file,
		params: { id },
	} = request;

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
		const seller = await Seller.findById(id);
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
			await cloudinary.uploader.destroy(seller.cloudinary_id!);
			// Upload image to cloudinary
			uploadedFile = await cloudinary.uploader.upload(file.path);
		}
		// Initialize The Seller's New Data
		const data = {
			...body,
			image: uploadedFile ? uploadedFile.secure_url : seller.image!,
			cloudinary_id: uploadedFile
				? uploadedFile.public_id
				: seller.cloudinary_id!,
		};
		// Update The Seller In The Database
		const newSeller = await Seller.findByIdAndUpdate(id, data, {
			new: true,
		});
		// Return The Response To The Client
		return response
			.status(200)
			.json({ status: "Success", user: newSeller });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
