import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { Link, Outlet } from 'react-router-dom';
import { Sun, Moon, ShoppingBag, Menu, X, Leaf, ChevronDown } from 'lucide-react';

export default function MainLayout() {
    const { theme, toggleTheme } = useTheme();
    const { itemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme === 'royal' ? 'bg-royal-900 text-slate-100' : 'bg-nude-100 text-nude-900'
            }`}>
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${theme === 'royal' ? 'bg-royal-900/80 border-b border-white/5' : 'bg-nude-100/80 border-b border-nude-900/5'
                } backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-2xl font-serif font-bold tracking-tight z-50 relative flex items-center group">
                            <Leaf className={`mr-1 transition-transform group-hover:scale-110 ${theme === 'royal' ? 'text-royal-accent' : 'text-nude-400'}`} size={24} />
                            GREEN<span className={theme === 'royal' ? 'text-royal-accent' : 'text-nude-400'}>Leaf</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link to="/" className="hover:opacity-75 transition font-medium">Home</Link>

                            <div className="relative group">
                                <button className="flex items-center gap-1 hover:opacity-75 transition font-medium py-2">
                                    Info <ChevronDown size={16} />
                                </button>
                                <div className={`absolute top-full left-0 w-48 mt-2 py-2 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${theme === 'royal' ? 'bg-royal-800' : 'bg-white'}`}>
                                    <Link to="/about" className="block px-4 py-2 text-sm hover:opacity-75 transition">About Us</Link>
                                    <Link to="/faq" className="block px-4 py-2 text-sm hover:opacity-75 transition">FAQ</Link>
                                    <Link to="/terms" className="block px-4 py-2 text-sm hover:opacity-75 transition">T&amp;C's</Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="flex items-center gap-1 hover:opacity-75 transition font-medium py-2">
                                    Shop <ChevronDown size={16} />
                                </button>
                                <div className={`absolute top-full left-0 w-48 mt-2 py-2 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${theme === 'royal' ? 'bg-royal-800' : 'bg-white'}`}>
                                    <Link to="/shop" className="block px-4 py-2 text-sm hover:opacity-75 transition">All Products</Link>
                                    <Link to="/shop?category=fragrances" className="block px-4 py-2 text-sm hover:opacity-75 transition">Categories</Link>
                                </div>
                            </div>

                            <Link to="/contact" className="hover:opacity-75 transition font-medium">Contact</Link>



                            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition">
                                {theme === 'royal' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <Link to="/cart" className="relative p-2">
                                <ShoppingBag size={20} />
                                {itemCount > 0 && <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{itemCount}</span>}
                            </Link>

                            <Link to="/login" className={`px-4 py-2 rounded-lg font-medium transition ${theme === 'royal'
                                ? 'bg-royal-accent hover:bg-royal-accent/90 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                                : 'bg-nude-900 text-nude-50 hover:bg-nude-900/90 shadow-lg'
                                }`}>
                                Login
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4 z-50 relative">
                            <Link to="/cart" className="relative p-2">
                                <ShoppingBag size={20} />
                                {itemCount > 0 && <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{itemCount}</span>}
                            </Link>
                            <button onClick={toggleMenu} className="p-2">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className={`fixed inset-0 z-40 flex flex-col items-center justify-start pt-32 space-y-8 text-2xl font-serif backdrop-blur-xl transition-all duration-300 ${theme === 'royal' ? 'bg-royal-900/90 text-white' : 'bg-nude-100/90 text-nude-900'
                        }`}>
                        <Link to="/" onClick={toggleMenu} className="hover:scale-105 transition transform">Home</Link>

                        {/* Info Section */}
                        <div className="flex flex-col items-center gap-4 text-center mt-6">
                            <span className="text-xs opacity-50 uppercase tracking-widest font-sans font-bold">Info</span>
                            <Link to="/about" onClick={toggleMenu} className="hover:text-royal-accent transition transform text-xl">About Us</Link>
                            <Link to="/faq" onClick={toggleMenu} className="hover:text-royal-accent transition transform text-xl">FAQ</Link>
                            <Link to="/terms" onClick={toggleMenu} className="hover:text-royal-accent transition transform text-xl">T&amp;C's</Link>
                        </div>

                        {/* Shop Section */}
                        <div className="flex flex-col items-center gap-4 text-center mt-6">
                            <span className="text-xs opacity-50 uppercase tracking-widest font-sans font-bold">Shop</span>
                            <Link to="/shop" onClick={toggleMenu} className="hover:text-royal-accent transition transform text-xl">All Products</Link>
                            <Link to="/shop?category=fragrances" onClick={toggleMenu} className="hover:text-royal-accent transition transform text-xl">Categories</Link>
                        </div>

                        <Link to="/contact" onClick={toggleMenu} className="hover:scale-105 transition transform mt-6">Contact</Link>


                        <div className="flex items-center gap-6 mt-8">
                            <button onClick={toggleTheme} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition">
                                {theme === 'royal' ? <Sun size={24} /> : <Moon size={24} />}
                            </button>
                            <Link to="/login" onClick={toggleMenu} className={`px-8 py-3 rounded-full font-bold text-lg ${theme === 'royal' ? 'bg-royal-accent' : 'bg-nude-900 text-white'
                                }`}>
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className={`py-8 text-center text-sm ${theme === 'royal' ? 'text-slate-500' : 'text-nude-400'}`}>
                <p>Designed & Created by @MrKaraboNhlamulo, All rights reserved</p>
            </footer>
        </div>
    );
}
