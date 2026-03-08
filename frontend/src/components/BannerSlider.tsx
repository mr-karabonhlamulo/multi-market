import { useState, useEffect } from 'react';

interface Slide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
}

const slides: Slide[] = [
    {
        id: 1,
        image: '/media__1772958571143.jpg',
        title: 'Essence of Luxury',
        subtitle: 'Minimal. Timeless. Yours.'
    },
    {
        id: 2,
        image: '/media__1772958613507.jpg',
        title: 'Botanical Elegance',
        subtitle: 'Unveil the true nature of beauty.'
    }
];

export default function BannerSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        // Handle scroll behavior to pause auto-slider "onslidedown"
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsPaused(true);
            } else {
                setIsPaused(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000); // 5 seconds per slide
            return () => clearInterval(timer);
        }
    }, [isPaused]);

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {/* Background Image */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[10000ms] ease-out"
                        style={{ transform: index === currentSlide && !isPaused ? 'scale(1.1)' : 'scale(1.05)' }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                        <h1 className={`text-5xl md:text-8xl font-serif font-bold tracking-tight text-white drop-shadow-lg mb-4`}>
                            {slide.title}
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-white/90 drop-shadow-md">
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentSlide(index);
                            setIsPaused(true);
                            setTimeout(() => setIsPaused(window.scrollY > 100), 10000); // resume after 10s if not scrolled
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
