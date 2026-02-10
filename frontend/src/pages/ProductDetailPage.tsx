import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { products } from '../data/products';
import { ArrowLeft, ShoppingBag, Droplets, Wind, Layers } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { theme } = useTheme();

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <div className="p-20 text-center">Product not found</div>;
    }

    return (
        <div className={`min-h-[80vh] flex items-center justify-center py-12`}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Image Section */}
                <div className="relative group">
                    <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 transform group-hover:scale-105 transition duration-700 ${theme === 'royal' ? 'bg-indigo-500' : 'bg-nude-400'
                        }`}></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] md:h-[600px]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    <Link to="/" className={`inline-flex items-center gap-2 text-sm font-medium transition ${theme === 'royal' ? 'text-indigo-400 hover:text-indigo-300' : 'text-nude-600 hover:text-nude-900'
                        }`}>
                        <ArrowLeft size={16} /> Back to Collection
                    </Link>

                    <div>
                        <p className="opacity-60 uppercase tracking-widest text-sm mb-2">{product.type} • {product.volume}</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
                        <p className={`text-3xl font-bold ${theme === 'royal' ? 'text-indigo-400' : 'text-nude-700'
                            }`}>{product.price}</p>
                    </div>

                    <p className="opacity-80 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    {/* Olfactory Pyramid */}
                    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${theme === 'royal' ? 'bg-white/5 border-white/10' : 'bg-white/50 border-nude-200'
                        }`}>
                        <h3 className="font-serif font-bold mb-4 flex items-center gap-2">
                            <Layers size={18} /> Olfactory Notes
                        </h3>
                        <div className="grid grid-cols-1 gap-4 text-sm">
                            <div className="flex gap-4">
                                <span className="opacity-50 w-12 uppercase text-xs tracking-wider pt-1">Top</span>
                                <span className="font-medium">{product.notes.top}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="opacity-50 w-12 uppercase text-xs tracking-wider pt-1">Heart</span>
                                <span className="font-medium">{product.notes.heart}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="opacity-50 w-12 uppercase text-xs tracking-wider pt-1">Base</span>
                                <span className="font-medium">{product.notes.base}</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl text-center ${theme === 'royal' ? 'bg-white/5' : 'bg-nude-200/50'}`}>
                            <Droplets className="mx-auto mb-2 opacity-70" size={20} />
                            <p className="text-xs opacity-60 uppercase">Volume</p>
                            <p className="font-bold">{product.volume}</p>
                        </div>
                        <div className={`p-4 rounded-xl text-center ${theme === 'royal' ? 'bg-white/5' : 'bg-nude-200/50'}`}>
                            <Wind className="mx-auto mb-2 opacity-70" size={20} />
                            <p className="text-xs opacity-60 uppercase">Stock</p>
                            <p className="font-bold">{product.stock > 0 ? 'In Stock' : 'Sold Out'}</p>
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        <button className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition transform hover:scale-[1.02] active:scale-[0.98] ${theme === 'royal'
                            ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 text-white'
                            : 'bg-nude-900 hover:bg-nude-800 text-nude-50'
                            }`}>
                            Add to Cart — {product.price}
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/register?type=reseller" className={`py-4 rounded-xl font-bold text-center border-2 transition hover:bg-opacity-10 ${theme === 'royal'
                                    ? 'border-indigo-400 text-indigo-300 hover:bg-indigo-400'
                                    : 'border-nude-600 text-nude-800 hover:bg-nude-900'
                                }`}>
                                Register as Reseller
                            </Link>
                            <button className={`py-4 rounded-xl font-bold border-2 transition hover:bg-opacity-10 ${theme === 'royal'
                                    ? 'border-indigo-400 text-indigo-300 hover:bg-indigo-400'
                                    : 'border-nude-600 text-nude-800 hover:bg-nude-900'
                                }`}
                                onClick={() => alert("Affiliate link copied to clipboard!")}
                            >
                                Get Affiliate Link
                            </button>
                        </div>
                    </div>

                    {product.ingredients && (
                        <p className="text-xs opacity-40 text-center">
                            Ingredients: {product.ingredients}
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
}
