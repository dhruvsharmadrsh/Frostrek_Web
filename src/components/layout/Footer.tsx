import { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Twitter, Facebook, ChevronDown, Check, ArrowUp, Sparkles, Copy, Globe, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Mock constants - replace with actual imports
const NAV_ITEMS = [
  {
    label: 'Products',
    megaMenu: [{
      items: [
        { name: 'AI Platform', href: '/products/ai-platform' },
        { name: 'Automation Suite', href: '/products/automation' },
        { name: 'Analytics Dashboard', href: '/products/analytics' },
        { name: 'Integration Tools', href: '/products/integration' },
        { name: 'Security Hub', href: '/products/security' }
      ]
    }]
  },
  {
    label: 'Solutions',
    megaMenu: [{
      items: [
        { name: 'Manufacturing', href: '/solutions/manufacturing' },
        { name: 'Healthcare', href: '/solutions/healthcare' },
        { name: 'Finance', href: '/solutions/finance' },
        { name: 'Retail', href: '/solutions/retail' }
      ]
    }]
  }
];

const COMPANY_INFO = {
  name: 'Frostrek Technologies',
  address: 'Sector 65, Success Suncity Tower, Gurgaon',
  contact: 'info@frostrek.com',
  socials: {
    linkedin: 'https://linkedin.com/company/frostrek',
    twitter: 'https://twitter.com/frostrek',
    facebook: 'https://facebook.com/frostrek'
  }
};

const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'ENG' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem('frostrek_lang');
    if (saved) setSelectedLang(saved);
  }, []);

  // Intersection Observer for footer reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll handler for back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowBackToTop(scrollPercent > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangSelect = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem('frostrek_lang', code);
    setLangOpen(false);
  };



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(COMPANY_INFO.contact);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY_INFO.address), '_blank');
  };



  return (
    <>
      <style>{`
        /* ... (keep existing animations) ... */
        @keyframes footerReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes underlineExpand { from { width: 0; } to { width: 100%; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes linkFadeIn { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes emailShimmer { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes copyPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes networkPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }

        .footer-revealed { animation: footerReveal 300ms ease-out forwards; }
        .section-title { position: relative; display: inline-block; }
        .section-title::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; background: rgba(176, 117, 82, 0.5); width: 0; }
        .footer-revealed .section-title::after { animation: underlineExpand 400ms ease-out 150ms forwards; }
        .footer-link { position: relative; display: inline-block; transition: color 150ms ease-out; }
        .footer-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 200ms ease-out; }
        .footer-link:hover::after { transform: scaleX(1); }
        .footer-revealed .footer-link { animation: linkFadeIn 300ms ease-out forwards; }
        .social-icon { position: relative; overflow: hidden; transition: all 150ms ease-out; }
        .social-icon:hover { transform: translateY(-2px); }
        .social-icon:active { transform: translateY(1px); }
        .social-icon::before { content: ''; position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.5); border-radius: 50%; transform: translate(-50%, -50%) scale(0); pointer-events: none; }
        .social-icon:active::before { animation: ripple 600ms ease-out; }
        .iso-badge { transition: all 200ms ease-out; }
        .iso-badge:hover { transform: scale(1.02); box-shadow: 0 0 12px rgba(176, 117, 82, 0.3); }
        .email-container { position: relative; overflow: hidden; }
        .email-shimmer::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(176, 117, 82, 0.2), transparent); pointer-events: none; }
        .footer-revealed .email-shimmer::after { animation: emailShimmer 1.5s ease-out 800ms; }
        .lang-switcher { transition: border-color 150ms ease-out; }
        .lang-arrow { transition: transform 200ms ease-out; }
        .lang-switcher:hover .lang-arrow { transform: rotate(180deg); }
        .lang-dropdown { animation: fadeSlideUp 200ms ease-out; }
        .feedback-tab { transition: all 200ms ease-out; }
        .feedback-tab:hover { padding-right: 20px; }
        .feedback-panel { animation: slideIn 280ms ease-out; }
        .careers-card { transition: all 200ms ease-out; }
        .careers-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); }
        .careers-card:active { transform: translateY(2px); }
        .careers-icon { transition: opacity 200ms ease-out; }
        .careers-card:hover .careers-icon { opacity: 1; }
        .network-node { animation: networkPulse 3s ease-in-out infinite; }
        .network-node:nth-child(1) { animation-delay: 0s; }
        .network-node:nth-child(2) { animation-delay: 0.6s; }
        .network-node:nth-child(3) { animation-delay: 1.2s; }
        .network-node:nth-child(4) { animation-delay: 1.8s; }
        .back-to-top { animation: fadeSlideUp 250ms ease-out; }
        .back-to-top:hover .arrow-icon { transform: translateY(-2px); }
        .arrow-icon { transition: transform 150ms ease-out; }
        .copy-notification { animation: copyPulse 200ms ease-out; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Careers Card - Keep unchanged */}
      <div className={`py-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <a href="/contact" className="block max-w-4xl mx-auto">
            <div className={`careers-card border-2 rounded-2xl p-6 cursor-pointer transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30 hover:border-dark-accent' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <svg className="careers-icon w-12 h-12 opacity-80" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                    <circle cx="32" cy="16" r="4" fill="currentColor" className={`${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8A5A35]'} network-node`} />
                    <circle cx="16" cy="32" r="4" fill="currentColor" className={`${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8A5A35]'} network-node`} />
                    <circle cx="48" cy="32" r="4" fill="currentColor" className={`${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8A5A35]'} network-node`} />
                    <circle cx="32" cy="48" r="4" fill="currentColor" className={`${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8A5A35]'} network-node`} />
                    <line x1="32" y1="20" x2="32" y2="28" stroke="currentColor" strokeWidth="2" className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                    <line x1="20" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="2" className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                    <line x1="36" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2" className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                    <line x1="32" y1="36" x2="32" y2="44" stroke="currentColor" strokeWidth="2" className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className={`text-xl font-bold mb-1 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                    Build the Future of AI at Frostrek
                    <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                    Join our team of innovators solving real-world problems.
                  </p>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-[#F3E9CD] text-[#8A5A35]'}`}>
                    →
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className={`border-t py-10 transition-colors duration-300 ${isVisible ? 'footer-revealed' : 'opacity-0'} ${theme === 'dark' ? 'bg-dark-navbar border-dark-accent/20' : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Brand, Info & Map (Left - Uses 4/12 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 group">
                  <a href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Frostrek Logo" className="h-9 w-9 transition-transform group-hover:scale-110" />
                    <span className={`text-2xl font-bold font-sans tracking-tight ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                      Frostrek
                    </span>
                  </a>
                  {/* ISO Badges - Now Next to Logo */}
                  <div className="flex items-center gap-2">
                    <div className={`iso-badge px-2 py-0.5 border rounded text-[10px] font-bold tracking-wide transition-colors ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30 text-dark-accent' : 'bg-[#FDFBF7] border-[#E6D0C6] text-[#8A5A35]'}`}>
                      ISO 27001
                    </div>
                    <div className={`iso-badge px-2 py-0.5 border rounded text-[10px] font-bold tracking-wide transition-colors ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30 text-dark-accent' : 'bg-[#FDFBF7] border-[#E6D0C6] text-[#8A5A35]'}`}>
                      ISO 9001
                    </div>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed max-w-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                  Empowering industries through AI, automation, and innovation - one intelligent solution at a time.
                </p>
              </div>

              {/* Embedded Map with Hover Address Tooltip */}
              <div ref={locationRef} onClick={handleLocationClick} className={`relative w-full h-36 rounded-xl overflow-hidden shadow-md border group cursor-pointer transition-all duration-300 ${theme === 'dark' ? 'border-dark-accent/30 bg-dark-card hover:shadow-dark-accent/10' : 'border-gray-200 bg-gray-50 hover:shadow-lg'}`}>
                <iframe
                  title="Office Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.0%2C28.4%2C77.1%2C28.5&amp;layer=mapnik&amp;marker=28.4595%2C77.0266"
                  className="group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                  style={{ filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)' : 'none' }}
                ></iframe>

                {/* Address Tooltip Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                  <div className={`px-4 py-2 rounded-lg shadow-xl backdrop-blur-md flex flex-col items-center text-center gap-1 ${theme === 'dark' ? 'bg-dark-card/90 text-white border border-dark-accent/30' : 'bg-white/90 text-gray-900 border border-gray-200'}`}>
                    <MapPin size={16} className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                    <span className="text-xs font-bold">Success Suncity Tower</span>
                    <span className="text-[10px] opacity-80">Sector 65, Gurgaon</span>
                  </div>
                </div>
              </div>

              {/* Email & Lang Row */}
              <div className="flex items-center justify-between gap-4">
                <div className={`flex items-center gap-2 email-container ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                  <Mail size={16} className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                  <button onClick={copyEmail} className={`email-shimmer text-xs transition-colors flex items-center gap-1 group ${theme === 'dark' ? 'hover:text-dark-accent' : 'hover:text-[#B07552]'}`}>
                    <span className="truncate max-w-[150px]">{COMPANY_INFO.contact}</span>
                    {emailCopied ? <Check size={12} className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} /> : <Copy size={12} className="opacity-0 group-hover:opacity-100" />}
                  </button>
                </div>

                {/* Language Switcher Small */}
                <div className="relative" ref={langRef}>
                  <button onClick={() => setLangOpen(!langOpen)} className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${theme === 'dark' ? 'border-dark-accent/30 text-dark-text hover:border-dark-accent' : 'border-gray-300 hover:border-[#B07552]'}`}>
                    <Globe size={12} className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                    <span>{LANGUAGES.find(l => l.code === selectedLang)?.flag}</span>
                    <ChevronDown size={14} className="lang-arrow" />
                  </button>
                  {langOpen && (
                    <div className={`lang-dropdown absolute bottom-full mb-1 left-0 border rounded-lg shadow-lg overflow-hidden z-10 w-32 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                      {LANGUAGES.map(lang => (
                        <button key={lang.code} onClick={() => handleLangSelect(lang.code)} className={`w-full px-3 py-2 flex items-center gap-2 text-xs transition-colors ${theme === 'dark' ? 'text-dark-text hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Links (Right - Uses 8/12 cols) */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Products */}
              <div className="space-y-4">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Products</h4>
                <ul className="space-y-2">
                  {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 5).map(item => (
                    <li key={item.name}>
                      <a href={item.href} className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="space-y-4">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Solutions</h4>
                <ul className="space-y-2">
                  {NAV_ITEMS.find(n => n.label === 'Solutions')?.megaMenu?.flatMap(s => s.items).map(item => (
                    <li key={item.name}>
                      <a href={item.href} className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Company</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>About Us</a></li>
                  <li><a href="/services" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Services</a></li>
                  <li><a href="/resources" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Resources</a></li>
                  <li><a href="/careers" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Careers</a></li>
                  <li><a href="/contact" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Contact</a></li>
                </ul>
              </div>

              {/* Connect (Socials & Copyright moved here) */}
              <div className="space-y-4 flex flex-col justify-between h-full pb-2">
                <div>
                  <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Connect</h4>
                  <div className="flex items-center gap-3">
                    <a href={COMPANY_INFO.socials.linkedin} className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Linkedin size={16} /></a>
                    <a href={COMPANY_INFO.socials.twitter} className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Twitter size={16} /></a>
                    <a href={COMPANY_INFO.socials.facebook} className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Facebook size={16} /></a>
                  </div>
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-auto`}>
                  &copy; {currentYear} {COMPANY_INFO.name}.<br />All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>



      {showBackToTop && (
        <button onClick={scrollToTop} className={`back-to-top fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-40 transition-colors ${theme === 'dark' ? 'bg-dark-accent text-dark-text hover:bg-dark-accent/80' : 'bg-[#B07552] text-white hover:bg-[#8A5A35]'}`} aria-label="Back to top">
          <ArrowUp size={20} className="arrow-icon" />
        </button>
      )}
    </>
  );
};

export default Footer;