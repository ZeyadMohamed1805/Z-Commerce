"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const orders_1 = require("../controllers/orders");
const verify_1 = require("../middlewares/verify");
const router = express_1.default.Router();
// Routes
router.get("/", orders_1.readOrders);
router.post("/:id", verify_1.verifyUser, orders_1.createOrder);
router.post("/summary/:id", verify_1.verifyUser, orders_1.readOrdersWithSummary);
// Exports
exports.default = router;
