// Modules
import express from "express";
import {
	readOrders,
	readOrdersWithSummary,
	createOrder,
} from "../controllers/orders";
import { verifyUser } from "../middlewares/verify";
const router = express.Router();

// Routes
router.get("/", readOrders);
router.post("/:id", verifyUser, createOrder);
router.post("/summary/:id", verifyUser, readOrdersWithSummary);

// Exports
export default router;
