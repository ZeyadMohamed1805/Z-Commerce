"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const categories_1 = require("../controllers/categories");
const router = express_1.default.Router();
// Routes
router.get("/", categories_1.readCategories);
// Exports
exports.default = router;
