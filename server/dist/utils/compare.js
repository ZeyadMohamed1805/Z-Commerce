"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules & Variables
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Compare The Passwords
const comparePassword = (bodyPassword, userPassword) => {
    const isMatching = bcryptjs_1.default.compare(bodyPassword, userPassword);
    return isMatching;
};
// Exports
exports.default = comparePassword;
