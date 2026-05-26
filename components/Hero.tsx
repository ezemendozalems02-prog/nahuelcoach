"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { getSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.2 + 0.04,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 204, 255, ${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function MarqueeStrip() {
  const items = [
    "Entrenamiento Premium",
    "Transformación Real",
    "Coaching 1 a 1",
    "Resultados Comprobados",
    "Alto Rendimiento",
    "Mentalidad de Campeón",
    "Entrenamiento Premium",
    "Transformación Real",
    "Coaching 1 a 1",
    "Resultados Comprobados",
    "Alto Rendimiento",
    "Mentalidad de Campeón",
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-3 z-20"
      style={{ background: "rgba(5,5,9,0.85)", backdropFilter: "blur(10px)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[10px] font-bold tracking-[0.35em] uppercase text-white/20 mx-8"
          >
            {item}
            <span className="ml-8 text-[#0066FF] text-sm leading-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const stats = [
  { value: "10 Años", label: "entrenando su cuerpo" },
  { value: "4+ Años", label: "coacheando personas" },
  { value: "98%", label: "tasa de éxito integral" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const textY = useTransform(scrollY, [0, 600], [0, 55]);

  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadHeroConfig() {
      try {
        const loadedSettings = await getSettings();
        setSettings(loadedSettings);
      } catch (err) {
        console.error(err);
      }
    }
    loadHeroConfig();
  }, []);

  const bgImg = "/hero_banner.png";

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#050509]">
      {/* Full-bleed background image */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url('${bgImg}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050509]/98 via-[#050509]/80 to-[#050509]/25" style={{ opacity: 0.8 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent to-[#050509]/55" />
      </motion.div>

      <ParticleCanvas />

      {/* Ambient glow — not neon, just subtle warm depth */}
      <div
        className="absolute top-1/4 left-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,102,255,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[100dvh] flex items-center pt-28 pb-24">
        <div className="w-full grid grid-cols-1 items-center gap-0">

          {/* Left: Text */}
          <motion.div style={{ y: textY }} className="max-w-4xl">
            
            {/* Dual upper text eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="flex flex-col gap-2 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-emerald-400" />
                <span className="text-emerald-400 text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-1.5">
                  ⚡ Método integral para transformar cuerpo, energía y hábitos
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#0066FF]" />
                <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-1.5">
                  💪 Entrená con estructura, aliméntate con claridad y sostené tu cambio
                </span>
              </div>
            </motion.div>

            {/* Massive headline - Transformá tu cuerpo. Recuperá tu energía. Volvé a confiar en vos. */}
            <div className="mb-6 flex flex-col gap-1 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.2 }}
                className="font-black tracking-tighter leading-[0.95] text-white"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
              >
                Transformá tu cuerpo.<br />
                <span className="gradient-text">Recuperá tu energía.</span><br />
                <span className="text-white">Volvé a confiar en vos.</span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.45 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 font-light max-w-3xl"
            >
              Impacto Fitness es un método de transformación integral para personas con poco tiempo que quieren dejar de improvisar, ordenar sus hábitos y construir un cuerpo más fuerte, liviano y funcional.
            </motion.p>

            {/* Authority Text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.55 }}
              className="text-white/45 text-sm sm:text-base leading-relaxed mb-8 font-light max-w-2xl border-l-2 border-[#0066FF] pl-4"
            >
              Te guío con entrenamiento, alimentación consciente, mentalidad y estructura para que puedas sostener el proceso más allá de la motivación inicial.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.65 }}
              className="flex flex-wrap gap-4 items-center mb-4"
            >
              <Link
                href="#recursos"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl btn-primary text-white font-bold text-sm shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] transition-all"
              >
                Ver planes
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              
              <Link
                href="#asesorias"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white/70 hover:text-white font-bold text-sm transition-colors duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                Quiero una asesoría personalizada
              </Link>
            </motion.div>

            {/* Microcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-white/25 text-xs font-semibold mb-12 tracking-wide"
            >
              ⚡ Elegí cómo querés empezar: con una rutina, un recurso digital o un proceso personalizado.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex gap-10 lg:gap-14 border-t border-white/5 pt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.85 + i * 0.08,
                  }}
                >
                  <div
                    className="font-black tracking-tighter leading-none text-white mb-1"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/35 text-xs font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/20 text-[9px] font-bold tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-white/20" />
        </motion.div>
      </motion.div>

      <MarqueeStrip />
    </section>
  );
}
