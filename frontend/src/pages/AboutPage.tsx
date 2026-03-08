import { useTheme } from '../contexts/ThemeContext';
import Background3D from '../components/Background3D';
import StaticBanner from '../components/StaticBanner';

export default function AboutPage() {
    const { theme } = useTheme();

    return (
        <div className="relative min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -mt-20 pt-0 pb-12">
            <Background3D theme={theme as 'royal' | 'nude'} />

            <StaticBanner title="Our Story" subtitle="Where luxury meets opportunity." />

            <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 text-center">

                <div className={`prose prose-lg mx-auto ${theme === 'royal' ? 'text-white/80' : 'text-nude-900/80'}`}>
                    <p className="mb-6 text-xl leading-relaxed">
                        Welcome to Greenleaf, where luxury meets opportunity. We believe that true elegance is not just about what you wear, but how you live.
                    </p>
                    <p className="mb-6">
                        Founded on the principles of exclusivity and empowerment, our diverse range of premium perfumes is designed to captivate and inspire. Each scent is a masterpiece, crafted with the finest ingredients to ensure a lasting impression.
                    </p>
                    <p>
                        Beyond our products, we are a community. A network of ambitious individuals who understand that success is the ultimate accessory. Join us in redefining luxury for the modern era.
                    </p>
                </div>
            </div>
        </div>
    );
}
