import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
    const { theme } = useTheme();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
                <div className={`p-6 rounded-full ${theme === 'royal' ? 'bg-white/5' : 'bg-nude-200/50'}`}>
                    <ShoppingBag size={48} className="opacity-50" />
                </div>
                <h2 className="text-2xl font-serif font-bold">Your cart is empty</h2>
                <p className="opacity-60 max-w-sm">
                    Looks like you haven't added any luxury scents to your collection yet.
                </p>
                <Link to="/" className={`px-8 py-3 rounded-xl font-bold transition ${theme === 'royal' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-nude-900 hover:bg-nude-800 text-nude-50'
                    }`}>
                    Star Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="py-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif font-bold mb-8">Your Cart ({itemCount} items)</h1>

            <div className="space-y-8">
                {/* Cart Items */}
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className={`glass-panel p-4 rounded-2xl flex gap-4 items-center ${theme === 'royal' ? 'hover:bg-white/5' : 'hover:bg-nude-100'
                            } transition`}>
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                                <p className="opacity-60 text-sm">{item.volume} • {item.type}</p>
                                <p className={`font-bold mt-1 ${theme === 'royal' ? 'text-indigo-400' : 'text-nude-600'}`}>
                                    {item.price}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded-lg hover:bg-gray-500/20"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded-lg hover:bg-gray-500/20"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition ml-2"
                                aria-label="Remove item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className={`p-8 rounded-2xl ${theme === 'royal' ? 'bg-white/5' : 'bg-white shadow-xl'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <span className="opacity-70">Total</span>
                        <span className="text-3xl font-bold font-serif">
                            R {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    <button className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-[1.02] ${theme === 'royal'
                            ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 text-white'
                            : 'bg-nude-900 hover:bg-nude-800 text-nude-50'
                        }`}>
                        Proceed to Checkout <ArrowRight size={20} />
                    </button>
                    <p className="text-center text-xs opacity-50 mt-4">
                        Secure checkout powered by PayFast (Coming Soon)
                    </p>
                </div>
            </div>
        </div>
    );
}
