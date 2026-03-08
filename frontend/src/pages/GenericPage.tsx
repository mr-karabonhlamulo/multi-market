import { useLocation } from 'react-router-dom';
import StaticBanner from '../components/StaticBanner';

export default function GenericPage({ title }: { title?: string }) {
    const location = useLocation();

    // Auto-generate title from path if not provided
    const displayTitle = title || location.pathname
        .split('/')
        .pop()
        ?.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="space-y-8 pb-12 animate-fade-in -mx-4 sm:-mx-6 lg:-mx-8 -mt-20 pt-0">
            <StaticBanner title={displayTitle || 'Partner Page'} subtitle="Explore your partner features." />

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="glass-panel p-10 rounded-3xl text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">{displayTitle}</h1>
                    <p className="text-lg opacity-70">
                        This page is currently under construction. A working preview for {displayTitle} will be connected to the database soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
