// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Product from "../models/products";
import cloudinary from "../utils/cloudinary";
import { createError } from "../errors/errors";

// Read Products
export const readProducts = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The Name And Seller Name From The Params
	const { name, seller } = request.query;

	try {
		// Get The Products From The Database
		const products = name
			? await Product.find({ name: { $regex: name } })
			: seller
			? await Product.find({ "seller.name": { $regex: seller } })
			: await Product.find();
		// If Products Don't Exist
		if (!products.length)
			// Return The Error To The Client
			return next(createError(404, "No products found"));
		// Send The Products As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", products: products });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Create Product
export const createProduct = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The File And Body From The Request
	const { body, file } = request;
	console.log(body, file, 1);

	try {
		// If Body Was Not Sent
		if (!body)
			// Return The Error As A Response To The Client
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
		console.log(2);
		// Create The Product
		const product = new Product({
			...body,
			images: uploadedFile && [uploadedFile.secure_url],
			cloudinary_ids: [uploadedFile && uploadedFile.public_id],
		});
		console.log(3);
		// Save The Product To The Database
		const savedProduct = await product.save();
		console.log(4);
		// Return The Product As A Response To The Client
		return response
			.status(200)
			.json({ status: "Success", product: savedProduct });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Update Product
export const updateProduct = async (
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

	console.log(body, file, id, 1);

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
		// Get The Product From The Database
		const product = await Product.findById(id);
		console.log(2);
		// If Product Was Not Found
		if (!product)
			return response.status(404).json({
				status: "Fail",
				message: `No product was found by id = ${id}`,
			});
		let uploadedFile;
		// If File Was Sent
		if (file) {
			// Delete image from cloudinary
			product.cloudinary_ids.forEach(async (image) => {
				await cloudinary.uploader.destroy(image);
			});
			// Upload image to cloudinary
			uploadedFile = await cloudinary.uploader.upload(file.path);
		}
		console.log(3);
		// Initialize The Product's New Data
		const data = {
			...body,
			images: uploadedFile ? [uploadedFile.secure_url] : product.images,
			cloudinary_ids: uploadedFile
				? [uploadedFile.public_id]
				: product.cloudinary_ids,
		};
		// Update The Product In The Database
		const newProduct = await Product.findByIdAndUpdate(id, data, {
			new: true,
		});
		console.log(4);
		// Return The Response To The Client
		return response
			.status(200)
			.json({ status: "Success", product: newProduct });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Delete Product
export const deleteProduct = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The ID From The Request Params
	const {
		params: { id },
	} = request;

	try {
		// If Id Was Not Sent
		if (!id)
			return response.status(404).json({
				status: "Fail",
				message: "Id was not found in the params",
			});
		// Delete The Product From The Database
		const product = await Product.findByIdAndDelete(id);
		// Delete Product Images from Cloudinary
		if (product?.cloudinary_ids) {
			product?.cloudinary_ids?.forEach(async (image) => {
				await cloudinary.uploader.destroy(image);
			});
		}
		// Return The Response To The Client
		return response
			.status(200)
			.json({ status: "Success", product: product });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
