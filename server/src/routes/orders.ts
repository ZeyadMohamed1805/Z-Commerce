// Modules
import express from "express";
import { readOrders, createOrder } from "../controllers/orders";
import { verifyUser } from "../middlewares/verify";
const router = express.Router();

// Routes
router.get("/", readOrders);
router.post("/:id", verifyUser, createOrder);

// Exports
export default router;
