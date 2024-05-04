"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToWishlist = exports.addToCart = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.readInventory = exports.readMostLovedProducts = exports.readNewestProducts = exports.readProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const errors_1 = require("../errors/errors");
const users_1 = __importDefault(require("../models/users"));
const buyers_1 = __importDefault(require("../models/buyers"));
const sellers_1 = __importDefault(require("../models/sellers"));
const categories_1 = __importDefault(require("../models/categories"));
// Read Products
const readProducts = async (request, response, next) => {
    // Destruct The Name And Seller Name From The Params
    const { name, seller, category, page, limit } = request.query;
    try {
        const currentPage = Number(page) || 1;
        const currentLimit = Number(limit) || 12;
        const startIndex = (currentPage - 1) * currentLimit;
        let categoryID = null;
        // Get The Category IDs
        if (category && category.length) {
            categoryID = await categories_1.default.findOne({
                name: category,
            });
        }
        let products;
        let totalPages;
        // Get The Products From The Database
        if (!categoryID) {
            products = name
                ? await products_1.default.find({ name: { $regex: name } })
                    .skip(startIndex)
                    .limit(currentLimit)
                : seller
                    ? await products_1.default.find({ "seller.name": { $regex: seller } })
                        .skip(startIndex)
                        .limit(currentLimit)
                    : await products_1.default.find().skip(startIndex).limit(currentLimit);
        }
        else {
            products = name
                ? await products_1.default.find({
                    name: { $regex: name },
                    "categories._id": categoryID._id,
                })
                    .skip(startIndex)
                    .limit(currentLimit)
                : seller
                    ? await products_1.default.find({
                        "seller.name": { $regex: seller },
                        "categories._id": categoryID._id,
                    })
                        .skip(startIndex)
                        .limit(currentLimit)
                    : await products_1.default.find({ "categories._id": categoryID._id })
                        .skip(startIndex)
                        .limit(currentLimit);
        }
        // If Products Don't Exist
        if (!products.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No products found"));
        // Send The Products As A Response To The Client
        return response.status(200).json({
            status: "Success",
            products: products,
            // totalPages: Math.ceil(totalPages / currentLimit),
        });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readProducts = readProducts;
// Read Newest Products
const readNewestProducts = async (request, response, next) => {
    try {
        // Get The Products From The Database
        const products = await products_1.default.find({}, null, {
            sort: { createdAt: -1 },
        }).limit(3);
        // If Products Don't Exist
        if (!products.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No products found"));
        // Send The Products As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", products: products });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readNewestProducts = readNewestProducts;
// Read Most Loved Products
const readMostLovedProducts = async (request, response, next) => {
    try {
        // Get The Products From The Database
        const products = await products_1.default.find({}, null, {
            sort: { rating: -1 },
        }).limit(3);
        // If Products Don't Exist
        if (!products.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No products found"));
        // Send The Products As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", products: products });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readMostLovedProducts = readMostLovedProducts;
// Read Inventory
const readInventory = async (request, response, next) => {
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
        const seller = await sellers_1.default.findOne({ user: id });
        if (!seller)
            // Return The Error As A Response To The Client
            return response.status(404).json({
                status: "Fail",
                message: "Cannot find the seller with the given user id",
            });
        // Get Products Of The Seller
        const products = await products_1.default.find({
            "seller._id": { $in: seller._id },
        });
        return response
            .status(200)
            .json({ status: "Success", products: products });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readInventory = readInventory;
// Create Product
const createProduct = async (request, response, next) => {
    // Destruct The File And Body From The Request
    const { body, file, params: { id }, } = request;
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
        const user = await users_1.default.findById(id);
        if (!user)
            // Return The Error As A Response To The Client
            return response.status(404).json({
                status: "Fail",
                message: "User was not found in the database",
            });
        // Find The Seller
        const seller = await sellers_1.default.findOne({ user: id });
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
            uploadedFile = await cloudinary_1.default.uploader.upload(file.path);
        }
        console.log(2);
        // Create The Product
        const product = new products_1.default({
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
        const updatedSeller = await sellers_1.default.findOneAndUpdate({ user: id }, { $push: { inventory: savedProduct._id } }, { new: true });
        if (!updatedSeller)
            return response.status(500).json({
                status: "Fail",
                message: "Seller inventory was not updated successfully",
            });
        // Return The Product As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", product: savedProduct });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.createProduct = createProduct;
// Update Product
const updateProduct = async (request, response, next) => {
    // Destruct The Body, File, & Params From The Request
    const { body, file, params: { id }, } = request;
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
        const product = await products_1.default.findById(id);
        console.log(2);
        // If Product Was Not Found
        if (!product)
            return response.status(404).json({
                status: "Fail",
                message: `No product was found by id = ${id}`,
            });
        console.log(3);
        // Update The Product In The Database
        const newProduct = await products_1.default.findByIdAndUpdate(id, {
            name: body.product.name,
            price: body.product.price,
            quantity: body.product.quantity,
            description: body.product.description,
        }, {
            new: true,
        });
        console.log(4);
        // Return The Response To The Client
        return response
            .status(200)
            .json({ status: "Success", product: newProduct });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.updateProduct = updateProduct;
// Delete Product
const deleteProduct = async (request, response, next) => {
    // Destruct The ID From The Request Params
    const { params: { id }, } = request;
    try {
        // If Id Was Not Sent
        if (!id)
            return response.status(404).json({
                status: "Fail",
                message: "Id was not found in the params",
            });
        // Delete The Product From The Database
        const product = await products_1.default.findByIdAndDelete(id);
        if (!product)
            return response.status(404).json({
                status: "Fail",
                message: "Product was not removed",
            });
        // Delete Product Images from Cloudinary
        if (product?.cloudinary_ids) {
            product?.cloudinary_ids?.forEach(async (image) => {
                await cloudinary_1.default.uploader.destroy(image);
            });
        }
        // Delete The Product From The Sellers
        const sellers = await sellers_1.default.updateMany({
            $pull: { inventory: id },
        });
        if (!sellers)
            return response.status(404).json({
                status: "Fail",
                message: "Product was not removed from the sellers",
            });
        // Return The Response To The Client
        return response
            .status(200)
            .json({ status: "Success", product: product });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.deleteProduct = deleteProduct;
// Add Product To Cart
const addToCart = async (request, response, next) => {
    // Destruct The ID From The Request Params
    const { params: { id }, body: { productId }, } = request;
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
        const user = await users_1.default.findById(id);
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
        const buyer = await buyers_1.default.findOne({ user: user._id });
        // If Buyer Was Not Found
        if (!buyer)
            return response.status(404).json({
                status: "Fail",
                message: `This user id doesn't belong to a buyer`,
            });
        // Increase The Product Quantity
        const updatedQuantityBuyer = await buyers_1.default.findOneAndUpdate({ _id: buyer._id, "cart._id": productId }, { $inc: { "cart.$.quantity": 1 } }, { new: true });
        // If Product Quantity Was Increased
        if (updatedQuantityBuyer) {
            // Return Response To The Client
            return response
                .status(200)
                .json({ status: "Success", product: updatedQuantityBuyer });
        }
        // Add The Product To The Cart
        const updatedProductBuyer = await buyers_1.default.findByIdAndUpdate(buyer._id, { $push: { cart: { _id: productId, quantity: 1 } } }, { new: true });
        // If Product Was Added
        if (updatedProductBuyer)
            // Return Response To The Client
            return response
                .status(200)
                .json({ status: "Success", product: updatedProductBuyer });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.addToCart = addToCart;
// Add Product To Wishlist
const addToWishlist = async (request, response, next) => {
    // Destruct The ID From The Request Params
    const { params: { id }, body: { productId }, } = request;
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
        const user = await users_1.default.findById(id);
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
        const buyer = await buyers_1.default.findOne({ user: user._id });
        // If Buyer Was Not Found
        if (!buyer)
            return response.status(404).json({
                status: "Fail",
                message: `This user id doesn't belong to a buyer`,
            });
        // Find If The Buyer has this item in the wishlist
        const isItemWished = buyer.wishlist.findIndex((item) => item._id === productId);
        // If Item Was Found In The Wishlist
        if (isItemWished === -1) {
            return response.status(400).json({
                status: "Fail",
                message: `This item is already in you wishlist`,
            });
        }
        // Add The Product To The Wishlist
        const updatedProductBuyer = await buyers_1.default.findByIdAndUpdate(buyer._id, { $push: { wishlist: { _id: productId, quantity: 1 } } }, { new: true });
        // If Product Was Added
        if (updatedProductBuyer)
            // Return Response To The Client
            return response
                .status(200)
                .json({ status: "Success", product: updatedProductBuyer });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.addToWishlist = addToWishlist;
