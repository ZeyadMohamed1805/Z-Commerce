// Modules
import express from "express";
import { createUser, readUser, updateUser } from "../controllers/users";
const router = express.Router();

// Routes
router.get("/:id", readUser);
router.post("/", createUser);
router.put("/:id", updateUser);

// Exports
export default router;
