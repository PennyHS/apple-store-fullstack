import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MacbookPage from "./pages/MacbookPage.jsx";
import IphonePage from "./pages/IphonePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.jsx";
import OrderLookupPage from "./pages/OrderLookupPage.jsx";

const App = () => (
    <BrowserRouter>
        <div className="fixed top-0 left-0 w-full h-7 z-[60] flex items-center justify-center bg-[#1d1d1f] text-[#a1a1a6] text-[11px] sm:text-xs px-4 text-center truncate">
            Portfolio demo by Penny Hsiao · Not affiliated with Apple
        </div>

        <div className="pt-7">
            <Routes>
                <Route path="/" element={<Navigate to="/iphone" replace />} />
                <Route path="/macbook" element={<MacbookPage />} />
                <Route path="/iphone" element={<IphonePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="/orders/lookup" element={<OrderLookupPage />} />
                <Route path="*" element={<Navigate to="/iphone" replace />} />
            </Routes>
        </div>
    </BrowserRouter>
)

export default App