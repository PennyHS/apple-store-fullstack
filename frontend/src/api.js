const API_URL = import.meta.env.VITE_API_URL;

export async function getProduct(slug) {
    const res = await fetch(`${API_URL}/api/products/${slug}`);
    if (!res.ok) throw new Error(`Failed to load product (${res.status})`);
    return res.json();
}

export const formatPrice = (cents) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);