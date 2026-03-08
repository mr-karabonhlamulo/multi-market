import { useTheme } from '../contexts/ThemeContext';

interface StaticBannerProps {
    title: string;
    subtitle?: string;
    image?: string;
}

export default function StaticBanner({ title, subtitle, image = '/media__1772958571143.jpg' }: StaticBannerProps) {
    const { theme } = useTheme();

    return (
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden mb-12">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-2xl font-light text-white/90 drop-shadow-sm max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Overlay Gradient at the bottom to merge with page */}
            <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${theme === 'royal' ? 'from-[#052b2b]' : 'from-nude-50'} to-transparent`}></div>
        </div>
    );
}
