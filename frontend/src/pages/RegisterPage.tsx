import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const { theme } = useTheme();
    const { login } = useAuth(); // We'll auto-login after register for now, or just mock it
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Mock Registration Logic
        console.log("Registering user:", formData);

        // Simulate API call
        setTimeout(() => {
            // For now, we just log them in with the new credentials (mock)
            login(formData.email, formData.password);
            navigate('/partner'); // Redirect to dashboard or shop
        }, 1000);
    };

    const inputClasses = `w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition ${theme === 'royal'
            ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/20'
            : 'bg-white border-nude-200 focus:border-nude-400 text-nude-900 placeholder-nude-300'
        }`;

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${theme === 'royal' ? 'bg-black/40 backdrop-blur-xl border border-white/10' : 'bg-white/80 backdrop-blur-xl border border-white'
                }`}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
                    <p className="opacity-60 text-sm">Join the MLM Co. exclusive network</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] mt-6 ${theme === 'royal'
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                                : 'bg-nude-900 hover:bg-nude-800 text-nude-50'
                            }`}
                    >
                        Register <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm opacity-60">
                    Already have an account?{' '}
                    <Link to="/login" className={`font-bold hover:underline ${theme === 'royal' ? 'text-indigo-400' : 'text-nude-600'
                        }`}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
