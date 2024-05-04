"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithPayment = exports.loginUser = exports.updateUser = exports.createUser = exports.readUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const buyers_1 = __importDefault(require("../models/buyers"));
const sellers_1 = __importDefault(require("../models/sellers"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const compare_1 = __importDefault(require("../utils/compare"));
const errors_1 = require("../errors/errors");
const hash_1 = __importDefault(require("../utils/hash"));
const payments_1 = __importDefault(require("../models/payments"));
// Access Environment Variables
dotenv_1.default.config();
// Read User
const readUser = async (request, response, next) => {
    // Extract The User ID From The Request Params
    const { id } = request.params;
    try {
        // Get The User From The Database
        const user = await users_1.default.findById(id);
        // If User Doesn't Exist
        if (!user)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, `No user found with id = ${id}`));
        // Send The User As A Response To The Client
        return response.status(200).json({ status: "Success", user: user });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readUser = readUser;
// Create User
const createUser = async (request, response, next) => {
    // Extract The User From The Body
    const { body } = request;
    try {
        // If User Wasn't Sent
        if (!body)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, `No user found in the body`));
        // Create A New User
        const newUser = new users_1.default({
            email: body.email,
            password: (0, hash_1.default)(body.password),
            name: body.name,
            role: body.role,
        });
        // Save The User To The Database
        const savedUser = await newUser.save();
        // Create A New Role
        !body.role
            ? await new buyers_1.default({ user: savedUser._id }).save()
            : await new sellers_1.default({
                user: savedUser._id,
            }).save();
        // Send The User As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", user: savedUser });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.createUser = createUser;
// Update User
const updateUser = async (request, response, next) => {
    // Extract The User From The Body
    const { body, params: { id }, } = request;
    try {
        // If ID Wasn't Sent
        if (!id)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, `No user id was found in the params`));
        // If User Wasn't Sent
        if (!body)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, `No user found in the body`));
        // Update The User In The Database
        const updatedUser = await users_1.default.findByIdAndUpdate(id, { $set: body }, { new: true });
        // Send The User As A Response To The Client
        return response
            .status(200)
            .json({ status: "Success", user: updatedUser });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.updateUser = updateUser;
// Login User
const loginUser = async (request, response, next) => {
    // Destruct the Email & Password from the Request Body
    const { email, password } = request.body;
    try {
        // Find The User With The Requested Username
        const user = await users_1.default.findOne({ email: email });
        // Check If User Doesn't Exist
        if (!user)
            return next((0, errors_1.createError)(404, `No user with email ${email}...`));
        // Compare Passwords
        const passwordCheck = await (0, compare_1.default)(password, user.password);
        // Check If Passwords Don't Match
        if (!passwordCheck)
            return next((0, errors_1.createError)(400, "Incorrect email or password"));
        // Create JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });
        // Send The User As A Response To The Client
        response.status(200).json({ user: user, token: token });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next((0, errors_1.createError)(500, "Login Failed..."));
    }
};
exports.loginUser = loginUser;
// Get User With Payment
const getUserWithPayment = async (request, response, next) => {
    // Destruct User ID From Params
    const { id } = request.params;
    try {
        if (!id)
            return next((0, errors_1.createError)(404, "User id was not sent in the params"));
        const user = await users_1.default.findById(id);
        if (!user)
            return next((0, errors_1.createError)(404, `No user was found with id = ${id}`));
        const payment = await payments_1.default.findOne({ user: id });
        return payment
            ? response
                .status(200)
                .json({ status: "Success", user: user, payment: payment })
            : response.status(200).json({ status: "Success", user: user });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next((0, errors_1.createError)(500, error.message));
    }
};
exports.getUserWithPayment = getUserWithPayment;
