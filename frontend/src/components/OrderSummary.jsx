import { formatPrice } from "../api";

const statusLabel = {
    pending: "Payment processing…",
    paid: "Paid ✓",
    failed: "Payment failed",
    refunded: "Refunded",
};

const OrderSummary = ({ order }) => (
    <div className="text-left max-w-xl mx-auto border border-neutral-800 rounded-2xl p-6">
        <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Order #{order.id}</p>
            <p className={order.status === "paid" ? "text-green-400" : "text-gray"}>
                {statusLabel[order.status] ?? order.status}
            </p>
        </div>
        <p className="text-gray text-sm mb-4">
            {new Date(order.createdAt).toLocaleString("en-AU")}
            {order.email && ` · ${order.email}`}
        </p>
        <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
            {order.items.map((item, i) => (
                <li key={i} className="py-3 flex justify-between">
                    <span>
                        {item.quantity} × {item.name}
                        <span className="text-gray"> · {item.colorName} · {item.size}</span>
                    </span>
                    <span>{formatPrice(item.unitPriceCents * item.quantity)}</span>
                </li>
            ))}
        </ul>
        <div className="flex justify-between mt-4 text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.totalCents)}</span>
        </div>
    </div>
);

export default OrderSummary;