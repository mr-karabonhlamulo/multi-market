import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { products as staticProducts, Product } from '../data/products';
import { Link } from 'react-router-dom';
import StaticBanner from '../components/StaticBanner';

export default function ShopPage() {
    const { theme } = useTheme();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();

                if (response.ok && Array.isArray(data)) {
                    // Map backend data to frontend format
                    const mappedProducts = data.map((p: any) => ({
                        id: Number(p.id),
                        name: p.name,
                        price: `R${p.retail_price.toLocaleString()}`,
                        description: p.description,
                        image: p.image_url.startsWith('https') ? p.image_url : p.image_url, // Assuming path matches or use local media
                        type: p.category,
                        volume: '50ml', // Fallback or from DB if available
                        stock: 10, // Mock stock
                        notes: { top: '', heart: '', base: '' }
                    }));
                    setProducts(mappedProducts);
                } else {
                    setProducts(staticProducts);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setProducts(staticProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="p-20 text-center">Loading Collection...</div>;

    return (
        <div className="pb-24 animate-fade-in -mx-4 sm:-mx-6 lg:-mx-8 -mt-20 pt-0">
            <StaticBanner title="Exclusive Collection" subtitle="Discover premium fragrances tailored for every moment." />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {products.map(product => (
                        <div key={product.id} className="group relative">
                            {/* Card Container */}
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                className={`absolute bottom-8 right-8 z-20 p-4 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95 flex items-center justify-center ${theme === 'royal' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white text-nude-900 hover:bg-gray-100'
                                    }`}
                                aria-label="Add to Cart"
                            >
                                <span className="font-bold text-sm px-2">ADD +</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
