"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const payments_1 = require("../controllers/payments");
const verify_1 = require("../middlewares/verify");
const router = express_1.default.Router();
// Routes
router.post("/:id", verify_1.verifyUser, payments_1.readPayment);
// Exports
exports.default = router;
