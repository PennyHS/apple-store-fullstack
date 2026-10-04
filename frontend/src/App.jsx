import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MacbookPage from "./pages/MacbookPage.jsx";
import IphonePage from "./pages/IphonePage.jsx";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/macbook" replace />} />
            <Route path="/macbook" element={<MacbookPage />} />
            <Route path="/iphone" element={<IphonePage />} />
            <Route path="*" element={<Navigate to="/macbook" replace />} />
        </Routes>
    </BrowserRouter>
)

export default App
