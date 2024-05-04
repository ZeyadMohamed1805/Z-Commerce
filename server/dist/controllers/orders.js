"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOrdersWithSummary = exports.createOrder = exports.readOrders = void 0;
const errors_1 = require("../errors/errors");
const payments_1 = __importDefault(require("../models/payments"));
const orders_1 = __importDefault(require("../models/orders"));
const summaries_1 = __importDefault(require("../models/summaries"));
const users_1 = __importDefault(require("../models/users"));
const sellers_1 = __importDefault(require("../models/sellers"));
// Read Orders
const readOrders = async (request, response, next) => {
    try {
        // Get The Orders From The Database
        const orders = await orders_1.default.find();
        // If Orders Don't Exist
        if (!orders.length)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "No orders found"));
        // Send The Orders As A Response To The Client
        return response.status(200).json({ status: "Success", orders: orders });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readOrders = readOrders;
// Create Order
const createOrder = async (request, response, next) => {
    // Destruct ID & Body From The Request
    const { params: { id }, body, } = request;
    console.log(1);
    try {
        if (!id)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "User id was not sent in the params"));
        if (!body || !body.order || !body.summary)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "Body was missing crucial information"));
        if (body.payment) {
            const userPayment = await payments_1.default.findOne({ user: id });
            console.log(2);
            if (!userPayment) {
                const savedPayment = await new payments_1.default(body.payment).save();
                console.log(3);
                if (!savedPayment)
                    // Return The Error To The Client
                    return next((0, errors_1.createError)(500, "Payment details was not saved successfully"));
                const updatedUser = await users_1.default.findByIdAndUpdate(id, { paymentDetails: [savedPayment._id] }, { new: true });
                console.log(4);
                if (!updatedUser)
                    // Return The Error To The Client
                    return next((0, errors_1.createError)(500, "Payment details was not linked to the user successfully"));
                console.log("Payment saved");
            }
        }
        const order = await new orders_1.default(body.order).save();
        console.log(5);
        if (!order)
            // Return The Error To The Client
            return next((0, errors_1.createError)(500, "Order was not created successfully"));
        const updatedUser = await users_1.default.findByIdAndUpdate(id, { $push: { orders: order._id } }, { new: true });
        console.log(6);
        if (!updatedUser)
            // Return The Error To The Client
            return next((0, errors_1.createError)(500, "Order was not linked to the user successfully"));
        const sellers = await sellers_1.default.find({ _id: { $in: order.sellers } });
        console.log(7);
        sellers.forEach(async (seller) => {
            const updatedSellerUser = await users_1.default.findByIdAndUpdate(seller.user, { $push: { orders: order._id } }, { new: true });
            if (!updatedSellerUser)
                // Return The Error To The Client
                return next((0, errors_1.createError)(500, "Seller order was not added successfully"));
        });
        console.log(8);
        const summary = await new summaries_1.default({
            ...body.summary,
            order: order._id,
        }).save();
        console.log(9);
        if (!summary)
            // Return The Error To The Client
            return next((0, errors_1.createError)(500, "Summary was not created successfully"));
        const updatedOrder = await orders_1.default.findByIdAndUpdate(order._id, { summary: summary._id }, { new: true });
        console.log(10);
        if (!updatedOrder)
            // Return The Error To The Client
            return next((0, errors_1.createError)(500, "Order doesn't have the summary"));
        const newUser = await users_1.default.findById(id);
        console.log(11);
        return response.status(200).json({ status: "Success", user: newUser });
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.createOrder = createOrder;
// Read Orders With Summary
const readOrdersWithSummary = async (request, response, next) => {
    // Destruct ID & Body From The Request
    const { id } = request.params;
    try {
        if (!id)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "User id was not send in the params"));
        const user = await users_1.default.findById(id);
        if (!user)
            // Return The Error To The Client
            return next((0, errors_1.createError)(404, "User was not found in the database"));
        const orders = await orders_1.default.find({ _id: { $in: user?.orders } });
        if (orders.length) {
            const summaries = await summaries_1.default.find({
                _id: { $in: orders.map((order) => order.summary) },
            });
            return response.status(200).json({
                status: "Success",
                orders: orders,
                summaries: summaries,
            });
        }
        else {
            return response
                .status(200)
                .json({ status: "Success", orders: [], summaries: [] });
        }
    }
    catch (error) {
        // Send The Error As A Response To The Client
        return next(error);
    }
};
exports.readOrdersWithSummary = readOrdersWithSummary;
