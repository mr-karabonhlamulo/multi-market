import { useLocation } from 'react-router-dom';

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
        <div className="space-y-8 pb-12 animate-fade-in">
            <div className="glass-panel p-10 rounded-3xl text-center">
                <h1 className="text-4xl font-serif font-bold mb-4">{displayTitle}</h1>
                <p className="text-lg opacity-70">
                    This page is currently under construction. A working preview for {displayTitle} will be connected to the database soon.
                </p>
            </div>
        </div>
    );
}
