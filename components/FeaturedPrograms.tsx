"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  BarChart2,
  ShoppingCart,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { getRoutines } from "@/lib/data-service";
import { Routine as Program } from "@/types/admin";
import { useCart } from "@/context/CartContext";

const levelStyle: Record<string, string> = {
  Principiante: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  Intermedio: "text-amber-400 border-amber-400/20 bg-amber-400/5",
  Avanzado: "text-red-400 border-red-400/20 bg-red-400/5",
  "Todos los niveles": "text-[#00CCFF] border-[#00CCFF]/20 bg-[#00CCFF]/5",
};

// Map each slug to a specific CTA button label
const ctaLabels: Record<string, string> = {
  "rutina-express-30-min": "Comprar rutina",
  "guia-alimentacion-consciente": "Quiero ordenar mi alimentación",
  "pack-impacto-inicial": "Empezar hoy",
  "recetario-impacto-fitness": "Comprar recetario",
};

function ProductCard({
  program,
  onAddToCart,
}: {
  program: Program;
  onAddToCart: () => void;
}) {
  const ctaText = ctaLabels[program.slug] || "Comprar recurso";
  const isExpressRoutine = program.slug === "rutina-express-30-min";

  return (
    <motion.div
      whileHover={{ y: -6, borderColor: "rgba(0, 102, 255, 0.3)" }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/5 bg-[#09090f]/75 backdrop-blur-xl h-full shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Product Image and badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${program.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-[#09090f]/20 to-transparent" />
        
        {/* Badge Top Left */}
        {program.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase bg-black/60 border border-white/10 text-[#00CCFF] backdrop-blur-sm">
              {program.badge}
            </span>
          </div>
        )}

        {/* Level Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wide uppercase ${levelStyle[program.level] ?? ""}`}>
            {program.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Meta details */}
        <div className="flex items-center gap-2 text-[10px] text-white/30 font-semibold tracking-widest uppercase">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-[#00CCFF]" /> {program.duration}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-white font-extrabold text-base leading-tight mb-1 group-hover:text-[#00CCFF] transition-colors duration-300">
            {program.name}
          </h3>
          <p className="text-white/45 text-xs font-light leading-relaxed min-h-[36px] line-clamp-2">
            {program.desc}
          </p>
        </div>

        {/* Inclusions */}
        <div className="flex flex-col gap-1.5 my-1">
          {program.benefits.slice(0, 5).map((benefit, idx) => (
            <div key={idx} className="flex gap-2 items-start text-[11px] text-white/50 leading-tight">
              <CheckCircle2 size={12} className="text-[#00CCFF] mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Pricing and Actions Row (aligned at the bottom) */}
        <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-white/20 text-xs">Precio sugerido</span>
            <div className="flex items-baseline gap-0.5">
              {program.originalPrice && (
                <span className="text-white/20 text-xs line-through mr-1.5">
                  ${program.originalPrice.toLocaleString("es-AR")}
                </span>
              )}
              <span className="text-xl font-black text-white">${program.price.toLocaleString("es-AR")}</span>
              <span className="text-[10px] text-white/40 font-bold ml-0.5">ARS</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white btn-primary shadow-[0_4px_12px_rgba(0,102,255,0.15)] transition-all"
            >
              <ShoppingCart size={13} />
              {ctaText}
            </button>
            <Link
              href={`/rutinas/${program.slug}`}
              className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-white/55 hover:text-white hover:bg-white/[0.05] transition-all flex items-center justify-center"
              title="Ver detalles"
            >
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Microcopy (e.g., Express Routine only) */}
          {isExpressRoutine && (
            <span className="text-[9px] text-white/25 text-center font-semibold block leading-tight">
              ⚡ Descarga inmediata + acceso al material de entrenamiento.
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    async function loadFeaturedRoutines() {
      try {
        const data = await getRoutines();
        // Render strictly the first 4 routines (the digital products)
        setPrograms(data.filter(r => r.active && r.featured).slice(0, 4));
      } catch (err) {
        console.error("Failed to load routines in landing page", err);
      }
    }
    loadFeaturedRoutines();
  }, []);

  if (programs.length === 0) return null;

  return (
    <section
      id="recursos"
      className="relative py-28 lg:py-36 overflow-hidden bg-[#09090f]"
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent"
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/2 blur-[150px] pointer-events-none -z-10"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="max-w-4xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase">
              Tienda Digital
            </span>
          </div>
          
          <h2
            className="font-black tracking-tighter leading-none text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Planes de <span className="gradient-text">entrenamiento</span>
          </h2>
          
          <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-4xl">
            Elegí el plan/recurso que mejor se adapte a tu momento y empezá a entrenar con más claridad, orden y dirección.
          </p>

          <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed mt-4 max-w-3xl border-l border-white/10 pl-3">
            Si querés empezar hoy sin complicarte, acá encontrás rutinas, ebooks, recetarios y guías prácticas para ordenar tu entrenamiento, alimentación y hábitos. Comprás online de forma simple y recibís el material para empezar a aplicar.
          </p>
        </div>

        {/* Grid de 4 columnas perfectamente proporcionado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="h-full">
              <ProductCard
                program={program}
                onAddToCart={() => addItem(program)}
              />
            </div>
          ))}
        </div>

        {/* Footer Link / View All */}
        <div className="mt-14 text-center">
          <Link
            href="/rutinas"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/30 hover:bg-[#0066FF]/10 text-white font-semibold text-sm transition-all duration-300"
          >
            Ver todos los recursos
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
