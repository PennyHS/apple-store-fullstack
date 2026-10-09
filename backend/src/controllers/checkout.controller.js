import { stripe } from "../services/stripe.js";
import { createCheckoutSession, handleStripeEvent } from "../services/checkout.service.js";

export async function createCheckout(req, res, next) {
    try {
        const result = await createCheckoutSession(req.body.items);
        res.status(201).json(result);
    } catch (err) {
        if (err.status === 400) return res.status(400).json({ error: err.message });
        next(err);
    }
}

export async function stripeWebhook(req, res) {
    let event;
    try {
        // Proves the request really came from Stripe
        event = stripe.webhooks.constructEvent(
            req.body,
            req.headers["stripe-signature"],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature check failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        await handleStripeEvent(event);
        res.json({ received: true });
    } catch (err) {
        console.error("Webhook handling failed:", err);
        res.status(500).end(); // Stripe will retry
    }
}