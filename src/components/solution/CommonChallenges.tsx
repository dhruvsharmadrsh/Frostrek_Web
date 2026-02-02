import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Sparkles, Zap, CheckCircle2, MousePointer2 } from 'lucide-react';
import type { Challenge } from '../../utils/solutionData';

gsap.registerPlugin(ScrollTrigger);

interface CommonChallengesProps {
    challenges: Challenge[];
}

const IMAGES = [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
];

const ChallengeCard = ({ challenge, index, total }: { challenge: Challenge; index: number; total: number }) => {
    return (
        <div
            className="challenge-card absolute top-0 left-0 w-full h-full flex items-center justify-center p-2 md:p-4"
            style={{ zIndex: total - index }}
        >
            <div className="relative w-full max-w-6xl h-[75vh] bg-[#FDFBF7] rounded-[2rem] border border-[#B07552]/20 shadow-2xl overflow-hidden flex flex-col md:flex-row group">

                {/* Visual Side (Left) - Larger proportion */}
                <div className="relative h-2/5 md:h-full md:w-[45%] overflow-hidden flex flex-col text-white">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={IMAGES[index % IMAGES.length]}
                            alt={challenge.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B07552]/95 to-[#6E4629]/95" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-5 md:p-8">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-sm tracking-widest backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                0{index + 1} / 0{total}
                            </span>
                        </div>

                        {/* Challenge Title - Bigger */}
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                                {challenge.title}
                            </h3>
                            <div className="w-12 h-1 bg-white/50 rounded-full mb-4" />
                            <p className="text-white/90 leading-relaxed text-sm md:text-base font-medium max-w-md">
                                {challenge.description}
                            </p>
                        </div>

                        {/* Bottom Badge */}
                        <div className="mt-auto pt-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-semibold uppercase tracking-wider text-white">
                                <Zap size={14} className="text-[#E0CC94]" />
                                <span>The Challenge</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution Side (Right) - More content */}
                <div className="relative h-3/5 md:h-full md:w-[55%] p-5 md:p-8 flex flex-col bg-[#FDFBF7]">
                    {/* Decorative Background */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#B07552]/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E0CC94]/10 rounded-full blur-3xl" />
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#B07552_1px,transparent_1px)] [background-size:24px_24px]" />
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B07552] text-white shadow-lg shadow-[#B07552]/30">
                                <CheckCircle2 size={20} />
                            </span>
                            <span className="text-[#B07552] font-bold tracking-wide uppercase text-sm">AI Solution</span>
                        </div>

                        {/* Main Solution Text - Bigger */}
                        <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#2D241E] leading-snug mb-6">
                            {challenge.solvedBy}
                        </p>

                        {/* Feature Tags - Better Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {[
                                { label: 'Instant Deployment', desc: 'Go live in minutes' },
                                { label: 'AI-Powered', desc: 'Smart automation' },
                                { label: 'Enterprise Secure', desc: 'SOC2 compliant' },
                                { label: 'Real-time Insights', desc: 'Live dashboards' }
                            ].map((tag, i) => (
                                <div key={i} className="p-3 rounded-lg bg-white border border-[#E6D0C6] hover:border-[#B07552] hover:shadow-md transition-all group/tag">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-[#B07552]" />
                                        <span className="text-[#2D241E] font-semibold text-sm">{tag.label}</span>
                                    </div>
                                    <p className="text-[#8C7E72] text-xs pl-4">{tag.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="flex gap-6 mb-6 py-4 border-y border-[#E6D0C6]">
                            <div>
                                <p className="text-2xl font-bold text-[#B07552]">60%</p>
                                <p className="text-xs text-[#8C7E72]">Cost Reduction</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#B07552]">24/7</p>
                                <p className="text-xs text-[#8C7E72]">Availability</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#B07552]">&lt;1s</p>
                                <p className="text-xs text-[#8C7E72]">Response Time</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-auto flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B07552] text-white font-semibold text-sm hover:bg-[#8A5A35] transition-all shadow-lg hover:shadow-xl group/btn">
                                <span>Explore Solution</span>
                                <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CommonChallenges = ({ challenges }: CommonChallengesProps) => {
    const container = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!triggerRef.current || !container.current || challenges.length === 0) return;

        const cards = gsap.utils.toArray<HTMLElement>('.challenge-card');
        const count = cards.length;

        if (count === 0) return;

        // Set initial state - all cards visible, stacked
        gsap.set(cards, { yPercent: 0 });

        // Create timeline with scroll trigger
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${(count - 1) * 80}%`, // Slightly less scroll per card for smoother feel
                scrub: 0.5, // Faster response
                pin: true,
                anticipatePin: 1,
            }
        });

        // Simple stacking animation - move cards UP to reveal next card
        cards.forEach((card, i) => {
            if (i === count - 1) return; // Last card doesn't animate out

            timeline.to(card, {
                yPercent: -100 - (i * 5), // Move up and slightly more for each card
                scale: 0.95,
                ease: "none",
                duration: 1,
            }, i * 0.8);
        });

    }, { scope: container, dependencies: [challenges] });

    return (
        <section ref={container} className="relative bg-[#FDFBF7]">
            {/* Intro Section */}
            <div className="container mx-auto px-4 md:px-6 py-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B07552]/30 bg-[#B07552]/5 text-[#B07552] font-bold text-xs uppercase tracking-widest mb-4">
                    <Sparkles size={14} />
                    <span>The Solution Stack</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#2D241E] mb-4">
                    Problems, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B07552] to-[#8A5A35]">Solved.</span>
                </h2>
                <p className="text-lg md:text-xl text-[#5D5046] max-w-2xl mx-auto mb-4">
                    Scroll to explore how our AI tackles your biggest challenges.
                </p>
                <div className="animate-bounce text-[#B07552]/50">
                    <MousePointer2 size={24} className="mx-auto" />
                </div>
            </div>

            {/* Pinned Cards Section */}
            <div ref={triggerRef} className="relative h-screen w-full bg-[#FDFBF7]">
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B07552]/10 rounded-full blur-[100px]" />
                </div>

                {/* Cards */}
                <div className="relative w-full h-full max-w-7xl mx-auto">
                    {challenges.map((challenge, index) => (
                        <ChallengeCard
                            key={index}
                            challenge={challenge}
                            index={index}
                            total={challenges.length}
                        />
                    ))}
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[15vh] bg-[#FDFBF7]" />
        </section>
    );
};

export default CommonChallenges;
