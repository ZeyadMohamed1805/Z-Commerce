// Modules
import express from "express";
import { readBuyers } from "../controllers/buyers";
const router = express.Router();

// Routes
router.get("/", readBuyers);

// Exports
export default router;
