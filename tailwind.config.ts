import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "black-soft": "#0a0a0f",
        "black-card": "#0d0d1a",
        "blue-electric": "#0066FF",
        "blue-deep": "#0044CC",
        "cyan-soft": "#00CCFF",
        "cyan-light": "#66E0FF",
        "violet-premium": "#7B2FFF",
        "violet-soft": "#9B5FFF",
        "white-clean": "#F8F9FF",
        "white-dim": "#AAAACC",
        "glow-blue": "#0066FF",
        "glow-cyan": "#00CCFF",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-premium":
          "linear-gradient(135deg, #0066FF 0%, #00CCFF 50%, #7B2FFF 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(0,102,255,0.1) 0%, rgba(0,204,255,0.05) 100%)",
        "gradient-hero":
          "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.95) 100%)",
        "gradient-blue-glow":
          "radial-gradient(ellipse at center, rgba(0,102,255,0.3) 0%, transparent 70%)",
        "gradient-cyan-glow":
          "radial-gradient(ellipse at center, rgba(0,204,255,0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(0,102,255,0.4), 0 0 60px rgba(0,102,255,0.15)",
        "glow-cyan": "0 0 30px rgba(0,204,255,0.3), 0 0 60px rgba(0,204,255,0.1)",
        "glow-violet": "0 0 30px rgba(123,47,255,0.4), 0 0 60px rgba(123,47,255,0.15)",
        "card-premium": "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,102,255,0.1)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,102,255,0.3), 0 0 40px rgba(0,102,255,0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "particle": "particle 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,102,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,102,255,0.6), 0 0 80px rgba(0,204,255,0.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) translateX(100px)", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
