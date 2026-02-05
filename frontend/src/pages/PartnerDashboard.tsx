import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Wallet, Users, Award, TrendingUp } from 'lucide-react';

export default function PartnerDashboard() {
    const { theme } = useTheme();

    const stats = [
        { label: 'Wallet Balance', value: 'R 3,150.1', icon: Wallet, color: 'text-green-400' },
        { label: 'Team Size', value: '27 Partners', icon: Users, color: 'text-blue-400' },
        { label: 'Current Rank', value: 'Team Leader', icon: Award, color: 'text-yellow-400' },
        { label: 'This Month', value: 'R 0.00', icon: TrendingUp, color: 'text-purple-400' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Partner Dashboard</h1>
                    <p className="opacity-70">Welcome back, Sanele</p>
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm font-bold ${theme === 'royal' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-nude-300 text-nude-900'
                    }`}>
                    Status: Active
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${theme === 'royal' ? 'bg-white/5' : 'bg-black/5'}`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                        </div>
                        <div>
                            <p className="opacity-60 text-sm">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Commission Warning */}
            <div className={`p-6 rounded-2xl border ${theme === 'royal' ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-red-50 border-red-100 text-red-800'
                }`}>
                <h3 className="font-bold flex items-center gap-2">
                    ⚠️ Commission Warning
                </h3>
                <p className="mt-2 text-sm opacity-90">
                    All team leaders, if you do not maintain your account by the last day of the month, you forfeit this month's commissions.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="font-bold mb-4">Your Referral Link</h3>
                    <div className={`flex items-center p-3 rounded-lg ${theme === 'royal' ? 'bg-black/30' : 'bg-white'
                        }`}>
                        <code className="flex-1 overflow-hidden text-ellipsis">theperfumeco.online/ref/sanele</code>
                        <button className="text-xs font-bold px-3 py-1 bg-indigo-500 rounded ml-2">Copy</button>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="font-bold mb-4">Rank Progress</h3>
                    <div className="h-4 bg-gray-700/30 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[65%]"></div>
                    </div>
                    <p className="text-xs mt-2 text-right opacity-70">65% to Manager Rank</p>
                </div>
            </div>
        </div>
    );
}
