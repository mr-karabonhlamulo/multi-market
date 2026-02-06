import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';

export default function HomePage() {
    const { theme } = useTheme();
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <div className="space-y-20 pb-12 relative">
            <Background3D theme={theme as 'royal' | 'nude'} />

            {/* Hero Section */}
            <section className="text-center py-32 space-y-8 relative z-10">
                <h1 className={`text-6xl md:text-8xl font-serif font-bold tracking-tight ${theme === 'royal' ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400' : 'text-nude-900'
                    }`}>
                    Essence of Luxury.
                </h1>
                <p className="text-xl opacity-70 max-w-xl mx-auto font-light leading-relaxed">
                    Minimal. Timeless. Yours.
                </p>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products.map(product => (
                        <div key={product.id} className="group relative">
                            {/* Card Container - Note: Button needs to be visually distinct now */}
                            <Link to={`/product/${product.id}`} className="block h-full transition duration-500">
                                <div className={`h-[500px] overflow-hidden rounded-3xl relative shadow-2xl transition duration-700 ${theme === 'royal' ? 'shadow-black/50' : 'shadow-nude-900/10'
                                    }`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className={`absolute inset-0 transition duration-500 opacity-60 group-hover:opacity-40 ${theme === 'royal' ? 'bg-gradient-to-t from-black/80 via-transparent' : 'bg-gradient-to-t from-nude-900/60 via-transparent'
                                        }`}></div>

                                    {/* Content positioned at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition duration-500">
                                        <h3 className="text-3xl font-serif text-white mb-2">{product.name}</h3>
                                        <p className="text-white/80 font-light mb-6">{product.type}</p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-white font-bold text-xl">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Floating Action Button */}
                            <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className={`absolute bottom-8 right-8 z-20 p-4 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95 flex items-center justify-center ${theme === 'royal' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white text-nude-900 hover:bg-gray-100'
                                    }`}
                                aria-label="Add to Cart"
                            >
                                <span className="font-bold text-sm px-2">ADD +</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
