"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuration
const Multer = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path_1.default.extname(file.originalname);
        if (ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".svg") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});
// Exports
exports.default = Multer;
