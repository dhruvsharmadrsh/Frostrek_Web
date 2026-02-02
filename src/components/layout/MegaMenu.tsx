import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

import {
    Bot,
    Mic,
    MessageSquare,
    Database,
    BarChart,
    ShoppingCart,
    Headset,
    Server,
    TrendingUp,
    Linkedin
} from 'lucide-react';

// Icon mapping
const iconMap: Record<string, React.FC<any>> = {
    Bot,
    Mic,
    MessageSquare,
    Database,
    BarChart,
    ShoppingCart,
    Headset,
    Server,
    TrendingUp,
    Linkedin
};

interface SubItem {
    name: string;
    href: string;
    desc: string;
    icon?: string;
}

interface Section {
    title: string;
    items: SubItem[];
}

interface MegaMenuProps {
    sections: Section[];
    onClose?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ sections, onClose }) => {
    const { theme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 max-w-[90vw]",
                sections.length > 1 ? "w-[720px]" : "w-[400px]"
            )}
        >
            <div className={cn(
                "backdrop-blur-xl border rounded-xl shadow-2xl overflow-hidden p-5 ring-1",
                theme === 'dark'
                    ? "bg-dark-card/95 border-dark-accent/30 ring-dark-accent/10"
                    : "bg-white/90 border-white/20 ring-black/5"
            )}>
                <div
                    className={cn(
                        "grid gap-x-8 gap-y-6",
                        sections.length > 1
                            ? "grid-cols-1 md:grid-cols-2"
                            : "grid-cols-1"
                    )}>
                    {sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                            <h3 className="text-[10px] font-bold text-[#B07552] uppercase tracking-wider flex items-center gap-2 mb-2">
                                <span className="w-6 h-[2px] bg-[#B07552] rounded-full"></span>
                                {section.title}
                            </h3>
                            <div className="grid gap-2">
                                {section.items.map((item, itemIdx) => {
                                    const Icon = item.icon ? iconMap[item.icon] : Bot;
                                    return (
                                        <Link
                                            key={itemIdx}
                                            to={item.href}
                                            onClick={onClose}
                                            className={cn(
                                                "group flex items-start gap-3 p-2 rounded-lg transition-all duration-200 border border-transparent",
                                                theme === 'dark'
                                                    ? "hover:bg-dark-bg hover:shadow-md hover:shadow-dark-accent/10 hover:border-dark-accent/30"
                                                    : "hover:bg-[#FDFBF7] hover:shadow-md hover:shadow-[#B07552]/10 hover:border-[#E6D0C6]"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2 rounded-full transition-colors duration-200 shadow-sm shrink-0",
                                                theme === 'dark'
                                                    ? "bg-dark-accent/20 text-dark-accent group-hover:bg-dark-accent group-hover:text-dark-bg"
                                                    : "bg-[#E6D0C6]/20 text-[#B07552] group-hover:bg-[#B07552] group-hover:text-white"
                                            )}>
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className={cn(
                                                    "font-bold text-sm transition-colors",
                                                    theme === 'dark'
                                                        ? "text-dark-text group-hover:text-dark-accent"
                                                        : "text-gray-900 group-hover:text-[#B07552]"
                                                )}>
                                                    {item.name}
                                                </h4>
                                                <p className={cn(
                                                    "text-xs transition-colors mt-0.5 leading-snug",
                                                    theme === 'dark'
                                                        ? "text-dark-text-muted group-hover:text-dark-text/80"
                                                        : "text-gray-500 group-hover:text-gray-600"
                                                )}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default MegaMenu;
