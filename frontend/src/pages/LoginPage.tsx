import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/partner'); // Redirect to portal on success
        } else {
            setError(result.error || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className={`w-full max-w-md space-y-8 p-8 rounded-2xl glass-panel ${theme === 'royal' ? 'shadow-[0_0_50px_rgba(79,70,229,0.15)]' : 'shadow-xl'
                }`}>
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold">Welcome Back</h2>
                    <p className="mt-2 text-sm opacity-70">
                        Sign in to access your partner dashboard
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="opacity-50" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={`appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${theme === 'royal'
                                            ? 'bg-black/20 border-white/10 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="opacity-50" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className={`appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${theme === 'royal'
                                            ? 'bg-black/20 border-white/10 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="text-sm text-center">
                        <span className="opacity-60">Test Credentials: </span>
                        <code className="opacity-80">partner@perfumeco.online / password123</code>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition transform hover:scale-[1.02] ${theme === 'royal'
                                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'
                                : 'bg-nude-900 hover:bg-nude-800'
                            }`}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                        {!loading && <ArrowRight size={16} className="ml-2" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
