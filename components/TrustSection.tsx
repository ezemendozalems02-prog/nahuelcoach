"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Dumbbell, Apple, Clock, Brain, LayoutGrid, MessageSquare } from "lucide-react";

interface Pillar {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const pillars: Pillar[] = [
  {
    title: "Entrenamiento",
    desc: "Rutinas estructuradas y dinámicas. Saber exactamente qué hacer en cada sesión sin improvisar.",
    icon: <Dumbbell size={18} />,
    color: "#0066FF"
  },
  {
    title: "Alimentación",
    desc: "Alimentación consciente y flexible. Aprender a comer rico, sano y balanceado sin restricciones extremas.",
    icon: <Apple size={18} />,
    color: "#10B981"
  },
  {
    title: "Hábitos",
    desc: " Checklist y organización diaria para construir rutinas atómicas duraderas e inquebrantables.",
    icon: <Clock size={18} />,
    color: "#00CCFF"
  },
  {
    title: "Mentalidad",
    desc: "Reprogramar tu identidad y tus creencias sobre el cuerpo. Romper saboteadores mentales.",
    icon: <Brain size={18} />,
    color: "#7B2FFF"
  },
  {
    title: "Estructura",
    desc: "Un sistema organizativo para tu semana. El orden absoluto reduce la fatiga y el estrés del día.",
    icon: <LayoutGrid size={18} />,
    color: "#F59E0B"
  },
  {
    title: "Seguimiento",
    desc: "Acompañamiento humano real directo. Ajustes rápidos del plan para que nunca te estanques.",
    icon: <MessageSquare size={18} />,
    color: "#EF4444"
  }
];

export default function TrustSection() {
  return (
    <section id="pilares" className="relative py-28 lg:py-40 bg-[#030307] overflow-hidden">
      {/* Top Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0066FF]/2 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header - Asymmetric Left Text, Right Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 bg-[#7B2FFF]/5 border border-[#7B2FFF]/15">
              <ShieldCheck size={12} className="text-[#b685ff]" />
              <span className="text-[#b685ff] text-[10px] font-bold tracking-[0.3em] uppercase">
                Metodología
              </span>
            </div>
            <h2 
              className="text-white font-black tracking-tight leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              No necesitás más info.<br />
              <span className="gradient-text">Necesitás dirección.</span>
            </h2>
            <p className="text-white/45 text-sm sm:text-base font-light leading-relaxed mt-5 max-w-[45ch]">
              Hoy en día sobran miles de rutinas, dietas estrictas y videos en redes sociales. El verdadero problema no es la falta de información, sino no saber qué aplicar a tu caso y cómo sostenerlo cuando la motivación inicial se desvanece.
            </p>
          </motion.div>

          {/* Highlight Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
            className="p-8 rounded-3xl border border-white/5 bg-[#09090f]/50 backdrop-blur-xl relative overflow-hidden"
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)"
            }}
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#0066FF] to-[#00CCFF]" />
            <h3 className="text-white font-black text-xl sm:text-2xl leading-snug tracking-tight mb-2 italic">
              “El verdadero poder no está en empezar. El verdadero poder está en sostener.”
            </h3>
            <p className="text-[#00CCFF] text-xs font-bold uppercase tracking-widest mt-1">
              — Nahuel Coach
            </p>
          </motion.div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.08 }}
              whileHover={{ scale: 1.015, borderColor: `${p.color}25` }}
              className="group p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#09090f]/40 backdrop-blur-md flex flex-col gap-5 transition-all duration-300"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 15px 35px rgba(0,0,0,0.4)"
              }}
            >
              {/* Icon Orb */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 border"
                style={{
                  background: `${p.color}08`,
                  borderColor: `${p.color}15`,
                  color: p.color
                }}
              >
                {p.icon}
              </div>

              <div>
                <h4 className="text-white font-extrabold text-lg leading-tight mb-2 group-hover:text-white transition-colors">
                  {p.title}
                </h4>
                <p className="text-white/45 text-xs sm:text-sm leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
