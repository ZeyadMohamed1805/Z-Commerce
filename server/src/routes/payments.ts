// Modules
import express from "express";
import { readPayments } from "../controllers/payments";
const router = express.Router();

// Routes
router.get("/", readPayments);

// Exports
export default router;
