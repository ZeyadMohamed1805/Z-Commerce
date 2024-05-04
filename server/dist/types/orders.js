"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOrderState = void 0;
var EOrderState;
(function (EOrderState) {
    EOrderState[EOrderState["In Progress"] = 0] = "In Progress";
    EOrderState[EOrderState["On The Way"] = 1] = "On The Way";
    EOrderState[EOrderState["Delivered"] = 2] = "Delivered";
    EOrderState[EOrderState["Delayed"] = 3] = "Delayed";
    EOrderState[EOrderState["Cancelled"] = 4] = "Cancelled";
})(EOrderState || (exports.EOrderState = EOrderState = {}));
