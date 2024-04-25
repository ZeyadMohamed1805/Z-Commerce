// Modules
import express from "express";
import { readUsers } from "../controllers/users";
const router = express.Router();

// Routes
router.get("/", readUsers);

// Exports
export default router;
