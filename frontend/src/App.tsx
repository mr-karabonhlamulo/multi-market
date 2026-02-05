import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import PartnerDashboard from './pages/PartnerDashboard';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="login" element={<LoginPage />} />

                            {/* Protected Partner Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="partner" element={<PartnerDashboard />} />
                            </Route>

                            <Route path="cart" element={<div className="p-10 text-center">Cart Placeholder</div>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
