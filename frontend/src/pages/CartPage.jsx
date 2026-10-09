import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../iphone/components/Navbar.jsx";
import { useCartStore, selectSubtotal } from "../store/cartStore";
import { formatPrice, createCheckout } from "../api";

const CartPage = () => {
    const items = useCartStore((s) => s.items);
    const subtotal = useCartStore(selectSubtotal);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeItem = useCartStore((s) => s.removeItem);

    const [checkingOut, setCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    const handleCheckout = async () => {
        setCheckingOut(true);
        setCheckoutError(null);
        try {
            const { url } = await createCheckout(items);
            window.location.href = url; // go to Stripe's payment page
        } catch (err) {
            setCheckoutError(err.message);
            setCheckingOut(false);
        }
    };

    return (
        <main className="iphone-page min-h-screen">
            <Navbar />

            <section className="screen-max-width px-5 py-16">
                <h1 className="text-4xl md:text-5xl font-semibold mb-10">Your bag</h1>

                {items.length === 0 ? (
                    <div>
                        <p className="text-gray text-xl mb-4">Your bag is empty.</p>
                        <Link to="/iphone" className="btn inline-block">Continue shopping</Link>
                    </div>
                ) : (
                    <>
                        <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
                            {items.map((item) => (
                                <li key={item.variantId} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xl font-semibold">{item.name}</p>
                                        <p className="text-gray">{item.colorName} · {item.size}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.variantId, Number(e.target.value))}
                                            className="bg-zinc border border-neutral-700 rounded-lg px-3 py-2"
                                        >
                                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>

                                        <p className="w-28 text-right text-lg">
                                            {formatPrice(item.priceCents * item.quantity)}
                                        </p>

                                        <button onClick={() => removeItem(item.variantId)} className="text-blue hover:underline">
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Demo notice: no real payments */}
                        <p className="mt-8 text-center text-sm text-yellow-400 border border-yellow-400/40 rounded-lg px-4 py-2">
                            Demo store: payments use Stripe test mode. Use card 4242 4242 4242 4242. No real charges.
                        </p>

                        <div className="flex flex-col items-end mt-8 gap-1">
                            <p className="text-gray">Subtotal</p>
                            <p className="text-3xl font-semibold">{formatPrice(subtotal)}</p>
                            <p className="text-gray text-sm">Final price is confirmed at checkout.</p>
                            {checkoutError && <p className="text-red-400">{checkoutError}</p>}
                            <button className="btn disabled:opacity-40" disabled={checkingOut} onClick={handleCheckout}>
                                {checkingOut ? "Redirecting…" : "Check out"}
                            </button>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
};

export default CartPage;