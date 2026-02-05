import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'royal' | 'nude';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('royal');

    useEffect(() => {
        // Apply theme class to html element
        const root = window.document.documentElement;
        root.classList.remove('royal', 'nude', 'dark');

        if (theme === 'royal') {
            root.classList.add('dark'); // Royal is dark mode based
        } else {
            root.classList.add('nude'); // Custom class for nude overrides if needed, or just light
        }
        // Also store in local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'royal' ? 'nude' : 'royal');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
