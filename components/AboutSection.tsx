"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { getSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";

const disciplines = [
  "Musculación",
  "Alto Rendimiento",
  "Coaching Mental",
  "Artes Marciales",
  "Entrenamiento Personalizado",
  "Nutrición Deportiva",
];

const certifications = [
  "Entrenador Personal Certificado",
  "Especialista en Hipertrofia",
  "Nutrición Deportiva",
  "Coaching Integral",
  "Artes Marciales – Cinturón Negro",
  "Alto Rendimiento Deportivo",
];

const stats = [
  { value: "500+", label: "Atletas", sub: "transformados" },
  { value: "5+", label: "Años", sub: "de experiencia" },
  { value: "6", label: "Disciplinas", sub: "dominadas" },
  { value: "98%", label: "Satisfacción", sub: "de clientes" },
];

const galleryImages = [
  {
    category: "Fuerza",
    title: "Entrenamiento de Poder",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    category: "Combate",
    title: "Disciplina y Control",
    url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
  },
  {
    category: "Mindset",
    title: "Alto Rendimiento",
    url: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80",
  },
];

function spring(delay = 0) {
  return {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    delay,
  };
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useInView(sectionRef, { once: true, margin: "-100px" });

  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadAboutSettings() {
      try {
        const loaded = await getSettings();
        setSettings(loaded);
      } catch (err) {
        console.error(err);
      }
    }
    loadAboutSettings();
  }, []);

  const bioImage = settings?.aboutImage || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80";
  const bioTitle = settings?.aboutTitle || "No soy solo un entrenador.";
  const bioText = settings?.aboutBio || "Soy Nahuel, especialista en musculación, coaching integral y artes marciales. Mi metodología combina ciencia del ejercicio, nutrición precisa y mentalidad de alto rendimiento para crear transformaciones reales y sostenibles.";

  const titleWords = bioTitle.split(" ");
  const lastWord = titleWords.pop() || "";
  const initialText = titleWords.join(" ");

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="relative pt-28 pb-44 lg:pt-36 lg:pb-56 overflow-hidden"
      style={{ background: "#050509" }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,102,255,0.25), rgba(0,204,255,0.25), transparent)",
        }}
      />

      {/* Ghost background number for depth */}
      <div
        className="absolute -top-4 right-0 font-black leading-none tracking-tighter select-none pointer-events-none text-white/[0.018]"
        style={{ fontSize: "clamp(10rem, 32vw, 30rem)" }}
        aria-hidden="true"
      >
        500
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,102,255,0.04) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header — left-aligned, no center */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring()}
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase">
              Sobre mí
            </span>
          </div>
          <h2
            className="font-black tracking-tighter leading-[0.9] text-white max-w-3xl"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
          >
            {initialText}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF 20%, #00CCFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {lastWord}
            </span>
          </h2>
        </motion.div>

        {/* Main grid: asymmetric — image narrower, content wider */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 mb-28 lg:mb-40 main-grid">

          {/* Left: Portrait image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring(0.1)}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden mx-auto lg:mx-0"
              style={{ maxWidth: "300px", aspectRatio: "3/4" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-top"
                style={{
                  backgroundImage: `url('${bioImage}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/70 via-transparent to-transparent" />
              {/* Liquid glass border */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              />
            </div>

            {/* Floating accent card overlapping image */}
            <motion.div
              initial={{ opacity: 0, x: 16, y: -16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={spring(0.4)}
              className="glass-premium absolute -right-4 lg:-right-6 top-16"
              style={{ padding: "14px 18px", minWidth: "148px" }}
            >
              <div
                className="font-black tracking-tighter leading-none text-white mb-1"
                style={{ fontSize: "2.2rem" }}
              >
                5+
              </div>
              <div className="text-[#00CCFF] text-xs font-semibold tracking-wide">
                años
              </div>
              <div className="text-white/35 text-xs">transformando vidas</div>
            </motion.div>
          </motion.div>

          {/* Right: Editorial content */}
          <div className="flex flex-col gap-8 lg:gap-10 justify-center">

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={spring(0.15)}
              className="text-white/55 text-xl leading-relaxed font-light max-w-[50ch]"
            >
              {bioText}
            </motion.p>

            {/* Disciplines */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={spring(0.25)}
            >
              <p className="text-white/25 text-[10px] font-bold tracking-[0.38em] uppercase mb-4">
                Disciplinas
              </p>
              <div className="flex flex-wrap gap-2">
                {disciplines.map((d, i) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.25 + i * 0.05 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white/55 hover:text-white/90 transition-colors duration-300 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={spring(0.35)}
            >
              <p className="text-white/25 text-[10px] font-bold tracking-[0.38em] uppercase mb-4">
                Certificaciones
              </p>
              <div className="flex flex-col gap-2.5">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 + i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#0066FF] flex-shrink-0" />
                    <span className="text-white/55 text-sm">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Editorial Triple Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-28 about-gallery">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={spring(i * 0.08)}
              whileHover={{ scale: 1.015 }}
              className="group relative h-64 lg:h-80 overflow-hidden rounded-3xl cursor-default"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${img.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/90 via-[#050509]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.38em] uppercase block mb-1">
                  {img.category}
                </span>
                <h3 className="text-white font-black tracking-tight text-lg sm:text-xl leading-none">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats: editorial large numbers — no boxes, just type + thin divider */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={spring()}
          className="border-t border-white/5 pt-20 lg:pt-24 stats-block"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
                className={`flex flex-col ${i < stats.length - 1 ? "lg:border-r lg:border-white/5" : ""} lg:pr-8`}
              >
                <span
                  className="font-black tracking-tighter leading-none text-white mb-2"
                  style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
                >
                  {stat.value}
                </span>
                <span className="text-white/55 text-sm font-semibold">{stat.label}</span>
                <span className="text-white/25 text-xs mt-0.5">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
