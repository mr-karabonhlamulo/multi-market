import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import PartnerDashboard from './pages/PartnerDashboard';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { CartProvider } from './contexts/CartContext';
import CartPage from './pages/CartPage';

// Protected Route Wrapper
const ProtectedRoute = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<HomePage />} />
                                <Route path="login" element={<LoginPage />} />
                                <Route path="product/:id" element={<ProductDetailPage />} />
                                <Route path="cart" element={<CartPage />} />

                                {/* Protected Partner Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="partner" element={<PartnerDashboard />} />
                                </Route>

                                <Route path="cart" element={<div className="p-10 text-center">Cart Placeholder</div>} />
                            </Route>
                        </Routes>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
        </ThemeProvider >
    );
}

export default App;
