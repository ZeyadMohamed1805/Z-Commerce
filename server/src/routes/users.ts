// Modules
import express from "express";
import {
	createUser,
	loginUser,
	readUser,
	updateUser,
} from "../controllers/users";
import { verifyToken, verifyUser } from "../middlewares/verify";
const router = express.Router();

// Routes
router.get("/verify_token", verifyToken, (request, response, next) => {
	response
		.status(200)
		.json({ status: "Success", message: "User Authenticated" });
});
router.get("/verify_user/:id", verifyUser, (request, response, next) => {
	response.status(200).json({ status: "Success", message: "User Logged In" });
});
router.get("/:id", verifyUser, readUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.put("/:id", verifyUser, updateUser);

// Exports
export default router;
