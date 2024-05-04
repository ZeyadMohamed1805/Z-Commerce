"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const verify_1 = require("../middlewares/verify");
const router = express_1.default.Router();
// Routes
router.get("/verify_token", verify_1.verifyToken, (request, response, next) => {
    response
        .status(200)
        .json({ status: "Success", message: "User Authenticated" });
});
router.get("/verify_user/:id", verify_1.verifyUser, (request, response, next) => {
    response.status(200).json({ status: "Success", message: "User Logged In" });
});
router.get("/:id", verify_1.verifyUser, users_1.readUser);
router.post("/", users_1.createUser);
router.post("/login", users_1.loginUser);
router.post("/payment/:id", verify_1.verifyUser, users_1.getUserWithPayment);
router.put("/:id", verify_1.verifyUser, users_1.updateUser);
// Exports
exports.default = router;
