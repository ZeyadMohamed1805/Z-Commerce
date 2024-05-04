"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./exports/routes");
const errors_1 = require("./errors/errors");
// Access Environment Variables
dotenv_1.default.config();
// Initialize Server & Port Number
const port = process.env.PORT || 5000;
const server = (0, express_1.default)();
// Middlewares
server.use((0, cors_1.default)({
    origin: ["http://localhost:4200", "http://127.0.0.1:5500"],
}));
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: false }));
// Routes
routes_1.routes.forEach((route) => {
    server.use(`/api/v1/${route.route}`, route.module);
});
// Errors
server.use(errors_1.customError);
// Connect To Database
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO);
    }
    catch (error) {
        throw error;
    }
};
// Run The Server
server.listen(port, () => {
    connectDatabase();
    console.log("Connected to Backend...");
});
