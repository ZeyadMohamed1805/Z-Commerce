"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const buyers_1 = __importDefault(require("../routes/buyers"));
const categories_1 = __importDefault(require("../routes/categories"));
const notifications_1 = __importDefault(require("../routes/notifications"));
const orders_1 = __importDefault(require("../routes/orders"));
const payments_1 = __importDefault(require("../routes/payments"));
const products_1 = __importDefault(require("../routes/products"));
const sellers_1 = __importDefault(require("../routes/sellers"));
const summaries_1 = __importDefault(require("../routes/summaries"));
const users_1 = __importDefault(require("../routes/users"));
exports.routes = [
    { route: "buyers", module: buyers_1.default },
    { route: "categories", module: categories_1.default },
    { route: "notifications", module: notifications_1.default },
    { route: "orders", module: orders_1.default },
    { route: "payments", module: payments_1.default },
    { route: "products", module: products_1.default },
    { route: "sellers", module: sellers_1.default },
    { route: "summaries", module: summaries_1.default },
    { route: "users", module: users_1.default },
];
