import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Palette } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import MegaMenu from './MegaMenu';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            // Throttle scroll events using requestAnimationFrame
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled
                ? "h-16 shadow-[0_1px_0_rgba(176,117,82,0.15)]"
                : "h-20",
            theme === 'dark'
                ? "bg-dark-navbar"
                : "bg-[#B07552]"
        )}>
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                {/* 1. Logo (Left) */}
                <Link to="/" className="flex items-center gap-0 group min-w-[140px]">
                    <img
                        src="/logo.png"
                        alt="Frostrek"
                        className="h-8 w-auto object-contain"
                    />
                    <span className="text-xl font-bold font-sans tracking-tight text-background">
                        frostrek
                    </span>
                </Link>

                {/* 2. Desktop Nav (Center) */}
                <nav className="hidden xl:flex items-center justify-center gap-5 flex-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-semibold transition-colors py-2 relative",
                                    theme === 'dark'
                                        ? "text-dark-text/80 hover:text-dark-accent"
                                        : "text-background hover:text-primary",
                                    location.pathname === item.href && (theme === 'dark' ? "text-dark-accent font-bold" : "text-primary font-bold")
                                )}
                            >
                                {item.label}
                                {item.megaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                                {location.pathname === item.href && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className={cn(
                                            "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                                            theme === 'dark' ? "bg-dark-accent" : "bg-[#8A5A35]"
                                        )}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>

                            {/* Mega Menu */}
                            {item.megaMenu && (
                                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[600px]">
                                    <MegaMenu sections={item.megaMenu} />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* 3. CTAs (Right) */}
                <div className="hidden xl:flex items-center justify-end gap-3 min-w-[160px] shrink-0">
                    <Link to="/schedule-demo">
                        <Button size="sm" className={cn(
                            "px-4 text-sm rounded-md font-semibold border-none shadow-md whitespace-nowrap",
                            theme === 'dark'
                                ? "bg-dark-accent text-dark-bg hover:bg-dark-accent/90"
                                : "bg-background text-[#B07552]"
                        )}>
                            Request Demo
                        </Button>
                    </Link>

                    {/* Theme Toggle Button */}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn(
                        "xl:hidden p-2 transition-colors",
                        theme === 'dark' ? "text-dark-text" : "text-primary"
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
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "xl:hidden absolute top-full left-0 w-full border-b shadow-xl z-50",
                            theme === 'dark' ? "bg-dark-navbar border-dark-accent/20" : "bg-[#FDFBF7] border-gray-100"
                        )}
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "font-medium block py-2 border-b last:border-0",
                                            theme === 'dark' ? "text-dark-text border-dark-accent/20 hover:text-dark-accent" : "text-primary border-gray-100"
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                            <div className="mt-4 flex flex-col gap-3">
                                <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className={cn(
                                        "w-full justify-center",
                                        theme === 'dark' ? "bg-dark-accent text-dark-bg" : "bg-[#B07552] text-white"
                                    )}>
                                        Request Demo
                                    </Button>
                                </Link>

                                {/* Mobile Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className={cn(
                                        "w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300",
                                        theme === 'dark'
                                            ? "bg-dark-card text-dark-accent hover:bg-dark-accent/20"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    )}
                                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: theme === 'dark' ? 360 : 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <Palette size={20} />
                                    </motion.div>
                                    <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};

export default Header;
