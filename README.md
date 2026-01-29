# Frostrek - Next Gen AI Solutions

Frostrek is a cutting-edge web application showcasing advanced AI solutions for businesses, featuring a modern, high-performance interface built with React, TypeScript, and GSAP.

## 🚀 Overview

This project represents the frontend interface for Frostrek, an AI agency specializing in:
- AI Agents & Copilots
- Voice AI Solutions
- Workflow Automation
- Data Intelligence & RAG Systems

The website is designed to be highly interactive, visually stunning, and responsive across all devices (Mobile/Desktop).

## ✨ Key Features

- **Interactive Hero Section:** Features a dynamic text rotation and a live "AI Engine" workflow diagram that adapts its layout for mobile (Tree View) vs desktop (Radial View).
- **AI Solutions Showcase:** A comprehensive, tabbed interface allowing users to explore different AI services with real-time interactive demos (Chat bubbles, Audio waveforms, etc.).
- **Smooth Animations:** Integrated **GSAP** and **Framer Motion** for award-winning scroll animations and element transitions.
- **Optimized Performance:** Uses **Lenis** for smooth inertia scrolling and optimized assets/animations for high Lighthouse scores.
- **Responsive Design:** Fully optimized layouts for smartphones, tablets, and large screens.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** 
  - [GSAP](https://gsap.com/) (ScrollTrigger, Flip)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/frostrek/Frostrek-Website.git
   cd Frostrek
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```bash
src/
├── components/
│   ├── home/           # Homepage-specific sections (Hero, Features, Showcase...)
│   ├── ui/             # Reusable UI components (Buttons, Cards, Effects)
│   └── layout/         # Layout components (Navbar, Footer)
├── pages/              # Main page views
├── utils/              # Helper functions and animation configs
├── App.tsx             # Main application entry
└── index.css           # Global styles and Tailwind imports
```

## 🤝 Contribution

This is a private repository for **Frostrek**.
1. Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
2. Commit your changes (`git commit -m 'Add amazing feature'`).
3. Push to the branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request.

## 📄 License

All rights reserved © 2026 Frostrek.
