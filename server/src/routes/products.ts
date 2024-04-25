// Modules
import express from "express";
import { readProducts } from "../controllers/products";
const router = express.Router();

// Routes
router.get("/", readProducts);

// Exports
export default router;
