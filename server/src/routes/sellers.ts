// Modules
import express from "express";
import { readSellers } from "../controllers/sellers";
const router = express.Router();

// Routes
router.get("/", readSellers);

// Exports
export default router;
