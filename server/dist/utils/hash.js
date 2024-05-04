"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules & Variables
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Hashing The Passwords
const hashPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(password, salt);
    return hashPassword;
};
// Exports
exports.default = hashPassword;
