"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const sellers_1 = require("../controllers/sellers");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
// Routes
router.get("/", sellers_1.readSellers);
router.post("/", multer_1.default.single("image"), sellers_1.createSeller);
router.put("/:id", multer_1.default.single("image"), sellers_1.updateSeller);
// Exports
exports.default = router;
