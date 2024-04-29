// Modules
import express from "express";
import { readPayment } from "../controllers/payments";
import { verifyUser } from "../middlewares/verify";
const router = express.Router();

// Routes
router.post("/:id", verifyUser, readPayment);

// Exports
export default router;
