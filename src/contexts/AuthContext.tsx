import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    role: string;
    full_name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Check for persisted session on load (Mock)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Login failed' };
            }

            const { user, session } = data;

            // Persist the user and mock token
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            if (session) {
                localStorage.setItem('token', session.access_token);
            }
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, error: 'Network error connecting to backend.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
