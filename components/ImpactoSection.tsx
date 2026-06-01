"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getSettings } from "@/lib/data-service";
import {
  Zap,
  ArrowRight,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Shield,
  Clock,
  Compass,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

function spring(delay = 0) {
  return {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    delay,
  };
}

export default function ImpactoSection() {
  const [whatsapp, setWhatsapp] = useState("541136361630");

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getSettings();
        if (settings?.whatsappNumber) {
          setWhatsapp(settings.whatsappNumber);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadSettings();
  }, []);

  const whatsappMentoriaMsg = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hola Nahuel! Me interesa postularme para la *Mentoría Impacto Fitness* de 12 semanas. Me gustaría coordinar una entrevista de diagnóstico."
  )}`;

  const whatsappBaseMsg = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hola Nahuel! Quiero unirme al plan de asesoría mensual *Impacto Base* de $70.000 ARS."
  )}`;

  const whatsappVitalMsg = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hola Nahuel! Quiero sumarme al acompañamiento intensivo *Impacto Vital* de $250.000 ARS."
  )}`;

  return (
    <div className="relative bg-[#030307] overflow-hidden">
      
      {/* 5. ENTRENAMIENTO A DISTANCIA */}
      <section 
        id="entrenamiento-a-distancia"
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#00CCFF]/3 blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Context copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={spring()}
              className="flex flex-col gap-6 lg:gap-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full self-start bg-[#0066FF]/5 border border-[#0066FF]/15">
                <Compass size={12} className="text-[#00CCFF] animate-pulse" />
                <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.25em] uppercase">
                  Acompañamiento Remoto
                </span>
              </div>

              <h2 className="font-black text-white leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                Entrenamiento<br />
                <span className="gradient-text">a distancia</span>
              </h2>

              <h3 className="text-[#00CCFF] font-extrabold text-xl lg:text-2xl leading-tight">
                “Quiero que entrenes con claridad, confianza y propósito.”
              </h3>

              <div className="flex flex-col gap-4 text-white/55 font-light text-base sm:text-lg leading-relaxed">
                <p>
                  ¿Sentís que ninguna rutina estándar se adapta realmente a tus horarios, lesiones o nivel actual? ¿Sos de los que empiezan con mucha motivación pero terminan abandonando a las pocas semanas por falta de guía real?
                </p>
                <p>
                  El **Entrenamiento a Distancia** está diseñado de forma quirúrgica para resolver esto. No es un simple PDF descargable; es un sistema dinámico y cercano donde Nahuel analiza tu punto de partida y te acompaña paso a paso para que logres un físico fuerte y hábitos sostenibles.
                </p>
              </div>

              <div className="w-16 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#00CCFF] rounded-full mt-2" />
            </motion.div>

            {/* Right Column: Key Pointers list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={spring(0.15)}
              className="p-8 sm:p-10 rounded-3xl border border-white/5 bg-[#09090f]/50 backdrop-blur-xl relative overflow-hidden"
              style={{
                boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)"
              }}
            >
              <h4 className="text-white font-extrabold text-lg sm:text-xl mb-6">
                Beneficios del acompañamiento:
              </h4>

              <div className="flex flex-col gap-4">
                {[
                  "Plan de entrenamiento 100% adaptado a tus objetivos físicos.",
                  "Diseño adecuado a tus horarios, espacio disponible y equipamiento.",
                  "Corrección técnica y ajustes semanales según tu progreso real.",
                  "Contacto directo y soporte ágil por WhatsApp.",
                  "Guía nutricional simple, consciente y fácil de sostener.",
                  "Seguimiento real de métricas, fatiga y descanso diario.",
                  "Integración de hábitos, mentalidad y liderazgo personal."
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 size={13} className="text-[#00CCFF]" />
                    </div>
                    <span className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-white/35 text-[11px] font-semibold uppercase tracking-wider mt-8 block border-t border-white/5 pt-4">
                ⚡ Elegí el plan que mejor se adapte a tu momento.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. PLANES DE ASESORÍA */}
      <section 
        id="asesorias"
        className="relative py-20 lg:py-28 bg-[#05050a]"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(123,47,255,0.03) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring()}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4 bg-[#7B2FFF]/5 border border-[#7B2FFF]/15">
                <Sparkles size={12} className="text-[#b685ff]" />
                <span className="text-[#b685ff] text-[10px] font-bold tracking-[0.3em] uppercase">
                  Coaching Premium
                </span>
              </div>
              <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none">
                Planes de <span className="gradient-text">Asesoría Integral</span>
              </h2>
              <p className="text-white/45 text-base sm:text-lg font-light leading-relaxed mt-4 max-w-[55ch] mx-auto">
                Llevá tu entrenamiento, nutrición y mentalidad al máximo nivel de personalización y acompañamiento técnico.
              </p>
            </motion.div>
          </div>

          {/* Grid de 3 Cards Premium */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto">
            
            {/* Plan 1: Impacto Base */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring(0.05)}
              className="group relative rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-white/5 bg-[#09090f]/70"
              style={{
                boxShadow: "0 20px 45px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              <div className="pb-5 border-b border-white/5 flex flex-col gap-2">
                <span className="text-[#0066FF] text-xs font-black uppercase tracking-wider block">
                  Impacto Base
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">$70.000</span>
                  <span className="text-white/45 text-[10px] uppercase font-bold tracking-wider">ARS / mes</span>
                </div>
                <p className="text-white/65 text-xs font-semibold leading-relaxed mt-1">
                  “Estructura y dirección personalizada para tu progreso”
                </p>
              </div>

              <div className="flex flex-col gap-3 my-2 flex-1">
                {[
                  "1 sesión de alineación inicial.",
                  "Rutina personalizada con videos.",
                  "Planificación de alimentación.",
                  "Corrección técnica de ejercicios.",
                  "Guía de entrenamiento + PDFs.",
                  "Organización inicial de hábitos."
                ].map((f, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 size={13} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href={whatsappBaseMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-white font-bold text-sm bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                >
                  Elegir Impacto Base
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Plan 2 Destacado: Impacto Vital */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring(0.15)}
              className="group relative rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-emerald-400/25 bg-[#09090f]/90"
              style={{
                boxShadow: "0 25px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 40px rgba(16,185,129,0.05)",
                transform: "scale(1.025)"
              }}
            >
              {/* Featured Badge */}
              <div className="absolute top-0 right-8 -translate-y-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 backdrop-blur-md">
                  <Sparkles size={8} className="fill-emerald-400" />
                  MÁS ELEGIDO
                </span>
              </div>

              <div className="pb-5 border-b border-white/5 flex flex-col gap-2">
                <span className="text-emerald-400 text-xs font-black uppercase tracking-wider block">
                  Impacto Vital
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">$250.000</span>
                  <span className="text-white/45 text-[10px] uppercase font-bold tracking-wider">ARS / pago único</span>
                </div>
                <p className="text-white/65 text-xs font-semibold leading-relaxed mt-1">
                  “Acompañamiento de 8 semanas para ordenar entrenamiento, alimentación y hábitos.”
                </p>
              </div>

              <div className="flex flex-col gap-3 my-2 flex-1">
                {[
                  "Programa grabado de 14 clases.",
                  "Sistema estructurado paso a paso.",
                  "2 sesiones individuales profundas.",
                  "Tareas diarias específicas.",
                  "Corrección técnica prioritaria.",
                  "Seguimiento diario por WhatsApp.",
                  "Recetarios saludables completos.",
                  "Ajustes constantes según progreso."
                ].map((f, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-xs sm:text-sm font-semibold leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href={whatsappVitalMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-white font-bold text-sm btn-primary shadow-[0_0_20px_rgba(0,102,255,0.25)]"
                >
                  Quiero Impacto Vital
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Plan 3: Mentoría Impacto Fitness */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring(0.25)}
              className="group relative rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-white/5 bg-[#09090f]/70"
              style={{
                boxShadow: "0 20px 45px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              <div className="pb-5 border-b border-white/5 flex flex-col gap-2">
                <span className="text-[#7B2FFF] text-xs font-black uppercase tracking-wider block">
                  Mentoría Impacto Fitness
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-white">Consultar Valor</span>
                </div>
                <p className="text-white/65 text-xs font-semibold leading-relaxed mt-1">
                  “Acompañamiento trimestral para reprogramar tu identidad”
                </p>
              </div>

              <p className="text-white/45 text-[11px] leading-relaxed font-light mb-2">
                Proceso intensivo de 12 semanas para transformar tu identidad física, trabajar las raíces de tu disciplina y potenciar todas las áreas de tu vida de forma integrada.
              </p>

              <div className="flex flex-col gap-2.5 flex-1 max-h-[220px] overflow-y-auto pr-1 select-none scrollbar-thin">
                {[
                  "Diagnóstico inicial completo de tus métricas.",
                  "12 semanas de acompañamiento prioritario.",
                  "1 sesión semanal 1 a 1 de check-in y feedback.",
                  "Plan de entrenamiento adaptado científicamente.",
                  "Guía nutricional estratégica y flexible.",
                  "Corrección técnica diaria de tus movimientos.",
                  "Organización y planificación de tu semana fit.",
                  "Trabajo de mentalidad e identidad.",
                  "Sistema antisabotaje & reprogramación mental.",
                  "Orden emocional y disciplina consciente.",
                  "Revisión y ajustes semanales del plan.",
                  "Acompañamiento humano sumamente cercano.",
                  "Entradas gratuitas a eventos presenciales."
                ].map((f, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 size={12} className="text-[#7B2FFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/60 text-xs leading-relaxed font-light">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                <a
                  href="https://calendly.com/fitcoach-nahuel/informacion-asesorias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-[#b685ff] border border-[#7B2FFF]/30 bg-[#7B2FFF]/5 hover:bg-[#7B2FFF]/10 transition-all font-bold text-sm"
                >
                  Aplicar a la mentoría
                  <ArrowUpRight size={14} />
                </a>
                <span className="text-[10px] text-white/30 text-center font-bold uppercase tracking-wider block">
                  ⚠️ Cupos limitados. Requiere entrevista.
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 7. COMPARATIVA */}
      <section 
        id="comparativa"
        className="relative py-20 lg:py-28"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#0066FF]/2 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring()}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                ¿Qué plan es <span className="gradient-text">para vos?</span>
              </h2>
              <p className="text-white/45 text-sm sm:text-base font-light mt-2 max-w-lg mx-auto">
                Evaluá tu situación y elegí el camino óptimo para tu momento y objetivo.
              </p>
            </motion.div>
          </div>

          {/* Comparativa Blocks */}
          <div className="flex flex-col gap-3 max-w-3xl mx-auto mb-12">
            {[
              {
                case: "Si querés empezar rápido y por tu cuenta:",
                solution: "Tu opción ideal es una rutina o guía digital (Rutina Express 30 Min, Guía de Alimentación o Pack Inicial). Son de pago único y auto-gestionables.",
                tagColor: "text-[#00CCFF] border-[#00CCFF]/25 bg-[#00CCFF]/5"
              },
              {
                case: "Si necesitás entrenamiento y hábitos adaptados a vos:",
                solution: "El plan mensual *Impacto Base* te brindará la estructura, las rutinas con videos y la planificación de alimentación que tu cuerpo necesita con seguimiento de Nahuel.",
                tagColor: "text-[#0066FF] border-[#0066FF]/25 bg-[#0066FF]/5"
              },
              {
                case: "Si querés seguimiento exhaustivo por 8 semanas:",
                solution: "*Impacto Vital* es perfecto para ordenar entrenamiento, alimentación y hábitos diario paso a paso con acompañamiento por WhatsApp y sesiones personales.",
                tagColor: "text-emerald-400 border-emerald-400/25 bg-emerald-400/5"
              },
              {
                case: "Si buscás transformación profunda de tu estilo de vida:",
                solution: "La *Mentoría Impacto Fitness* es un proceso trimestral de élite para reprogramar tu identidad, forjar disciplina consciente, trabajar las bases mentales y asistir a eventos.",
                tagColor: "text-[#b685ff] border-[#7B2FFF]/25 bg-[#7B2FFF]/5"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={spring(idx * 0.05)}
                className="p-5 rounded-2xl border border-white/5 bg-[#09090f]/40 backdrop-blur-md flex flex-col gap-2.5"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 5px 15px rgba(0,0,0,0.2)"
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${item.tagColor} self-start sm:self-center`}>
                    Caso
                  </span>
                  <p className="text-white font-extrabold text-sm sm:text-base leading-tight">
                    {item.case}
                  </p>
                </div>
                <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed pl-1 sm:pl-0">
                  {item.solution}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href="/rutinas"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white/55 hover:text-white border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all font-semibold text-sm"
            >
              Ver recursos digitales
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                "Hola Nahuel! Me gustaría charlar con vos por WhatsApp para que me asesores sobre qué plan se adapta mejor a mis objetivos."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white btn-primary transition-all font-bold text-sm"
            >
              <MessageCircle size={15} />
              Hablar por WhatsApp
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
