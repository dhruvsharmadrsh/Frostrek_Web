// Optimized pure CSS-animated background - minimal elements for smooth performance
// Uses GPU-accelerated transforms and reduced element count

const CuteBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Base gradient background - soft white to warm beige */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#FDFBF7] to-[#F3E9CD]/30" />

            {/* Flowing Wave Layers - SVG with CSS Animations */}
            <div className="absolute inset-0">
                <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    style={{ willChange: 'transform' }}
                >
                    <defs>
                        {/* Gradient definitions for waves */}
                        <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#B07552" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#8A5A35" stopOpacity="0.03" />
                        </linearGradient>
                        <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E6D0C6" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#B07552" stopOpacity="0.03" />
                        </linearGradient>
                    </defs>

                    {/* Wave Layer 1 */}
                    <path
                        className="animate-wave-slow"
                        d="M0,400 Q250,350 500,400 T1000,400 T1500,400 T2000,400 L2000,800 L0,800 Z"
                        fill="url(#wave-gradient-1)"
                    />

                    {/* Wave Layer 2 */}
                    <path
                        className="animate-wave-medium"
                        d="M0,300 Q300,250 600,300 T1200,300 T1800,300 T2400,300 L2400,800 L0,800 Z"
                        fill="url(#wave-gradient-2)"
                    />
                </svg>
            </div>

            {/* Soft gradient blobs - reduced to 2 for performance */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-[#E6D0C6]/20 rounded-full blur-[100px] animate-blob-slow"
                    style={{ willChange: 'transform' }}
                />
                <div
                    className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-[#F3E9CD]/30 rounded-full blur-[110px] animate-blob-medium"
                    style={{ willChange: 'transform' }}
                />
            </div>

            {/* Minimal sparkles - reduced from 10 to 4 */}
            <div className="absolute inset-0">
                <div className="absolute top-[18%] left-[15%] animate-sparkle-slow">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B07552]/40 shadow-sm shadow-[#B07552]/30" />
                </div>
                <div className="absolute top-[35%] right-[25%] animate-sparkle-medium">
                    <div className="w-1 h-1 rounded-full bg-[#8A5A35]/30" />
                </div>
                <div className="absolute bottom-[35%] left-[20%] animate-sparkle-fast">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B07552]/30" />
                </div>
                <div className="absolute bottom-[25%] right-[30%] animate-sparkle-slow">
                    <div className="w-1 h-1 rounded-full bg-[#8A5A35]/20" />
                </div>
            </div>
        </div>
    );
};

export default CuteBackground;
