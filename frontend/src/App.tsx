import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import PartnerDashboard from './pages/PartnerDashboard';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="partner" element={<PartnerDashboard />} />
                        <Route path="login" element={<div className="p-10 text-center">Login Page Placeholder</div>} />
                        <Route path="cart" element={<div className="p-10 text-center">Cart Placeholder</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
