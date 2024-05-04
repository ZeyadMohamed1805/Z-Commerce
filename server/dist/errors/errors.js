"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.customError = void 0;
// Custom Error
const customError = (error, request, response, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something Went Wrong!";
    return response
        .status(errorStatus)
        .json({ status: "Fail", message: errorMessage });
};
exports.customError = customError;
// Create Error
const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
};
exports.createError = createError;
