import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Background3D from '../components/Background3D';

export default function ContactPage() {
    const { theme } = useTheme();

    const socialPosts = [
        { id: 1, platform: 'instagram', content: 'New Summer Collection dropping soon! 🌸 #MLMCo #Luxury', likes: '2.5k', icon: Instagram },
        { id: 2, platform: 'facebook', content: 'Join our exclusive partner network today. DM for details.', likes: '1.2k', icon: Facebook },
        { id: 3, platform: 'twitter', content: 'Elegance is an attitude. What is your signature scent?', likes: '850', icon: Twitter },
        { id: 4, platform: 'linkedin', content: 'Proud to announce our record-breaking quarterly growth. #Business #MLM', likes: '5.4k', icon: Linkedin },
        { id: 5, platform: 'instagram', content: 'Behind the scenes at our latest photoshoot in Paris. 📸', likes: '3.1k', icon: Instagram },
        { id: 6, platform: 'facebook', content: 'Customer Appreciation Month! Enjoy 20% off all orders.', likes: '4.2k', icon: Facebook },
    ];

    return (
        <div className="relative min-h-screen pt-20 pb-12">
            <Background3D theme={theme as 'royal' | 'nude'} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <h1 className={`text-5xl font-serif font-bold text-center mb-4 ${theme === 'royal' ? 'text-white' : 'text-nude-900'}`}>
                    Connect With Us
                </h1>
                <p className={`text-center mb-16 opacity-70 ${theme === 'royal' ? 'text-white' : 'text-nude-900'}`}>
                    Stay updated with our latest news and social buzz.
                </p>

                {/* Social Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {socialPosts.map((post) => (
                        <div key={post.id} className={`p-6 rounded-2xl backdrop-blur-md transition transform hover:-translate-y-2 hover:shadow-2xl ${theme === 'royal'
                                ? 'bg-white/10 border border-white/10 shadow-lg shadow-indigo-500/10'
                                : 'bg-white/80 border border-nude-200 shadow-xl'
                            }`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-full ${theme === 'royal' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-nude-100 text-nude-600'
                                    }`}>
                                    <post.icon size={20} />
                                </div>
                                <span className={`text-sm font-bold ${theme === 'royal' ? 'text-white/60' : 'text-nude-900/60'
                                    }`}>
                                    @{post.platform}
                                </span>
                            </div>

                            <p className={`mb-6 text-lg leading-snug ${theme === 'royal' ? 'text-white' : 'text-nude-900'
                                }`}>
                                "{post.content}"
                            </p>

                            <div className={`flex justify-between items-center text-sm font-medium ${theme === 'royal' ? 'text-indigo-300' : 'text-nude-500'
                                }`}>
                                <span>{post.likes} Likes</span>
                                <span className="cursor-pointer hover:underline">View Post &rarr;</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
