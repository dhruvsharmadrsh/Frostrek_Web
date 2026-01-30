import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        quote: "Frostrek has been a great partner for us across our technology and e-commerce work. The team is structured, easy to work with and focused on delivering quality results.",
        author: "Surendra Yadav",
        role: "Founder, Crescent Etail",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        company: "Crescent Etail"
    },
    {
        quote: "Through close collaboration and mentorship, I developed a clearer understanding of post-training methodologies and how AI models evolve. Exceptional learning experience.",
        author: "Shradha G",
        role: "Quality Lead, Frostrek LLP",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
        company: "Frostrek LLP"
    },
    {
        quote: "The experience helped me understand how teams collaborate effectively in an industry setting, manage projects, and maintain quality standards throughout.",
        author: "Ritika Jain",
        role: "Team Lead, Frostrek LLP",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
        company: "Frostrek LLP"
    },
    {
        quote: "Your product helped us to learn about our customers, intimately. The AI-driven insights transformed how we approach customer relationships.",
        author: "Arun Mehta",
        role: "Director of Digital Marketing",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        company: "TechNova Solutions"
    }
];

const ROTATION_INTERVAL = 4000; // 4 seconds per testimonial

const TestimonialsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Auto-rotation
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            goToNext();
        }, ROTATION_INTERVAL);

        return () => clearInterval(interval);
    }, [currentIndex, isPaused]);

    // Animate on index change
    const animateTransition = useCallback((direction: 'next' | 'prev') => {
        if (isAnimating || !cardRef.current || !imageRef.current) return;
        setIsAnimating(true);

        const xOffset = direction === 'next' ? 30 : -30;

        // Animate out
        gsap.to(cardRef.current, {
            opacity: 0,
            x: -xOffset,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                // Update index
                setCurrentIndex(prev =>
                    direction === 'next'
                        ? (prev + 1) % TESTIMONIALS.length
                        : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                );

                // Animate in from opposite side
                gsap.fromTo(cardRef.current,
                    { opacity: 0, x: xOffset },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                );

                // Animate image
                gsap.fromTo(imageRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
                );

                setTimeout(() => setIsAnimating(false), 400);
            }
        });

        gsap.to(imageRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in'
        });
    }, [isAnimating]);

    const goToNext = useCallback(() => {
        animateTransition('next');
    }, [animateTransition]);

    const goToPrev = useCallback(() => {
        animateTransition('prev');
    }, [animateTransition]);

    const goToIndex = useCallback((index: number) => {
        if (isAnimating || index === currentIndex) return;
        animateTransition(index > currentIndex ? 'next' : 'prev');
        // Force set the target index after animation
        setTimeout(() => setCurrentIndex(index), 350);
    }, [isAnimating, currentIndex, animateTransition]);

    // Initial scroll animation
    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    const current = TESTIMONIALS[currentIndex];

    return (
        <section
            ref={sectionRef}
            className="py-24 relative overflow-hidden bg-[#FDFBF7]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Decorative Elements - Bronze Theme */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#B07552]/20 opacity-60" />
            <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-[#E6D0C6] to-[#B07552] opacity-20" />
            <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-[#B07552]/20 opacity-50" />
            <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-[#B07552] to-amber-600 opacity-20" />
            <div className="absolute top-1/2 right-0 w-16 h-16 rounded-full bg-[#B07552] opacity-20 translate-x-1/2" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800">
                        Don't take our word for it. <br />
                        <span className="font-bold italic text-[#B07552]">Take theirs...</span>
                    </h2>
                </div>

                {/* Main Testimonial Display */}
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        {/* Image Side */}
                        <div
                            ref={imageRef}
                            className="relative flex-shrink-0"
                        >
                            {/* Decorative frame behind image */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#F3E9CD] to-[#E6D0C6] rounded-3xl transform rotate-3" />
                            <div className="absolute -inset-2 bg-gradient-to-br from-[#B07552]/30 to-[#8A5A35]/30 rounded-3xl transform -rotate-2 opacity-60" />

                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={current.image}
                                    alt={current.author}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#B07552]/40 to-transparent" />
                            </div>
                        </div>

                        {/* Content Side */}
                        <div
                            ref={cardRef}
                            className="flex-grow text-center md:text-left"
                        >
                            {/* Author Info */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-[#8A5A35]">{current.author}</h3>
                                <p className="text-sm text-gray-500">{current.role}</p>
                            </div>

                            {/* Quote */}
                            <div className="relative">
                                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-[#B07552] opacity-30" />
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                                    {current.quote}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-12">
                        {/* Prev Button */}
                        <button
                            onClick={goToPrev}
                            disabled={isAnimating}
                            className="w-10 h-10 rounded-full border-2 border-[#E6D0C6] flex items-center justify-center text-gray-500 hover:border-[#B07552] hover:text-[#B07552] transition-colors disabled:opacity-50"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {TESTIMONIALS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'bg-[#B07552] w-8'
                                        : 'bg-[#E6D0C6] hover:bg-[#B07552]/70'
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goToNext}
                            disabled={isAnimating}
                            className="w-10 h-10 rounded-full border-2 border-[#E6D0C6] flex items-center justify-center text-gray-500 hover:border-[#B07552] hover:text-[#B07552] transition-colors disabled:opacity-50"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-xs mx-auto mt-6">
                        <div className="h-1 bg-[#E6D0C6] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#B07552] to-[#8A5A35] transition-all duration-300"
                                style={{
                                    width: `${((currentIndex + 1) / TESTIMONIALS.length) * 100}%`
                                }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 text-center mt-2">
                            {currentIndex + 1} of {TESTIMONIALS.length}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
