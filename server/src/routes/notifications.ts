// Modules
import express from "express";
import { readNotifications } from "../controllers/notificaitons";
const router = express.Router();

// Routes
router.get("/", readNotifications);

// Exports
export default router;
