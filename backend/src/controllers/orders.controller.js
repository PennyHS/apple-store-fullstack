import * as Order from "../models/order.model.js";

export async function getOrderBySession(req, res, next) {
    try {
        const order = await Order.findBySessionId(req.params.sessionId);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export async function lookupOrder(req, res, next) {
    try {
        const orderId = Number(req.query.orderId);
        const email = String(req.query.email || "").trim();
        if (!Number.isInteger(orderId) || !email) {
            return res.status(400).json({ error: "Order number and email are required" });
        }
        const order = await Order.findByIdAndEmail(orderId, email);
        if (!order) return res.status(404).json({ error: "No order found with those details" });
        res.json(order);
    } catch (err) {
        next(err);
    }
}