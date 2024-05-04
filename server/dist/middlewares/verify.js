"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors/errors");
// Verify Token
const verifyToken = (request, response, next) => {
    // Destruct The Token From The Request Cookies
    const { token } = request.body;
    // Check If Token Doesn't Exist
    if (!token)
        return next((0, errors_1.createError)(401, "You Are Not Authenticated..."));
    // Verify Token
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, user) => {
        // Check Token Validity
        if (error)
            return next((0, errors_1.createError)(401, "Invalid Token..."));
        // Add The User To The Request
        request.user = user;
        // Pass To The Next Middleware
        next();
    });
};
exports.verifyToken = verifyToken;
// Verify User
const verifyUser = (request, response, next) => {
    // Call the Verify Token
    (0, exports.verifyToken)(request, response, () => {
        // Destruct The User & Params From The Request
        const { user, params } = request;
        // Check If IDs Match Or If The User Is An Admin
        if (user.id === params.id)
            return next();
        else
            return next((0, errors_1.createError)(403, "Invalid Token..."));
    });
};
exports.verifyUser = verifyUser;
