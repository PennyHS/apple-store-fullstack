import { useState } from "react";
import Navbar from "../iphone/components/Navbar.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { lookupOrder } from "../api";

const OrderLookupPage = () => {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setOrder(null);
        try {
            setOrder(await lookupOrder(orderId, email));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-zinc border border-neutral-700 rounded-lg px-4 py-3 text-white";

    return (
        <main className="iphone-page min-h-screen">
            <Navbar />
            <section className="screen-max-width px-5 py-16">
                <h1 className="text-4xl md:text-5xl font-semibold mb-10 text-center">Track your order</h1>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4 mb-10">
                    <input className={inputClass} placeholder="Order number, e.g. 2" inputMode="numeric"
                           value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
                    <input className={inputClass} placeholder="Email used at checkout" type="email"
                           value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {error && <p className="text-red-400">{error}</p>}
                    <button className="btn disabled:opacity-40" disabled={loading}>
                        {loading ? "Searching…" : "Find order"}
                    </button>
                </form>

                {order && <OrderSummary order={order} />}
            </section>
        </main>
    );
};

export default OrderLookupPage;