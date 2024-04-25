// Modules
import express from "express";
import { readOrders } from "../controllers/orders";
const router = express.Router();

// Routes
router.get("/", readOrders);

// Exports
export default router;
