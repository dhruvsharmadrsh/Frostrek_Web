import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Zap, CheckCircle2, MousePointer2 } from 'lucide-react';
import type { Challenge } from '../../utils/solutionData';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

interface CommonChallengesProps {
    challenges: Challenge[];
}

const IMAGES = [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
];

// Mobile Card Component
const MobileCard = ({ challenge, index, total, theme }: { challenge: Challenge; index: number; total: number; theme: string }) => (
    <div className="flex-shrink-0 w-[85vw] snap-center">
        <div className={`rounded-2xl border shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-[#FDFBF7] border-[#B07552]/20'}`}>
            <div className="relative h-40 overflow-hidden">
                <img
                    src={IMAGES[index % IMAGES.length]}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#B07552]/90 to-[#6E4629]/95" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <span className="self-start font-mono text-xs tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20 text-white">
                        0{index + 1} / 0{total}
                    </span>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{challenge.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-2">{challenge.description}</p>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#B07552] text-white flex items-center justify-center">
                        <CheckCircle2 size={14} />
                    </span>
                    <span className="text-[#B07552] font-bold text-xs uppercase tracking-wide">AI Solution</span>
                </div>
                <p className={`text-base font-light leading-snug mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>{challenge.solvedBy}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {['AI-Powered', 'Secure', 'Real-time'].map((tag, i) => (
                        <span key={i} className={`px-2 py-1 border rounded-md text-xs ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30 text-dark-text-muted' : 'bg-[#FAF6F3] border-[#E6D0C6] text-[#5D5046]'}`}>{tag}</span>
                    ))}
                </div>
                <div className={`flex justify-between py-3 border-t ${theme === 'dark' ? 'border-dark-accent/30' : 'border-[#E6D0C6]'}`}>
                    <div className="text-center"><p className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>60%</p><p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Cost Cut</p></div>
                    <div className="text-center"><p className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>24/7</p><p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Uptime</p></div>
                    <div className="text-center"><p className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>&lt;1s</p><p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Response</p></div>
                </div>
            </div>
        </div>
    </div>
);

