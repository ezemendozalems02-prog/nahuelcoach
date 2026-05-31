"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Sparkles, CheckCircle2, Award, ShieldCheck } from "lucide-react";

const details = [
  "Más de 4 años acompañando personas en su proceso evolutivo.",
  "Experiencia comprobada en modalidades presencial y digital.",
  "Integración de entrenamiento, alimentación consciente, hábitos, mentalidad, energía y liderazgo personal.",
];

const certifications = [
  "Personal Trainer Internacional & Instructor en Musculación.",
  "Atleta de Calistenia & Especialista en entrenamiento corporal.",
  "Certificado en Nutrición Deportiva & Ciencias del alimento.",
  "Coach Personal especializado en gestión emocional y Programación Neurolingüística (PNL)."
];

const stats = [
  { value: "10 Años", label: "de disciplina propia", sub: "entrenamiento constante" },
  { value: "4+ Años", label: "coacheando atletas", sub: "metodología probada" },
  { value: "100%", label: "integral y digital", sub: "sostenible en el tiempo" },
  { value: "500+", label: "vidas transformadas", sub: "enfoque de identidad" },
];

const galleryImages = [
  {
    category: "Fuerza",
    title: "Entrenamiento de Poder",
    url: "/beach_flex.jpg",
  },
  {
    category: "Calistenia",
    title: "Dominio Corporal",
    url: "/handstand.png",
  },
  {
    category: "Mindset",
    title: "Liderazgo Personal",
    url: "/ice_bath.jpg",
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

  const bioImage = "/conference.jpg";

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="relative pt-28 pb-44 lg:pt-36 lg:pb-56 overflow-hidden bg-[#16161e]"
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
        className="absolute -top-4 right-0 font-black leading-none tracking-tighter select-none pointer-events-none text-white/[0.012]"
        style={{ fontSize: "clamp(10rem, 32vw, 30rem)" }}
        aria-hidden="true"
      >
        IMPACTO
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,102,255,0.03) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
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
              Conocé al Coach
            </span>
          </div>
          <h2
            className="font-semibold tracking-tight leading-snug text-white max-w-4xl"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
          >
            Soy Nahuel, coach de <span className="gradient-text">transformación física e integral.</span>
          </h2>
        </motion.div>

        {/* Main grid: asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 mb-28 lg:mb-40 main-grid">

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
              style={{ maxWidth: "340px", aspectRatio: "3/4" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-top"
                style={{
                  backgroundImage: `url('${bioImage}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/75 via-transparent to-transparent" />
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
              style={{ padding: "14px 18px", minWidth: "160px" }}
            >
              <div
                className="font-black tracking-tighter leading-none text-white mb-1"
                style={{ fontSize: "2.2rem" }}
              >
                10+
              </div>
              <div className="text-[#00CCFF] text-xs font-semibold tracking-wide">
                Años
              </div>
              <div className="text-white/45 text-[10px]">Entrenando su cuerpo</div>
            </motion.div>
          </motion.div>

          {/* Right: Editorial content */}
          <div className="flex flex-col gap-8 lg:gap-10 justify-center">

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={spring(0.15)}
              className="flex flex-col gap-5 text-white/65 text-sm sm:text-base leading-relaxed font-light max-w-[55ch]"
            >
              <p>
                Hace más de 4 años acompaño procesos de cambio real en sala de musculación y de forma digital, integrando entrenamiento, alimentación consciente, hábitos, mentalidad, energía y liderazgo personal.
              </p>
              <p>
                Soy <strong className="text-white font-semibold">Personal Trainer</strong>, <strong className="text-white font-semibold">Instructor en Musculación</strong>, atleta de calistenia, con formación en <strong className="text-white font-semibold">alimentación deportiva</strong>, ciencias del alimento, <strong className="text-white font-semibold">coaching personal</strong>, <strong className="text-white font-semibold">gestión emocional</strong> y <strong className="text-white font-semibold">PNL</strong>.
              </p>
              <p>
                <span className="text-[#00CCFF] font-semibold">Impacto Fitness</span> nace de mi propia transformación y de años de práctica acompañando a otras personas. Es un método integral para quienes no solo quieren mejorar su físico, sino también recuperar dirección, confianza y poder personal.
              </p>
              <p className="border-l-2 border-[#0066FF]/60 pl-4 text-white/50 italic">
                Mi enfoque no es darte una rutina más. Es ayudarte a construir una estructura física, mental y emocional que puedas sostener.
              </p>
            </motion.div>

            {/* Path description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={spring(0.25)}
            >
              <p className="text-white/25 text-[10px] font-bold tracking-[0.38em] uppercase mb-4">
                Mi Trayectoria Pointers
              </p>
              <div className="flex flex-col gap-3">
                {details.map((d, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 size={13} className="text-[#00CCFF]" />
                    </div>
                    <span className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                      {d}
                    </span>
                  </div>
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
                Formación & Certificaciones
              </p>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <Award size={14} className="text-[#7B2FFF]" />
                    </div>
                    <span className="text-white/60 text-xs sm:text-sm font-light">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Editorial Triple Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 lg:mb-32 about-gallery">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={spring(i * 0.08)}
              whileHover={{ scale: 1.015 }}
              className="group relative h-64 lg:h-80 overflow-hidden rounded-3xl cursor-default border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${img.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/95 via-[#050509]/30 to-transparent" />
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

        {/* Editorial Trust Quote Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring(0.1)}
          className="p-8 sm:p-12 rounded-3xl border border-white/5 bg-[#09090f]/50 backdrop-blur-xl relative overflow-hidden text-center max-w-4xl mx-auto mb-20 lg:mb-28"
          style={{
            boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)"
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent" />
          <h3 className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight mb-4 italic max-w-3xl mx-auto">
            “Porque transformar el cuerpo no se trata solo de estética.<br />Se trata de volver a confiar en vos.”
          </h3>
          <span className="text-white/25 text-[9px] font-bold tracking-[0.4em] uppercase block">
            — Nahuel Coach — Impacto Fitness
          </span>
        </motion.div>

        {/* Stats */}
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
