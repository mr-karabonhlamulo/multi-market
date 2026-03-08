import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
    LayoutDashboard,
    Briefcase,
    Network,
    Building2,
    UserCircle,
    ChevronDown,
    ChevronRight,
    ShoppingBag,
    FileText,
    Receipt,
    Tag,
    Plane,
    Megaphone,
    Users,
    Users2,
    Infinity as InfinityIcon,
    Banknote,
    Trophy,
    TrendingUp,
    UserPlus,
    UserCircle2,
    Landmark,
    ScrollText
} from 'lucide-react';

export default function DashboardLayout() {
    const { theme } = useTheme();

    // Track open state for collapsible menus
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        portfolio: true,
        network: false,
        office: false,
        account: false
    });

    const toggleMenu = (key: string) => {
        setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 font-medium ` +
        (isActive
            ? (theme === 'royal' ? 'bg-royal-accent text-white shadow-lg' : 'bg-nude-900 text-nude-50 shadow-lg')
            : (theme === 'royal' ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-nude-700 hover:bg-nude-200 hover:text-nude-900')
        );

    const subNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 pl-11 pr-4 py-2 rounded-lg text-sm transition duration-200 ` +
        (isActive
            ? (theme === 'royal' ? 'bg-white/10 text-royal-accent font-bold' : 'bg-nude-200 text-nude-900 font-bold')
            : (theme === 'royal' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-nude-600 hover:text-nude-900 hover:bg-nude-100')
        );

    const renderMenuButton = (title: string, icon: any, key: string) => {
        const isOpen = openMenus[key];
        const Icon = icon;
        return (
            <button
                onClick={() => toggleMenu(key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition duration-300 font-medium ${theme === 'royal' ? 'text-white/90 hover:bg-white/10' : 'text-nude-800 hover:bg-nude-200'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} className={theme === 'royal' ? 'text-royal-accent' : 'text-nude-600'} />
                    <span>{title}</span>
                </div>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className={`w-full md:w-64 flex-shrink-0 rounded-2xl p-4 glass-panel h-fit sticky top-24 ${theme === 'royal' ? 'border shadow-2xl' : 'shadow-xl'}`}>
                <nav className="space-y-2">
                    <NavLink to="/partner" end className={navLinkClass}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <div>
                        {renderMenuButton('Portfolio', Briefcase, 'portfolio')}
                        {openMenus.portfolio && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/partner/portfolio/buy-items" className={subNavLinkClass}><ShoppingBag size={16} /> Buy Items</NavLink>
                                <NavLink to="/partner/portfolio/orders" className={subNavLinkClass}><FileText size={16} /> View Orders</NavLink>
                                <NavLink to="/partner/portfolio/payslips" className={subNavLinkClass}><Receipt size={16} /> View Payslips</NavLink>
                                <NavLink to="/partner/portfolio/vouchers" className={subNavLinkClass}><Tag size={16} /> Discount Vouchers</NavLink>
                                <NavLink to="/partner/portfolio/travel" className={subNavLinkClass}><Plane size={16} /> Travel Promo</NavLink>
                                <NavLink to="/partner/portfolio/promotions" className={subNavLinkClass}><Megaphone size={16} /> Company Promo</NavLink>
                            </div>
                        )}
                    </div>

                    <div>
                        {renderMenuButton('Network', Network, 'network')}
                        {openMenus.network && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/partner/network/gen1" className={subNavLinkClass}><Users size={16} /> Gen 1</NavLink>
                                <NavLink to="/partner/network/gen2" className={subNavLinkClass}><Users2 size={16} /> Gen 2</NavLink>
                                <NavLink to="/partner/network/gen-n" className={subNavLinkClass}><InfinityIcon size={16} /> Gen nth</NavLink>
                            </div>
                        )}
                    </div>

                    <div>
                        {renderMenuButton('Office', Building2, 'office')}
                        {openMenus.office && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/partner/office/commissions" className={subNavLinkClass}><Banknote size={16} /> Commissions</NavLink>
                                <NavLink to="/partner/office/rankings" className={subNavLinkClass}><Trophy size={16} /> Rankings</NavLink>
                                <NavLink to="/partner/office/sales" className={subNavLinkClass}><TrendingUp size={16} /> Sales</NavLink>
                                <NavLink to="/partner/office/recruitment" className={subNavLinkClass}><UserPlus size={16} /> Recruitment</NavLink>
                            </div>
                        )}
                    </div>

                    <div>
                        {renderMenuButton('Account', UserCircle, 'account')}
                        {openMenus.account && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/partner/account/profile" className={subNavLinkClass}><UserCircle2 size={16} /> Profile</NavLink>
                                <NavLink to="/partner/account/banking" className={subNavLinkClass}><Landmark size={16} /> Banking</NavLink>
                                <NavLink to="/partner/account/terms" className={subNavLinkClass}><ScrollText size={16} /> T&C's</NavLink>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Main Content inside dashboard */}
            <div className="flex-1 min-w-0">
                <Outlet />
            </div>
        </div>
    );
}