// Desktop Card Component
const DesktopCard = ({ challenge, index, total, theme }: { challenge: Challenge; index: number; total: number; theme: string }) => (
    <div className="challenge-card absolute top-0 left-0 w-full h-full flex items-center justify-center p-4" style={{ zIndex: total - index }}>
        <div className={`relative w-full max-w-5xl h-[70vh] rounded-2xl border shadow-2xl overflow-hidden flex flex-row group ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-[#FDFBF7] border-[#B07552]/20'}`}>
            <div className="relative h-full w-[42%] overflow-hidden text-white">
                <div className="absolute inset-0">
                    <img src={IMAGES[index % IMAGES.length]} alt={challenge.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B07552]/95 to-[#6E4629]/95" />
                </div>
                <div className="relative z-10 flex flex-col h-full p-6">
                    <span className="self-start font-mono text-xs tracking-wider bg-white/10 px-3 py-1.5 rounded-full border border-white/20 mb-auto">0{index + 1} / 0{total}</span>
                    <div className="mb-6">
                        <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3">{challenge.title}</h3>
                        <div className="w-10 h-0.5 bg-white/50 rounded-full mb-3" />
                        <p className="text-white/90 text-sm leading-relaxed">{challenge.description}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-xs font-semibold uppercase tracking-wider self-start">
                        <Zap size={12} className="text-[#E0CC94]" /><span>Challenge</span>
                    </div>
                </div>
            </div>
            <div className={`relative h-full w-[58%] p-6 flex flex-col ${theme === 'dark' ? 'bg-dark-card' : 'bg-[#FDFBF7]'}`}>
                <div className={`absolute inset-0 opacity-20 [background-size:20px_20px] ${theme === 'dark' ? 'bg-[radial-gradient(#bf8440_1px,transparent_1px)]' : 'bg-[radial-gradient(#B07552_1px,transparent_1px)]'}`} />
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-[#B07552] text-white flex items-center justify-center shadow-md"><CheckCircle2 size={16} /></span>
                        <span className="text-[#B07552] font-bold text-xs uppercase tracking-wide">AI Solution</span>
                    </div>
                    <p className={`text-xl lg:text-2xl font-light leading-snug mb-5 ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>{challenge.solvedBy}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {[{ label: 'Instant Deploy', desc: 'Go live fast' }, { label: 'AI-Powered', desc: 'Smart automation' }, { label: 'Enterprise Secure', desc: 'SOC2 ready' }, { label: 'Real-time', desc: 'Live insights' }].map((tag, i) => (
                            <div key={i} className={`p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/30' : 'bg-white border-[#E6D0C6]'}`}>
                                <div className="flex items-center gap-1.5 mb-0.5"><div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]'}`} /><span className={`font-semibold text-xs ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>{tag.label}</span></div>
                                <p className={`text-[10px] pl-3 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>{tag.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className={`flex gap-5 py-3 border-y mb-4 ${theme === 'dark' ? 'border-dark-accent/30' : 'border-[#E6D0C6]'}`}>
                        <div><p className={`text-xl font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>60%</p><p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Cost Cut</p></div>
                        <div><p className={`text-xl font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>24/7</p><p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Uptime</p></div>
                        <div><p className={`text-xl font-bold ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>&lt;1s</p><p className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#8C7E72]'}`}>Response</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CommonChallenges = ({ challenges }: CommonChallengesProps) => {
    const { theme } = useTheme();
    const container = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cleanup GSAP on unmount or when switching to mobile
    useEffect(() => {
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
        };
    }, [isMobile]);

    useGSAP(() => {
        if (isMobile || !triggerRef.current || !container.current || challenges.length === 0) {
            // Kill any existing ScrollTrigger when going mobile
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            return;
        }

        const cards = gsap.utils.toArray<HTMLElement>('.challenge-card');
        const count = cards.length;
        if (count === 0) return;

        gsap.set(cards, { yPercent: 0 });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${(count - 1) * 80}%`,
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
                onRefresh: (self) => { scrollTriggerRef.current = self; }
            }
        });

        cards.forEach((card, i) => {
            if (i === count - 1) return;
            timeline.to(card, { yPercent: -100 - (i * 5), scale: 0.95, ease: "none", duration: 1 }, i * 0.8);
        });

    }, { scope: container, dependencies: [challenges, isMobile] });

    return (
        <section ref={container} className={`relative ${theme === 'dark' ? 'bg-dark-bg' : 'bg-[#FDFBF7]'}`}>
            {/* Intro */}
            <div className="container mx-auto px-4 py-8 md:py-10 text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-[10px] md:text-xs uppercase tracking-widest mb-3 ${theme === 'dark' ? 'border-dark-accent/30 bg-dark-accent/10 text-dark-accent' : 'border-[#B07552]/30 bg-[#B07552]/5 text-[#B07552]'}`}>
                    <Sparkles size={12} /><span>The Solution Stack</span>
                </div>
                <h2 className={`text-2xl md:text-5xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-[#2D241E]'}`}>
                    Problems, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B07552] to-[#8A5A35]">Solved.</span>
                </h2>
                <p className={`text-sm md:text-lg max-w-xl mx-auto mb-3 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-[#5D5046]'}`}>
                    {isMobile ? 'Swipe to explore solutions.' : 'Scroll to explore how our AI tackles your challenges.'}
                </p>
                <div className={`animate-bounce text-[#B07552]/50 ${isMobile ? 'hidden' : ''}`}>
                    <MousePointer2 size={20} className="mx-auto" />
                </div>
            </div>

            {/* Mobile: Swipe Carousel - Always rendered, hidden via CSS */}
            <div className={`relative pb-8 ${isMobile ? '' : 'hidden'}`}>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
                    {challenges.map((challenge, index) => (
                        <MobileCard key={`mobile-${index}`} challenge={challenge} index={index} total={challenges.length} theme={theme} />
                    ))}
                </div>
            </div>

            {/* Desktop: GSAP Stack - Always rendered, hidden via CSS */}
            <div ref={triggerRef} className={`relative h-screen w-full ${isMobile ? 'hidden' : ''} ${theme === 'dark' ? 'bg-dark-bg' : 'bg-[#FDFBF7]'}`}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] ${theme === 'dark' ? 'bg-dark-accent/10' : 'bg-[#B07552]/10'}`} />
                </div>
                <div className="relative w-full h-full max-w-7xl mx-auto">
                    {challenges.map((challenge, index) => (
                        <DesktopCard key={`desktop-${index}`} challenge={challenge} index={index} total={challenges.length} theme={theme} />
                    ))}
                </div>
            </div>

            <div className={`h-8 md:h-[10vh] ${theme === 'dark' ? 'bg-dark-bg' : 'bg-[#FDFBF7]'}`} />
        </section>
    );
};

export default CommonChallenges;
