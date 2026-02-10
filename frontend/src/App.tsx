import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import PartnerDashboard from './pages/PartnerDashboard';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

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
                                <Route index element={<LandingPage />} />
                                <Route path="shop" element={<ShopPage />} />
                                <Route path="login" element={<LoginPage />} />
                                <Route path="register" element={<RegisterPage />} />
                                <Route path="product/:id" element={<ProductDetailPage />} />
                                <Route path="cart" element={<CartPage />} />
                                <Route path="checkout" element={<CheckoutPage />} />
                                <Route path="about" element={<AboutPage />} />
                                <Route path="contact" element={<ContactPage />} />

                                {/* Protected Partner Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="partner" element={<PartnerDashboard />} />
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
