import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../iphone/components/Navbar.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { useCartStore } from "../store/cartStore";
import { getOrderBySession } from "../api";

const CheckoutSuccessPage = () => {
    const clear = useCartStore((s) => s.clear);
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [order, setOrder] = useState(null);

    useEffect(() => {
        clear();
    }, [clear]);

    // The webhook may arrive a second or two after the redirect,
    // so re-check a few times while the order is still 'pending'
    useEffect(() => {
        if (!sessionId) return;
        let tries = 0;
        let timer;

        const load = async () => {
            try {
                const data = await getOrderBySession(sessionId);
                setOrder(data);
                if (data.status === "pending" && tries++ < 5) {
                    timer = setTimeout(load, 2000);
                }
            } catch {
                /* leave order as null */
            }
        };

        load();
        return () => clearTimeout(timer);
    }, [sessionId]);

    return (
        <main className="iphone-page min-h-screen">
            <Navbar />
            <section className="screen-max-width px-5 py-24 text-center">
                <h1 className="text-4xl md:text-5xl font-semibold mb-4">Thank you for your order</h1>
                <p className="text-gray text-xl mb-10">
                    {order ? `Keep your order number #${order.id} to track it later.` : "Loading your order…"}
                </p>

                {order && <OrderSummary order={order} />}

                <div className="flex justify-center gap-4 mt-10">
                    <Link to="/iphone" className="btn inline-block">Continue shopping</Link>
                    <Link to="/orders/lookup" className="btn inline-block bg-transparent border border-blue text-blue">
                        Track an order
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default CheckoutSuccessPage;