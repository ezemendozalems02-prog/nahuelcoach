"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getSettings, getBanners } from "@/lib/data-service";
import { SiteSettings, Banner } from "@/types/admin";

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
  { value: "500+", label: "atletas transformados" },
  { value: "5+", label: "años de experiencia" },
  { value: "98%", label: "tasa de éxito" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const textY = useTransform(scrollY, [0, 600], [0, 55]);

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    async function loadHeroConfig() {
      try {
        const [loadedSettings, loadedBanners] = await Promise.all([
          getSettings(),
          getBanners()
        ]);
        setSettings(loadedSettings);
        setBanners(loadedBanners.filter(b => b.active).sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error(err);
      }
    }
    loadHeroConfig();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const intv = setInterval(() => {
      setCurrentIdx(p => (p + 1) % banners.length);
    }, 6000);
    return () => clearInterval(intv);
  }, [banners]);

  const hasBanners = banners.length > 0;
  const activeB = hasBanners ? banners[currentIdx] : null;

  const bgImg = activeB 
    ? activeB.imageDesktop 
    : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=85";

  const overlayOpacity = activeB ? activeB.overlayOpacity / 100 : 0.8;

  const heroTitle = activeB 
    ? activeB.title 
    : (settings?.heroTitle || "Tu mejor versión comienza hoy.");

  const heroSubtitle = activeB
    ? activeB.subtitle
    : (settings?.heroSubtitle || "Entrenamiento diseñado para transformar tu cuerpo, fortalecer tu mentalidad y construir hábitos que duran toda la vida.");

  const ctaText = activeB?.buttonText || settings?.heroCtaText || "Aplicar al coaching";
  const ctaLink = activeB?.buttonLink || "#mentorias";

  const titleWords = heroTitle.split(" ");

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#050509]/98 via-[#050509]/80 to-[#050509]/25" style={{ opacity: overlayOpacity }} />
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[100dvh] flex items-center pt-24 pb-20">
        <div className="w-full grid grid-cols-1 items-center gap-0">

          {/* Left: Text */}
          <motion.div style={{ y: textY }}>
            {/* Eyebrow line */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-px bg-[#0066FF]" />
              <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase">
                Coaching Premium · {settings?.brandName || "Argentina"}
              </span>
            </motion.div>

            {/* Massive headline — each line animates in from below */}
            <div className="mb-10 flex flex-wrap gap-x-3.5 gap-y-1 max-w-3xl">
              {titleWords.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 70,
                      damping: 18,
                      delay: 0.15 + i * 0.08,
                    }}
                  >
                    {i === Math.floor(titleWords.length / 2) ? (
                      <span
                        className="font-black tracking-tighter leading-[0.9] block"
                        style={{
                          fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                          background:
                            "linear-gradient(135deg, #0066FF 20%, #00CCFF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {word}
                      </span>
                    ) : (
                      <span
                        className="font-black tracking-tighter leading-[0.9] text-white block"
                        style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
                      >
                        {word}
                      </span>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.55,
              }}
              className="text-white/45 text-lg leading-relaxed mb-10 font-light max-w-[46ch]"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.65,
              }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link
                href={ctaLink}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl btn-primary text-white font-semibold text-sm"
              >
                {ctaText}
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/rutinas"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white/55 hover:text-white font-semibold text-sm transition-colors duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                Ver programas
              </Link>
            </motion.div>

            {/* Stats — editorial row, no icons, no boxes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
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
                    delay: 0.9 + i * 0.08,
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
        transition={{ delay: 1.6 }}
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
