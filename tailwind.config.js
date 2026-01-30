/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brown/Bronze Earthy Theme
                background: '#FDFBF7', // Warm Eggshell
                'background-alt': '#F7F5F0', // Slightly darker warm gray
                navbar: '#FDFBF7',

                // Text colors (dark for readability)
                primary: '#2D241E', // Dark Brown/Black
                secondary: '#5D5046', // Medium Brown
                muted: '#8C7E72', // Muted Brown-Gray

                // Primary Accent - Bronze/Copper (Replacing brand-green)
                'brand-green': {
                    50: '#FAF6F3',
                    100: '#F2E8DF',
                    200: '#E6D0C6',
                    300: '#D5B09D',
                    400: '#C48F71',
                    500: '#B07552', // Main Bronze
                    600: '#A97142', // Slightly richer for hover
                    700: '#8A5A35',
                    800: '#6E4629',
                    900: '#563621',
                },
                // Secondary Accent - Sand/Gold (Replacing brand-yellow)
                'brand-yellow': {
                    50: '#FDFBF5',
                    100: '#FAF5E6',
                    200: '#F3E9CD',
                    300: '#EBDCB3',
                    400: '#E0CC94',
                    500: '#D4BB75', // Main Sand/Gold
                    600: '#BFA45E',
                    700: '#9E8547',
                    800: '#7D6836',
                    900: '#614E29',
                },

                // Accent colors - Mapped to new palette
                'accent-green': '#B07552', // Bronze
                'accent-yellow': '#D4BB75', // Gold
                'dark-green': '#8A5A35',
                'dark-yellow': '#9E8547',

                // Button gradient colors - Mapped
                'green-bright': '#C48F71',
                'green-dark': '#B07552',
                'yellow-bright': '#E0CC94',
                'yellow-dark': '#D4BB75',
            },
            fontFamily: {
                sans: ['Raleway', 'system-ui', 'sans-serif'],
                body: ['Quicksand', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, rgba(169, 113, 66, 0.05) 0%, rgba(138, 90, 53, 0.05) 100%)',
                'card-gradient': 'linear-gradient(135deg, #FDFBF7 0%, #FAF6F3 100%)',
            },
            animation: {
                // Wave animations
                'wave-1': 'wave1 8s ease-in-out infinite',
                'wave-2': 'wave2 10s ease-in-out infinite 1s',
                'wave-3': 'wave3 12s ease-in-out infinite 2s',
                // Line animations
                'line-1': 'line1 7s ease-in-out infinite',
                'line-2': 'line2 9s ease-in-out infinite 1.5s',
                // Blob animations
                'blob-1': 'blob1 8s ease-in-out infinite',
                'blob-2': 'blob2 10s ease-in-out infinite 2s',
                'blob-3': 'blob3 9s ease-in-out infinite 1s',
                // Sparkle animations
                'sparkle-1': 'sparkle1 3s ease-in-out infinite',
                'sparkle-2': 'sparkle2 4s ease-in-out infinite 1s',
                'sparkle-3': 'sparkle3 5s ease-in-out infinite 2s',
                'sparkle-4': 'sparkle1 3.5s ease-in-out infinite 0.5s',
                'sparkle-5': 'sparkle4 4.5s ease-in-out infinite 1.5s',
                'sparkle-6': 'sparkle1 3.8s ease-in-out infinite 2.5s',
                'sparkle-7': 'sparkle3 5.5s ease-in-out infinite 3s',
                'sparkle-8': 'sparkle1 4.2s ease-in-out infinite 1.8s',
                'sparkle-mini-1': 'sparkleMini 3.2s ease-in-out infinite 0.8s',
                'sparkle-mini-2': 'sparkleMini 4.8s ease-in-out infinite 2.2s',
                // Optimized animations for performance
                'wave-slow': 'waveSlow 15s ease-in-out infinite',
                'wave-medium': 'waveMedium 12s ease-in-out infinite 2s',
                'blob-slow': 'blobSlow 20s ease-in-out infinite',
                'blob-medium': 'blobMedium 18s ease-in-out infinite 3s',
                'sparkle-slow': 'sparkleSlow 6s ease-in-out infinite',
                'sparkle-medium': 'sparkleMedium 5s ease-in-out infinite 1.5s',
                'sparkle-fast': 'sparkleFast 4s ease-in-out infinite 0.5s',
                // Float animation for hero images
                'float': 'float 4s ease-in-out infinite',
            },
            keyframes: {
                // Float keyframe for hero images
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                // Wave keyframes - use transform for GPU acceleration
                wave1: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                wave2: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                wave3: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                line1: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                line2: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                // Blob keyframes
                blob1: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
                    '50%': { transform: 'scale(1.1)', opacity: '0.3' },
                },
                blob2: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.15' },
                    '50%': { transform: 'scale(1.15)', opacity: '0.25' },
                },
                blob3: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.25' },
                    '50%': { transform: 'scale(1.12)', opacity: '0.35' },
                },
                // Sparkle keyframes
                sparkle1: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.3)' },
                },
                sparkle2: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.2)' },
                },
                sparkle3: {
                    '0%, 100%': { opacity: '0.5', transform: 'translateY(0)' },
                    '50%': { opacity: '1', transform: 'translateY(-8px)' },
                },
                sparkle4: {
                    '0%, 100%': { opacity: '0.3', transform: 'translateX(0)' },
                    '50%': { opacity: '0.7', transform: 'translateX(6px)' },
                },
                sparkleMini: {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '0.6' },
                },
                // Optimized keyframes for smooth performance
                waveSlow: {
                    '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                    '50%': { transform: 'translateY(15px) translateX(-10px)' },
                },
                waveMedium: {
                    '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                    '50%': { transform: 'translateY(-12px) translateX(8px)' },
                },
                blobSlow: {
                    '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.05) translate(10px, -10px)' },
                },
                blobMedium: {
                    '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.08) translate(-8px, 8px)' },
                },
                sparkleSlow: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.2)' },
                },
                sparkleMedium: {
                    '0%, 100%': { opacity: '0.25', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.15)' },
                },
                sparkleFast: {
                    '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
}
