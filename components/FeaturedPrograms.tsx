"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  BarChart2,
  ShoppingCart,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getRoutines } from "@/lib/data-service";
import { Routine as Program } from "@/types/admin";
import { useCart } from "@/context/CartContext";

const levelStyle: Record<string, string> = {
  Principiante: "text-emerald-400",
  Intermedio: "text-amber-400",
  Avanzado: "text-red-400",
  "Todos los niveles": "text-[#00CCFF]",
};

function PosterCard({
  program,
  onAddToCart,
  size = "normal",
  color = "#0066FF",
}: {
  program: Program;
  onAddToCart: () => void;
  size?: "hero" | "normal";
  color?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="group relative w-full h-full overflow-hidden rounded-3xl cursor-default"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-top transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${program.image}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/95 via-[#050509]/30 to-transparent" />
      {/* Color accent on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top, ${color}28 0%, transparent 60%)`,
        }}
      />

      {/* Badge */}
      {program.badge && (
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide text-[#00CCFF]"
            style={{
              background: "rgba(5,5,9,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {program.badge}
          </span>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <div className="flex items-center gap-4 text-[11px] text-white/35 mb-3">
          <span className="flex items-center gap-1.5">
            <Clock size={11} /> {program.duration}
          </span>
          <span
            className={`flex items-center gap-1.5 ${levelStyle[program.level] ?? "text-white/35"}`}
          >
            <BarChart2 size={11} /> {program.level}
          </span>
        </div>

        <h3
          className="font-black tracking-tighter leading-none text-white mb-1"
          style={{
            fontSize:
              size === "hero" ? "clamp(1.4rem, 2.5vw, 2rem)" : "1.2rem",
          }}
        >
          {program.name}
        </h3>
        <p className="text-[#00CCFF] text-xs font-semibold tracking-wide mb-4">
          {program.subtitle}
        </p>

        {/* Price + actions */}
        <div className="flex items-end justify-between">
          <div>
            {program.originalPrice && (
              <span className="text-white/22 text-xs line-through mr-1.5">
                ${program.originalPrice}
              </span>
            )}
            <span
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "1.6rem" }}
            >
              ${program.price}
            </span>
            <span className="text-white/30 text-xs ml-1">USD</span>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Link
              href={`/rutinas/${program.slug}`}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-white/65 hover:text-white transition-colors"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              Ver <ArrowUpRight size={11} />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white btn-primary"
            >
              <ShoppingCart size={11} />
              Agregar
            </button>
          </div>
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
        setPrograms(data.filter(r => r.active && r.featured).sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Failed to load routines in landing page", err);
      }
    }
    loadFeaturedRoutines();
  }, []);

  if (programs.length === 0) return null;

  const [mainProgram, ...restPrograms] = programs;

  return (
    <section
      className="relative py-32 lg:py-44 overflow-hidden featured-programs"
      style={{ background: "#09090f" }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,102,255,0.2), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,102,255,0.05) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header: left-aligned editorial */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#0066FF]" />
              <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase">
                Programas
              </span>
            </div>
            <h2
              className="font-black tracking-tighter leading-none text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              Rutinas{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0066FF 20%, #00CCFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                destacadas
              </span>
            </h2>
          </div>
          <Link
            href="/rutinas"
            className="group inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-semibold transition-colors duration-300 flex-shrink-0"
          >
            Ver todos los programas
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Asymmetric bento grid: large left + 2 stacked right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 lg:gap-5"
          style={{ minHeight: "580px" }}
        >
          {/* Main hero card — full height left */}
          {mainProgram && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="h-[400px] lg:h-full"
            >
              <PosterCard
                program={mainProgram}
                onAddToCart={() => addItem(mainProgram)}
                size="hero"
                color="#0066FF"
              />
            </motion.div>
          )}

          {/* Right column: 2 stacked cards */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {restPrograms.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: (i + 1) * 0.1,
                }}
                className="flex-1 min-h-[220px]"
              >
                <PosterCard
                  program={program}
                  onAddToCart={() => addItem(program)}
                  size="normal"
                  color={i % 2 === 0 ? "#7B2FFF" : "#0066FF"}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
