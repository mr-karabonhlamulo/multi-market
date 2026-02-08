import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowRight, CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);

    // PayFast Configuration (Sandbox/Live)
    const merchantId = '10000100'; // Sandbox Merchant ID
    const merchantKey = '46f0cd694581a'; // Sandbox Merchant Key
    const passPhrase = ''; // Optional, set in PayFast dashboard

    // Helper to calculate total valid amount numeric
    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    const [formData, setFormData] = useState({
        name_first: '',
        name_last: '',
        email_address: '',
        cell_number: '', // Optional for PayFast, good for delivery
        address: '',
        city: '',
        postal_code: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayFastSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Construct PayFast Form Data
        const returnUrl = `${window.location.origin}/partner`; // Success URL
        const cancelUrl = `${window.location.origin}/cart`; // Cancel URL
        const notifyUrl = 'https://your-backend.com/api/payfast/notify'; // Backend Webhook (Mocked for now)

        const paymentData = {
            merchant_id: merchantId,
            merchant_key: merchantKey,
            return_url: returnUrl,
            cancel_url: cancelUrl,
            notify_url: notifyUrl,

            // Buyer Details
            name_first: formData.name_first,
            name_last: formData.name_last,
            email_address: formData.email_address,

            // Transaction Details
            m_payment_id: `ORDER_${Date.now()}`,
            amount: calculateTotal(),
            item_name: `Order of ${items.length} items from MLM Co.`,
        };

        // Create a hidden form and submit it
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://sandbox.payfast.co.za/eng/process';

        Object.entries(paymentData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        // Optional: Clear cart here if you assume success, but usually better on return_url handling
        // clearCart(); 
    };

    const inputClasses = `w-full px-4 py-3 rounded-xl border outline-none transition ${theme === 'royal'
            ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/20'
            : 'bg-white border-nude-200 focus:border-nude-400 text-nude-900 placeholder-nude-300'
        }`;

    if (items.length === 0) {
        return <div className="p-20 text-center">Your cart is empty.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Delivery Form */}
                <div className={`p-8 rounded-3xl ${theme === 'royal' ? 'bg-black/40 border border-white/10' : 'bg-white shadow-xl'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <Truck className={theme === 'royal' ? 'text-indigo-400' : 'text-nude-600'} />
                        <h2 className="text-2xl font-serif font-bold">Delivery Details</h2>
                    </div>

                    <form id="checkout-form" onSubmit={handlePayFastSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name_first"
                                placeholder="First Name"
                                value={formData.name_first}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                            <input
                                type="text"
                                name="name_last"
                                placeholder="Last Name"
                                value={formData.name_last}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email_address" // PayFast specific name
                            placeholder="Email Address"
                            value={formData.email_address}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            value={formData.address}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                            <input
                                type="text"
                                name="postal_code"
                                placeholder="Postal Code"
                                value={formData.postal_code}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className={`p-8 rounded-3xl h-fit ${theme === 'royal' ? 'bg-indigo-900/20 border border-indigo-500/30' : 'bg-nude-100 border border-nude-200'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <CreditCard className={theme === 'royal' ? 'text-indigo-400' : 'text-nude-600'} />
                        <h2 className="text-2xl font-serif font-bold">Order Summary</h2>
                    </div>

                    <div className="space-y-4 mb-8">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${theme === 'royal' ? 'bg-white/10' : 'bg-white'
                                        }`}>
                                        {item.quantity}
                                    </span>
                                    <span className="opacity-80">{item.name}</span>
                                </div>
                                <span className="font-medium">{item.price}</span>
                            </div>
                        ))}
                        <div className={`h-px my-4 ${theme === 'royal' ? 'bg-white/10' : 'bg-nude-300'}`}></div>
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total</span>
                            <span>{cartTotal}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] ${theme === 'royal'
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                                : 'bg-nude-900 hover:bg-nude-800 text-nude-50'
                            }`}
                    >
                        {loading ? 'Processing...' : 'Secure Checkout with PayFast'} <ArrowRight size={20} />
                    </button>

                    <p className="text-center text-xs opacity-50 mt-4">
                        You will be redirected to PayFast to complete your payment securely.
                    </p>
                </div>
            </div>
        </div>
    );
}
