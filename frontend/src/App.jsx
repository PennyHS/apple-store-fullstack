import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MacbookPage from "./pages/MacbookPage.jsx";
import IphonePage from "./pages/IphonePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.jsx";
import OrderLookupPage from "./pages/OrderLookupPage.jsx";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/iphone" replace />} />
            <Route path="/macbook" element={<MacbookPage />} />
            <Route path="/iphone" element={<IphonePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="/orders/lookup" element={<OrderLookupPage />} />
            <Route path="*" element={<Navigate to="/iphone" replace />} />
        </Routes>
    </BrowserRouter>
)

export default App
