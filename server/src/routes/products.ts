// Modules
import express from "express";
import {
	createProduct,
	readProducts,
	updateProduct,
} from "../controllers/products";
import upload from "../utils/multer";
const router = express.Router();

// Routes
router.get("/", readProducts);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);

// Exports
export default router;
