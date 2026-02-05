import { useState, useEffect, useRef } from 'react';
import { Linkedin, Twitter, Facebook, ArrowUp, Sparkles, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS, COMPANY_INFO } from '../../utils/constants';



const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);



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



  // Scroll handler for back-to-top with rAF throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        setShowBackToTop(scrollPercent > 60);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        className={`border-t pt-8 pb-4 transition-colors duration-300 ${isVisible ? 'footer-revealed' : 'opacity-0'} ${theme === 'dark' ? 'bg-dark-navbar border-dark-accent/20' : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
            {/* Brand & Info (Left - Uses 3/12 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 group">
                  <a href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Frostrek Logo" className="h-8 w-8 transition-transform group-hover:scale-110" />
                    <span className={`text-xl font-bold font-sans tracking-tight ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
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


              {/* Social Icons - Moved here */}
              <div className="flex items-center gap-3">
                <a href={COMPANY_INFO.socials.linkedin} className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Linkedin size={16} /></a>
                <a href={COMPANY_INFO.socials.twitter} className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Twitter size={16} /></a>
                <a href={COMPANY_INFO.socials.facebook} className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Facebook size={16} /></a>
              </div>
            </div>

            {/* Links (Right - Uses 9/12 cols) */}
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Products */}
              <div className="space-y-3">
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
              <div className="space-y-3">
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
              <div className="space-y-3">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Company</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>About Us</a></li>
                  <li><a href="/services" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Services</a></li>
                  <li><a href="/resources" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Resources</a></li>
                  <li><a href="/careers" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Careers</a></li>
                  <li><a href="/contact" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Contact</a></li>
                </ul>
              </div>

              {/* Connect (Map only) */}
              <div className="space-y-3">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Location</h4>

                {/* Embedded Map - Expanded */}
                <div ref={locationRef} onClick={handleLocationClick} className={`relative w-full h-42 rounded-lg overflow-hidden shadow-md border group cursor-pointer transition-all duration-300 ${theme === 'dark' ? 'border-dark-accent/30 bg-dark-card hover:shadow-dark-accent/10' : 'border-gray-200 bg-gray-50 hover:shadow-lg'}`}>
                  <iframe
                    title="Office Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.0%2C28.4%2C77.1%2C28.5&amp;layer=mapnik&amp;marker=28.4595%2C77.0266"
                    className="transition-opacity duration-300"
                    style={{ filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)' : 'none' }}
                  ></iframe>

                  {/* Address Badge - Bottom Left */}
                  <div className="absolute bottom-2 left-2 z-[400]">
                    <div className={`px-2 py-1 rounded-md shadow-lg backdrop-blur-md flex flex-col gap-0.5 ${theme === 'dark' ? 'bg-dark-card/90 text-white border border-dark-accent/30' : 'bg-white/90 text-gray-900 border border-gray-200'}`}>
                      <div className="flex items-center gap-1">
                        <MapPin size={10} className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'} />
                        <span className="text-[10px] font-bold">Success Suncity Tower</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`text-center pt-4 border-t ${theme === 'dark' ? 'border-dark-accent/10' : 'border-gray-200'} text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>

        </div>
      </footer >



      {showBackToTop && (
        <button onClick={scrollToTop} className={`back-to-top fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-40 transition-colors ${theme === 'dark' ? 'bg-dark-accent text-dark-text hover:bg-dark-accent/80' : 'bg-[#B07552] text-white hover:bg-[#8A5A35]'}`} aria-label="Back to top">
          <ArrowUp size={20} className="arrow-icon" />
        </button>
      )
      }
    </>
  );
};

export default Footer;