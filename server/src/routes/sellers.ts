// Modules
import express from "express";
import {
	createSeller,
	readSellers,
	updateSeller,
} from "../controllers/sellers";
import upload from "../utils/multer";
const router = express.Router();

// Routes
router.get("/", readSellers);
router.post("/", upload.single("image"), createSeller);
router.put("/:id", upload.single("image"), updateSeller);

// Exports
export default router;
