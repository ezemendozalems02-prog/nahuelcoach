"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  ShoppingCart,
  Star,
  CheckCircle,
  Filter,
  Zap,
  Sparkles,
} from "lucide-react";
import { getRoutines } from "@/lib/data-service";
import { Routine as Program } from "@/types/admin";
import { useCart } from "@/context/CartContext";

const levelStyle: Record<string, string> = {
  Principiante: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  Intermedio: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  Avanzado: "text-red-400 border-red-400/20 bg-red-400/5",
  "Todos los niveles": "text-[#00CCFF] border-[#00CCFF]/20 bg-[#00CCFF]/5",
};

const badgeStyle: Record<string, string> = {
  "Más elegido": "bg-[#00CCFF]/10 text-[#00CCFF] border-[#00CCFF]/25 backdrop-blur-md",
  Premium: "bg-[#7B2FFF]/10 text-[#b685ff] border-[#7B2FFF]/25 backdrop-blur-md",
  Recomendado: "bg-[#0066FF]/10 text-[#66AAFF] border-[#0066FF]/25 backdrop-blur-md",
};

const categories = ["Todos", "Principiante", "Intermedio", "Avanzado", "Todos los niveles"];

export default function RutinasPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await getRoutines();
        setPrograms(data.filter(r => r.active).sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Failed to load routines in rutinas page", err);
      }
    }
    loadPrograms();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered =
    activeCategory === "Todos"
      ? programs
      : programs.filter((p) => p.level === activeCategory);

  return (
    <div className="min-h-screen bg-[#030307] text-white overflow-hidden pb-44 lg:pb-60">
      
      {/* 1. HERO BLOCK SUPERIOR (TIPO IMPACTO 1 A 1) */}
      <section className="relative min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=80')",
              transform: `translateY(${scrollY * 0.12}px) scale(${1 + scrollY * 0.0002})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030307]/95 via-[#030307]/80 to-[#030307]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030307]/40 via-transparent to-[#030307]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.05)_0%,transparent_60%)]" />
        </div>

        {/* Ambient glow orb behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0066FF]/10 blur-[130px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#0066FF]" />
              <span className="text-[#0066FF] text-[11px] font-bold tracking-[0.4em] uppercase flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#00CCFF] animate-pulse" />
                PROGRAMAS
              </span>
              <div className="w-8 h-px bg-[#0066FF]" />
            </div>

            {/* Title */}
            <h1
              className="font-black tracking-tighter leading-[0.95] text-white mb-6"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
            >
              Todos los{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0066FF 20%, #00CCFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                programas.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/45 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed mt-2">
              Encontrá el programa perfecto para tu objetivo. Cada programa está diseñado con ciencia, 
              experiencia real y seguimiento profesional para garantizar tu evolución.
            </p>
          </motion.div>
        </div>

        {/* Separator line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* Ambient background glows for the listing area */}
      <div className="relative">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#0066FF]/3 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#7B2FFF]/2 blur-[150px] pointer-events-none -z-10" />

        {/* 2. FILTROS SEPARADOS DENTRO DE BARRA DE CRISTAL ELEGANTE */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#090911]/60 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_15px_35px_rgba(0,0,0,0.6)]"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 0 30px rgba(0,102,255,0.02)"
            }}
          >
            <div className="flex items-center gap-2 text-white/40 flex-shrink-0">
              <Filter size={14} className="text-[#00CCFF]" />
              <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">Filtrar:</span>
            </div>
            
            {/* Scrollable Filters */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0 flex-1 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-[#0066FF]/15 border-[#0066FF]/35 text-white shadow-[0_0_20px_rgba(0,102,255,0.15)]"
                      : "bg-white/[0.02] border-transparent text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. GRILLA DE CARDS PRÉMIUM */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((program, i) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="h-full"
                >
                  <div className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-[#0066FF]/30 bg-[#09090f]/80 backdrop-blur-md transition-all duration-400 h-full shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(0,102,255,0.04)]">
                    
                    {/* Image block */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url('${program.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-[#09090f]/20 to-transparent" />
                      
                      {/* Badge Top Left */}
                      {program.badge && (
                        <div className="absolute top-3.5 left-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold tracking-wide uppercase ${badgeStyle[program.badge] ?? ""}`}>
                            <Star size={8} className="fill-current" />
                            {program.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Level Top Right */}
                      <div className="absolute top-3.5 right-3.5">
                        <span className={`px-2.5 py-1 rounded-full border text-[9px] font-bold tracking-wide uppercase ${levelStyle[program.level] ?? ""}`}>
                          {program.level}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-1 p-6 gap-4">
                      
                      {/* Meta information */}
                      <div className="flex items-center gap-2.5 text-[10px] text-white/35 font-semibold tracking-wider uppercase">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-[#00CCFF]" /> {program.duration}
                        </span>
                        <span className="text-white/15">•</span>
                        <span className="text-[#0066FF]">{(program as any).category || "Fitness"}</span>
                      </div>

                      {/* Header Titles */}
                      <div>
                        <h3 className="text-white font-extrabold text-lg leading-tight mb-1 group-hover:text-[#00CCFF] transition-colors duration-300">
                          {program.name}
                        </h3>
                        <p className="text-[#00CCFF] text-xs font-bold tracking-wide">
                          {program.subtitle}
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="text-white/45 text-xs leading-relaxed line-clamp-2">
                        {program.desc}
                      </p>

                      {/* Key benefits list */}
                      <ul className="space-y-2 my-1.5">
                        {program.benefits.slice(0, 2).map((b) => (
                          <li key={b} className="flex items-start gap-2 text-white/40 text-[11px] leading-relaxed">
                            <CheckCircle size={11} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pricing and Action row (Pushed to bottom) */}
                      <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                          {program.originalPrice && (
                            <span className="text-[10px] text-white/30 line-through leading-none mb-0.5">${program.originalPrice} USD</span>
                          )}
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xl font-black text-white leading-none">${program.price}</span>
                            <span className="text-[10px] text-white/40 font-bold tracking-wider ml-0.5">USD</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/rutinas/${program.slug}`}
                            className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 flex items-center justify-center"
                            title="Ver detalles"
                          >
                            <ArrowRight size={14} />
                          </Link>
                          <button
                            onClick={() => addItem(program)}
                            className="p-2.5 rounded-xl btn-primary text-white shadow-[0_4px_12px_rgba(0,102,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,102,255,0.45)] transition-all duration-300 flex items-center justify-center"
                            title="Añadir al carrito"
                          >
                            <ShoppingCart size={14} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}
