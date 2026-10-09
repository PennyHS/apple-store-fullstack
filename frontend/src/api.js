const API_URL = import.meta.env.VITE_API_URL;

export async function getProduct(slug) {
    const res = await fetch(`${API_URL}/api/products/${slug}`);
    if (!res.ok) throw new Error(`Failed to load product (${res.status})`);
    return res.json();
}

export const formatPrice = (cents) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);

export async function createCheckout(items) {
    const res = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // only send ids + quantities, never prices
        body: JSON.stringify({
            items: items.map(({ variantId, quantity }) => ({ variantId, quantity })),
        }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Checkout failed");
    return data;
}

export async function getOrderBySession(sessionId) {
    const res = await fetch(`${API_URL}/api/orders/session/${encodeURIComponent(sessionId)}`);
    if (!res.ok) throw new Error("Order not found");
    return res.json();
}

export async function lookupOrder(orderId, email) {
    const params = new URLSearchParams({ orderId, email });
    const res = await fetch(`${API_URL}/api/orders/lookup?${params}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Lookup failed");
    return data;
}