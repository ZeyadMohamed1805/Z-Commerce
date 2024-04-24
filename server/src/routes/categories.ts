// Modules
import express from "express";
import { readCategories } from "../controllers/categories";
const router = express.Router();

// Routes
router.get("/", readCategories);

// Exports
export default router;
