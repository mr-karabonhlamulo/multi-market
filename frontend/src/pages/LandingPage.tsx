import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';
import { products } from '../data/products';

export default function LandingPage() {
    const { theme } = useTheme();

    return (
        <div className="space-y-20 pb-12 relative min-h-screen flex flex-col justify-center">
            <Background3D theme={theme as 'royal' | 'nude'} />

            {/* Hero Section */}
            <section className="text-center space-y-8 relative z-10">
                <h1 className={`text-6xl md:text-9xl font-serif font-bold tracking-tight ${theme === 'royal' ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400' : 'text-nude-900'
                    }`}>
                    Essence of Luxury.
                </h1>
                <p className="text-2xl opacity-70 max-w-2xl mx-auto font-light leading-relaxed">
                    Minimal. Timeless. Yours.
                </p>

                <div className="pt-8">
                    <Link to="/shop" className={`px-12 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 inline-block shadow-2xl ${theme === 'royal' ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20' : 'bg-nude-900 text-nude-50 hover:bg-nude-800'
                        }`}>
                        Enter Boutique
                    </Link>
                </div>
            </section>
        </div>
    );
}
