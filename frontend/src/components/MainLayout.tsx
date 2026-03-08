import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { Link, Outlet } from 'react-router-dom';
import { Sun, Moon, ShoppingBag, Menu, X, Leaf } from 'lucide-react';

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
                            GRN<span className={theme === 'royal' ? 'text-royal-accent' : 'text-nude-400'}>!</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link to="/" className="hover:opacity-75 transition font-medium">Home</Link>
                            <Link to="/about" className="hover:opacity-75 transition font-medium">About</Link>
                            <Link to="/shop" className="hover:opacity-75 transition font-medium">Shop</Link>
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
                        <Link to="/about" onClick={toggleMenu} className="hover:scale-105 transition transform">About</Link>
                        <Link to="/shop" onClick={toggleMenu} className="hover:scale-105 transition transform">Shop</Link>
                        <Link to="/contact" onClick={toggleMenu} className="hover:scale-105 transition transform">Contact</Link>


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
