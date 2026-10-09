import { create } from "zustand";
import { persist } from "zustand/middleware";

// Each item: { variantId, sku, name, colorName, size, priceCents, quantity }
export const useCartStore = create(
    persist(
        (set) => ({
            items: [],

            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find((i) => i.variantId === item.variantId);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.variantId === item.variantId
                                    ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                }),

            updateQuantity: (variantId, quantity) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.variantId === variantId ? { ...i, quantity } : i
                    ),
                })),

            removeItem: (variantId) =>
                set((state) => ({ items: state.items.filter((i) => i.variantId !== variantId) })),

            clear: () => set({ items: [] }),
        }),
        { name: "apple-store-cart" } // localStorage key
    )
);

export const selectCount = (s) => s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s) => s.items.reduce((t, i) => t + i.priceCents * i.quantity, 0);