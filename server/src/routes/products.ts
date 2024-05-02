// Modules
import express from "express";
import {
	addToCart,
	addToWishlist,
	createProduct,
	deleteProduct,
	readInventory,
	readMostLovedProducts,
	readNewestProducts,
	readProducts,
	updateProduct,
} from "../controllers/products";
import upload from "../utils/multer";
import { verifyUser } from "../middlewares/verify";
const router = express.Router();

// Routes
router.get("/", readProducts);
router.post("/inventory/:id", verifyUser, readInventory);
router.get("/newest", readNewestProducts);
router.get("/most-loved", readMostLovedProducts);
router.post("/:id", upload.single("image"), createProduct);
router.post("/add-cart/:id", verifyUser, addToCart);
router.post("/add-wishlist/:id", verifyUser, addToWishlist);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Exports
export default router;
