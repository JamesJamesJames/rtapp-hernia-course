import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'zone-1': 'rgb(222, 184, 135)', // Lateral - tan/beige
        'zone-2': 'rgb(34, 139, 34)',   // Medial - green
        'zone-3': 'rgb(220, 20, 60)',   // High-risk - crimson red
        'iev': 'rgb(220, 53, 69)',      // Inferior epigastric vessels - red
        'vas': 'rgb(245, 245, 220)',    // Vas deferens - beige
        'spermatic': 'rgb(65, 105, 225)', // Spermatic vessels - royal blue
        'iliopubic': 'rgb(25, 25, 112)', // Iliopubic tract - dark blue
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
