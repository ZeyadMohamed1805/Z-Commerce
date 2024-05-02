// Modules & Variables
import { NextFunction, Request, Response } from "express";
import Product from "../models/products";
import cloudinary from "../utils/cloudinary";
import { createError } from "../errors/errors";
import User from "../models/users";
import Buyer from "../models/buyers";
import Seller from "../models/sellers";
import Category from "../models/categories";

// Read Products
export const readProducts = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The Name And Seller Name From The Params
	const { name, seller, category, page, limit } = request.query;

	try {
		const currentPage = Number(page) || 1;
		const currentLimit = Number(limit) || 12;
		const startIndex = (currentPage - 1) * currentLimit;

		let categoryID: any = null;
		// Get The Category IDs
		if (category && category.length) {
			categoryID = await Category.findOne({
				name: category,
			});
		}
		let products;
		let totalPages;
		// Get The Products From The Database
		if (!categoryID) {
			products = name
				? await Product.find({ name: { $regex: name } })
						.skip(startIndex)
						.limit(currentLimit)
				: seller
				? await Product.find({ "seller.name": { $regex: seller } })
						.skip(startIndex)
						.limit(currentLimit)
				: await Product.find().skip(startIndex).limit(currentLimit);
		} else {
			products = name
				? await Product.find({
						name: { $regex: name },
						"categories._id": categoryID._id,
				  })
						.skip(startIndex)
						.limit(currentLimit)
				: seller
				? await Product.find({
						"seller.name": { $regex: seller },
						"categories._id": categoryID._id,
				  })
						.skip(startIndex)
						.limit(currentLimit)
				: await Product.find({ "categories._id": categoryID._id })
						.skip(startIndex)
						.limit(currentLimit);
		}
		// If Products Don't Exist
		if (!products.length)
			// Return The Error To The Client
			return next(createError(404, "No products found"));
		// Send The Products As A Response To The Client
		return response.status(200).json({
			status: "Success",
			products: products,
			// totalPages: Math.ceil(totalPages / currentLimit),
		});
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Read Newest Products
export const readNewestProducts = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Products From The Database
		const products = await Product.find({}, null, {
			sort: { createdAt: -1 },
		}).limit(3);
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

// Read Most Loved Products
export const readMostLovedProducts = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		// Get The Products From The Database
		const products = await Product.find({}, null, {
			sort: { rating: -1 },
		}).limit(3);
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

// Read Inventory
export const readInventory = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The User Id From The Params
	const { id } = request.params;

	try {
		if (!id)
			// Return The Error As A Response To The Client
			return response.status(404).json({
				status: "Fail",
				message: "Id was not found in the params",
			});
		// Get The Seller With User ID
		const seller = await Seller.findOne({ user: id });
		if (!seller)
			// Return The Error As A Response To The Client
			return response.status(404).json({
				status: "Fail",
				message: "Cannot find the seller with the given user id",
			});
		// Get Products Of The Seller
		const products = await Product.find({
			"seller._id": { $in: seller._id },
		});
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
	const {
		body,
		file,
		params: { id },
	} = request;
	console.log(body, file, 1);

	try {
		// If Body Was Not Sent
		if (!body.product)
			// Return The Error As A Response To The Client
			return response.status(404).json({
				status: "Fail",
				message: "Body was not found in the request",
			});
		// If ID Was Not Sent
		if (!id)
			// Return The Error As A Response To The Client
			return response.status(404).json({
				status: "Fail",
				message: "Id was not found in the params",
			});
		// Find The User
		const user = await User.findById(id);
		if (!user)
			// Return The Error As A Response To The Client
			return response.status(404).json({
				status: "Fail",
				message: "User was not found in the database",
			});
		// Find The Seller
		const seller = await Seller.findOne({ user: id });
		if (!seller)
			// Return The Error As A Response To The Client
			return response.status(404).json({
				status: "Fail",
				message: "Seller was not found in the database",
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
			...JSON.parse(body.product),
			seller: {
				_id: seller._id,
				name: user.name,
			},
			images: uploadedFile && [uploadedFile.secure_url],
			cloudinary_ids: [uploadedFile && uploadedFile.public_id],
		});
		console.log(3);
		// Save The Product To The Database
		const savedProduct = await product.save();
		if (!savedProduct)
			return response.status(500).json({
				status: "Fail",
				message: "Product was not saved successfully",
			});
		console.log(4);
		// Update The Seller's Inventory
		const updatedSeller = await Seller.findOneAndUpdate(
			{ user: id },
			{ $push: { inventory: savedProduct._id } },
			{ new: true }
		);
		if (!updatedSeller)
			return response.status(500).json({
				status: "Fail",
				message: "Seller inventory was not updated successfully",
			});
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
		if (!body.product)
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
		console.log(3);
		// Update The Product In The Database
		const newProduct = await Product.findByIdAndUpdate(
			id,
			{
				name: body.product.name,
				price: body.product.price,
				quantity: body.product.quantity,
				description: body.product.description,
			},
			{
				new: true,
			}
		);
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

// Add Product To Cart
export const addToCart = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The ID From The Request Params
	const {
		params: { id },
		body: { productId },
	} = request;

	try {
		// If Id Was Not Sent
		if (!id)
			return response.status(404).json({
				status: "Fail",
				message: "Id was not found in the params",
			});
		// If Product Was Not Sent
		if (!productId)
			return response.status(404).json({
				status: "Fail",
				message: "Product Id was not found in the body",
			});
		// Get The User Data
		const user = await User.findById(id);
		// If User Was Not Found
		if (!user)
			return response.status(404).json({
				status: "Fail",
				message: `User with id ${id} was not found`,
			});
		// If The User Was Not A Buyer
		if (user.role)
			return response.status(401).json({
				status: "Fail",
				message: `Non buyers are not authorized to add an item to the cart`,
			});
		// Get The Buyer
		const buyer = await Buyer.findOne({ user: user._id });
		// If Buyer Was Not Found
		if (!buyer)
			return response.status(404).json({
				status: "Fail",
				message: `This user id doesn't belong to a buyer`,
			});
		// Increase The Product Quantity
		const updatedQuantityBuyer = await Buyer.findOneAndUpdate(
			{ _id: buyer._id, "cart._id": productId },
			{ $inc: { "cart.$.quantity": 1 } },
			{ new: true }
		);
		// If Product Quantity Was Increased
		if (updatedQuantityBuyer) {
			// Return Response To The Client
			return response
				.status(200)
				.json({ status: "Success", product: updatedQuantityBuyer });
		}
		// Add The Product To The Cart
		const updatedProductBuyer = await Buyer.findByIdAndUpdate(
			buyer._id,
			{ $push: { cart: { _id: productId, quantity: 1 } } },
			{ new: true }
		);
		// If Product Was Added
		if (updatedProductBuyer)
			// Return Response To The Client
			return response
				.status(200)
				.json({ status: "Success", product: updatedProductBuyer });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};

// Add Product To Wishlist
export const addToWishlist = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// Destruct The ID From The Request Params
	const {
		params: { id },
		body: { productId },
	} = request;

	try {
		// If Id Was Not Sent
		if (!id)
			return response.status(404).json({
				status: "Fail",
				message: "Id was not found in the params",
			});
		// If Product Was Not Sent
		if (!productId)
			return response.status(404).json({
				status: "Fail",
				message: "Product Id was not found in the body",
			});
		// Get The User Data
		const user = await User.findById(id);
		// If User Was Not Found
		if (!user)
			return response.status(404).json({
				status: "Fail",
				message: `User with id ${id} was not found`,
			});
		// If The User Was Not A Buyer
		if (user.role)
			return response.status(401).json({
				status: "Fail",
				message: `Non buyers are not authorized to add an item to the cart`,
			});
		// Get The Buyer
		const buyer = await Buyer.findOne({ user: user._id });
		// If Buyer Was Not Found
		if (!buyer)
			return response.status(404).json({
				status: "Fail",
				message: `This user id doesn't belong to a buyer`,
			});
		// Find If The Buyer has this item in the wishlist
		const isItemWished = buyer.wishlist.findIndex(
			(item) => item._id === productId
		);
		// If Item Was Found In The Wishlist
		if (isItemWished === -1) {
			return response.status(400).json({
				status: "Fail",
				message: `This item is already in you wishlist`,
			});
		}
		// Add The Product To The Wishlist
		const updatedProductBuyer = await Buyer.findByIdAndUpdate(
			buyer._id,
			{ $push: { wishlist: { _id: productId, quantity: 1 } } },
			{ new: true }
		);
		// If Product Was Added
		if (updatedProductBuyer)
			// Return Response To The Client
			return response
				.status(200)
				.json({ status: "Success", product: updatedProductBuyer });
	} catch (error: unknown) {
		// Send The Error As A Response To The Client
		return next(error);
	}
};
