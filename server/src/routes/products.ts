// Modules
import express from "express";
import {
	addToCart,
	addToWishlist,
	createProduct,
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
router.get("/newest", readNewestProducts);
router.get("/most-loved", readMostLovedProducts);
router.post("/", upload.single("image"), createProduct);
router.post("/add-cart/:id", verifyUser, addToCart);
router.post("/add-wishlist/:id", verifyUser, addToWishlist);
router.put("/:id", upload.single("image"), updateProduct);

// Exports
export default router;
