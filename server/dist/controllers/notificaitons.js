"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotifications = void 0;
const notifications_1 = __importDefault(require("../models/notifications"));
const errors_1 = require("../errors/errors");
// Read Notifications
const readNotifications = async (request, response, next) => {
    try {
        // Get The Notifications From The Database
        const notifications = await notifications_1.default.find();
        // If Notifications Don't Exist
        if (!notifications.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No notifications found"));
        // Send The Notifications As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", notifications: notifications });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readNotifications = readNotifications;
