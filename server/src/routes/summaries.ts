// Modules
import express from "express";
import { readSummaries } from "../controllers/summaries";
const router = express.Router();

// Routes
router.get("/", readSummaries);

// Exports
export default router;
