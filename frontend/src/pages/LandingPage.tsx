import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';
import { products } from '../data/products';
import BannerSlider from '../components/BannerSlider';

export default function LandingPage() {
    const { theme } = useTheme();

    return (
        <div className="space-y-20 pb-12 relative min-h-screen flex flex-col justify-start">
            <Background3D theme={theme as 'royal' | 'nude'} />

            {/* Auto Slider Banner */}
            <BannerSlider />


            {/* New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 relative z-10 py-12">
                <h2 className={`text-4xl font-serif font-bold text-center mb-12 ${theme === 'royal' ? 'text-white' : 'text-nude-900'}`}>New Arrivals</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.slice(0, 3).map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group block">
                            <div className={`overflow-hidden rounded-2xl relative aspect-[4/5] shadow-xl transition duration-500 transform hover:-translate-y-2 ${theme === 'royal' ? 'shadow-black/50 bg-white/5' : 'shadow-nude-900/10 bg-white'
                                }`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                                />
                                <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent`}>
                                    <h3 className="text-xl font-serif text-white">{product.name}</h3>
                                    <p className="text-white/80 text-sm">{product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Shop All Banner */}
            <section className="relative z-10 py-20 px-4">
                <div className={`max-w-7xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden ${theme === 'royal' ? 'bg-indigo-900/40 border border-white/10' : 'bg-nude-200'
                    }`}>
                    <h2 className={`text-3xl md:text-5xl font-serif font-bold mb-8 ${theme === 'royal' ? 'text-white' : 'text-nude-900'}`}>
                        Explore the Full Collection
                    </h2>
                    <Link to="/shop" className={`px-10 py-3 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105 inline-block ${theme === 'royal' ? 'bg-white text-indigo-900 hover:bg-gray-100' : 'bg-nude-900 text-white hover:bg-nude-800'
                        }`}>
                        Shop All Items
                    </Link>
                </div>
            </section>

            {/* Contact Footer Banner */}
            <section className="relative z-10 py-12 px-4 text-center">
                <p className={`text-lg mb-4 opacity-70 ${theme === 'royal' ? 'text-white' : 'text-nude-900'}`}>
                    Have questions or need assistance?
                </p>
                <Link to="/contact" className={`text-xl font-bold underline underline-offset-4 decoration-2 ${theme === 'royal' ? 'text-indigo-300 hover:text-white' : 'text-nude-600 hover:text-nude-900'
                    }`}>
                    Contact Support
                </Link>
            </section>
        </div>
    );
}
