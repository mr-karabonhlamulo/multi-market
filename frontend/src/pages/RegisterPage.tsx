import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Briefcase, FileText } from 'lucide-react';

export default function RegisterPage() {
    const { theme } = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isReseller = searchParams.get('type') === 'reseller';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // Reseller specific fields
        businessName: '',
        taxId: ''
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
        console.log(`Registering ${isReseller ? 'RESELLER' : 'USER'}:`, formData);

        // Simulate API call
        setTimeout(() => {
            // For now, we just log them in with the new credentials (mock)
            login(formData.email, formData.password);

            if (isReseller) {
                alert("Reseller Application Submitted for Review!");
                navigate('/partner');
            } else {
                navigate('/');
            }
        }, 1000);
    };

    const inputClasses = `w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition ${theme === 'royal'
        ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/20'
        : 'bg-white border-nude-200 focus:border-nude-400 text-nude-900 placeholder-nude-300 ring-0'
        }`;

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className={`w-full max-w-lg p-8 rounded-3xl shadow-2xl ${theme === 'royal' ? 'bg-black/40 backdrop-blur-xl border border-white/10' : 'bg-white/80 backdrop-blur-xl border border-white'
                }`}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">
                        {isReseller ? 'Partner Registration' : 'Create Account'}
                    </h1>
                    <p className="opacity-60 text-sm">
                        {isReseller
                            ? 'Join our exclusive network of official resellers'
                            : 'Join the Greenleaf exclusive network'}
                    </p>
                </div>

                {isReseller && (
                    <div className={`mb-8 p-4 rounded-xl text-center text-sm border ${theme === 'royal' ? 'bg-indigo-900/40 border-indigo-500/30' : 'bg-nude-200/50 border-nude-300'}`}>
                        <p className="font-bold mb-1">Become an Affiliate</p>
                        <p className="opacity-80">Earn commissions on every sale. Access exclusive marketing assets.</p>
                    </div>
                )}

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

                    {isReseller && (
                        <>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                                <input
                                    type="text"
                                    name="businessName"
                                    placeholder="Business Name (Optional)"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                                <input
                                    type="text"
                                    name="taxId"
                                    placeholder="Tax ID / Reseller Code"
                                    value={formData.taxId}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                            {/* Placeholder for "Provided Images" */}
                            <div className="mt-4 border-2 border-dashed rounded-xl p-6 text-center opacity-60 hover:opacity-100 transition cursor-pointer border-current">
                                <p className="text-xs">Upload ID / Business Documents</p>
                                <p className="text-[10px] mt-1">(Drag & Drop or Click)</p>
                            </div>
                        </>
                    )}

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
                        {isReseller ? 'Submit Application' : 'Register'} <ArrowRight size={20} />
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
