import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import MegaMenu from './MegaMenu';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled
                ? "bg-[#1e736c]/90 backdrop-blur-xl shadow-lg border-b border-white/10 h-16"
                : "bg-[#1e736c] border-b border-transparent h-20"
        )}>
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/optimized/logo.webp"
                        alt="Frostrek Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 transition-transform group-hover:scale-110"
                    />
                    <span className="text-2xl font-bold font-sans tracking-tight transition-colors text-white">
                        Frostrek
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium transition-colors py-2 text-white/90 hover:text-white",
                                    location.pathname === item.href && "text-brand-green-400 font-semibold"
                                )}
                            >
                                {item.label}
                                {item.megaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                            </Link>

                            {/* Mega Menu */}
                            {item.megaMenu && (
                                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-0 top-full pt-4 w-full">
                                    <MegaMenu sections={item.megaMenu} />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTAs */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/schedule-demo">
                        <Button size="sm" className="px-6 bg-gradient-to-r from-brand-green-500 to-accent-green hover:from-brand-green-600 hover:to-brand-green-400 shadow-lg shadow-brand-green-500/30 border-none text-white">
                            <Calendar size={16} className="mr-2" />
                            Schedule a demo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn(
                        "lg:hidden p-2 transition-colors text-white"
                    )}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-[#1e736c] border-b border-white/10 shadow-xl z-50"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    {item.megaMenu ? (
                                        <div className="space-y-2">
                                            <div className="text-white font-medium py-2">{item.label}</div>
                                            <div className="pl-4 space-y-4 border-l border-green-200 ml-2">
                                                {item.megaMenu.map((section) => (
                                                    <div key={section.title}>
                                                        <h5 className="text-xs text-brand-green-600 uppercase mb-2 font-bold">{section.title}</h5>
                                                        <ul className="space-y-2">
                                                            {section.items.map((subItem) => (
                                                                <li key={subItem.name}>
                                                                    <Link
                                                                        to={subItem.href}
                                                                        className="block text-sm text-slate-200 hover:text-white"
                                                                        onClick={() => setMobileMenuOpen(false)}
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className="text-white font-medium block py-2 border-b border-white/10 last:border-0 hover:text-brand-green-400"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-gray-200">
                                <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center py-4 text-lg bg-gradient-to-r from-brand-green-500 to-accent-green border-none shadow-xl shadow-brand-green-500/20">
                                        <Calendar size={20} className="mr-2" />
                                        Schedule a demo
                                    </Button>
                                </Link>
                                <p className="text-center text-xs text-gray-500 mt-2">
                                    Trusted by 200+ global enterprises
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};

export default Header;
