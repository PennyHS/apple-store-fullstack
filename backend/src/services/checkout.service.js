import { stripe } from "./stripe.js";
import * as Order from "../models/order.model.js";

export class CheckoutError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

export async function createCheckoutSession(cartItems) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new CheckoutError("Cart is empty");
    }

    // Only trust variantId + quantity from the browser
    const clean = cartItems.map((i) => ({
        variantId: Number(i.variantId),
        quantity: Number(i.quantity),
    }));
    if (clean.some((i) => !Number.isInteger(i.variantId) || !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 10)) {
        throw new CheckoutError("Invalid cart items");
    }

    // Real prices and stock come from the database
    const variants = await Order.findVariantsByIds(clean.map((i) => i.variantId));
    const byId = new Map(variants.map((v) => [v.id, v]));

    const items = clean.map((i) => {
        const v = byId.get(i.variantId);
        if (!v) throw new CheckoutError(`Product ${i.variantId} not found`);
        if (v.stock < i.quantity) {
            throw new CheckoutError(`${v.name} ${v.color_name} ${v.size_label} is out of stock`);
        }
        return {
            ...i,
            unitPriceCents: v.price_cents,
            label: `${v.name} – ${v.color_name}, ${v.size_label}`,
        };
    });

    const totalCents = items.reduce((t, i) => t + i.unitPriceCents * i.quantity, 0);
    const orderId = await Order.createPendingOrder({ totalCents, items });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: items.map((i) => ({
            quantity: i.quantity,
            price_data: {
                currency: "aud",
                unit_amount: i.unitPriceCents,
                product_data: { name: i.label },
            },
        })),
        metadata: { orderId: String(orderId) },
        success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    await Order.setCheckoutSession(orderId, session.id);
    return { url: session.url, orderId };
}

export async function handleStripeEvent(event) {
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        if (session.payment_status !== "paid") return;

        await Order.markPaid({
            orderId: Number(session.metadata.orderId),
            email: session.customer_details?.email ?? null,
            paymentIntentId: session.payment_intent,
        });
    }
}