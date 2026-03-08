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
import DashboardLayout from './components/DashboardLayout';
import GenericPage from './pages/GenericPage';
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
                    <BrowserRouter basename={import.meta.env.VITE_BASE_URL || '/'}>
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
                                    <Route path="partner" element={<DashboardLayout />}>
                                        <Route index element={<PartnerDashboard />} />

                                        {/* Portfolio */}
                                        <Route path="portfolio/buy-items" element={<GenericPage title="Buy Items" />} />
                                        <Route path="portfolio/orders" element={<GenericPage title="View Orders" />} />
                                        <Route path="portfolio/payslips" element={<GenericPage title="View Payslips" />} />
                                        <Route path="portfolio/vouchers" element={<GenericPage title="Discount Vouchers" />} />
                                        <Route path="portfolio/travel" element={<GenericPage title="Travel Promotions" />} />
                                        <Route path="portfolio/promotions" element={<GenericPage title="Company Promotions" />} />

                                        {/* Network */}
                                        <Route path="network/gen1" element={<GenericPage title="Gen 1 Strategy" />} />
                                        <Route path="network/gen2" element={<GenericPage title="Gen 2 Strategy" />} />
                                        <Route path="network/gen-n" element={<GenericPage title="Gen Nth Strategy" />} />

                                        {/* Office */}
                                        <Route path="office/commissions" element={<GenericPage title="Team Commissions" />} />
                                        <Route path="office/rankings" element={<GenericPage title="Team Rankings" />} />
                                        <Route path="office/sales" element={<GenericPage title="Team Sales" />} />
                                        <Route path="office/recruitment" element={<GenericPage title="Team Recruitment" />} />

                                        {/* Account */}
                                        <Route path="account/profile" element={<GenericPage title="Profile Maintenance" />} />
                                        <Route path="account/banking" element={<GenericPage title="Banking Maintenance" />} />
                                        <Route path="account/terms" element={<GenericPage title="T&C's Maintenance" />} />
                                    </Route>
                                </Route>

                                {/* Public Info & Generic place holders */}
                                <Route path="faq" element={<GenericPage title="FAQ" />} />
                                <Route path="terms" element={<GenericPage title="Terms & Conditions" />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
