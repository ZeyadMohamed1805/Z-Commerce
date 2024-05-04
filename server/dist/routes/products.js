"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const multer_1 = __importDefault(require("../utils/multer"));
const verify_1 = require("../middlewares/verify");
const router = express_1.default.Router();
// Routes
router.get("/", products_1.readProducts);
router.post("/inventory/:id", verify_1.verifyUser, products_1.readInventory);
router.get("/newest", products_1.readNewestProducts);
router.get("/most-loved", products_1.readMostLovedProducts);
router.post("/:id", multer_1.default.single("image"), products_1.createProduct);
router.post("/add-cart/:id", verify_1.verifyUser, products_1.addToCart);
router.post("/add-wishlist/:id", verify_1.verifyUser, products_1.addToWishlist);
router.put("/:id", products_1.updateProduct);
router.delete("/:id", products_1.deleteProduct);
// Exports
exports.default = router;
