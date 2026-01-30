import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

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
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden p-5 ring-1 ring-black/5">
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
                                            className="group flex items-start gap-3 p-2 rounded-lg hover:bg-[#FDFBF7] hover:shadow-md hover:shadow-[#B07552]/10 transition-all duration-200 border border-transparent hover:border-[#E6D0C6]"
                                        >
                                            <div className="p-2 rounded-full bg-[#E6D0C6]/20 text-[#B07552] group-hover:bg-[#B07552] group-hover:text-white transition-colors duration-200 shadow-sm shrink-0">
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#B07552] transition-colors">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors mt-0.5 leading-snug">
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
