import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
    { label: "iPhone", to: "/iphone" },
    { label: "Mac", to: "/macbook" },
    { label: "Track an order", to: "/orders/lookup" },
    { label: "Bag", to: "/cart" },
];

const MobileMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden flex items-center">
            <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="p-1 text-white bg-transparent border-none"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 8h16M4 16h16" />
                </svg>
            </button>

            {open && (
                <div className="fixed inset-0 top-7 z-[55] bg-black/95 px-8 pt-6">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                            className="p-1 text-white bg-transparent border-none"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col gap-6">
                        {items.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className="text-white text-3xl font-semibold"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;