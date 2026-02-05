import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const products = [
    {
        id: 1,
        name: 'Midnight Rose',
        price: 'R1,200',
        description: 'A deep, mysterious floral scent capturing the essence of the night.',
        image: 'https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 2,
        name: 'Golden Amber',
        price: 'R1,450',
        description: 'Warm, resinous notes mixed with sweet vanilla and musk.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600'
    }
];

export default function HomePage() {
    const { theme } = useTheme();

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="text-center py-20 space-y-6">
                <h1 className={`text-5xl md:text-7xl font-serif font-bold ${theme === 'royal' ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500' : 'text-nude-900'
                    }`}>
                    Essence of Luxury.
                </h1>
                <p className="text-xl opacity-80 max-w-2xl mx-auto">
                    Discover the scent that defines you. Join our exclusive partner network and turn your passion into profit.
                </p>
                <div className="flex justify-center gap-4">
                    <button className={`px-8 py-3 rounded-full font-bold transition transform hover:scale-105 ${theme === 'royal' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-nude-900 text-nude-50 shadow-lg'
                        }`}>
                        Shop Collection
                    </button>
                    <button className={`px-8 py-3 rounded-full font-bold border transition ${theme === 'royal' ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-900/20' : 'border-nude-900 text-nude-900 hover:bg-nude-200'
                        }`}>
                        Become a Partner
                    </button>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <h2 className="text-3xl font-serif font-bold mb-8">Featured Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="glass-panel rounded-2xl overflow-hidden group hover:shadow-2xl transition duration-500">
                            <div className="h-80 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-serif font-medium">{product.name}</h3>
                                    <span className={`font-bold text-lg ${theme === 'royal' ? 'text-indigo-400' : 'text-nude-600'}`}>
                                        {product.price}
                                    </span>
                                </div>
                                <p className="opacity-70 text-sm line-clamp-2">{product.description}</p>
                                <button className={`w-full py-3 mt-4 rounded-xl font-medium transition ${theme === 'royal' ? 'bg-white/10 hover:bg-white/20' : 'bg-nude-900/5 hover:bg-nude-900/10'
                                    }`}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
