"use client";

import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, Users, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getSettings } from "@/lib/data-service";

const benefits = [
  "Tips diarios de entrenamiento inteligente y efectivo.",
  "Consejos simples de alimentación consciente sin restricciones.",
  "Reflexiones semanales de mentalidad, disciplina y foco.",
  "Herramientas y guías prácticas para sostener tus hábitos.",
  "Motivación constante y desafíos grupales interactivos.",
  "Un entorno sano de personas que buscan su evolución personal.",
  "Acceso anticipado a recursos, rutinas, ebooks y nuevos lanzamientos."
];

export default function CommunitySection() {
  const [whatsapp, setWhatsapp] = useState("5491100000000");

  useEffect(() => {
    async function loadWhatsapp() {
      try {
        const settings = await getSettings();
        if (settings?.whatsappNumber) {
          setWhatsapp(settings.whatsappNumber);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadWhatsapp();
  }, []);

  const communityLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hola Nahuel! Quiero unirme gratis a la comunidad de WhatsApp de Impacto Fitness."
  )}`;

  return (
    <section id="comunidad" className="relative py-28 lg:py-40 bg-[#05050a] overflow-hidden">
      {/* Top Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Glow Orbs */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/3 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[#0066FF]/3 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div 
          className="rounded-3xl border border-white/5 p-8 sm:p-12 lg:p-16 overflow-hidden relative"
          style={{
            background: "rgba(10,10,15,0.7)",
            backdropFilter: "blur(30px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 30px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Subtle green ambient inside */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            
            {/* Left: Benefits Content */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-emerald-400/5 border border-emerald-400/15">
                  <Users size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 text-[10px] font-bold tracking-[0.25em] uppercase">
                    Comunidad Exclusiva
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                  Un entorno para <span className="text-emerald-400">potenciar y sostener</span> tu proceso
                </h2>
                
                <p className="text-white/45 text-sm sm:text-base leading-relaxed font-light">
                  Sumate a la comunidad gratuita de **Impacto Fitness**, un grupo privado de WhatsApp creado exclusivamente para personas decididas a transformar su físico, recuperar su energía y rodearse de un entorno que impulse su evolución constante.
                </p>
              </motion.div>

              {/* List of benefits */}
              <div className="flex flex-col gap-3">
                {benefits.map((b, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.05 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    </div>
                    <span className="text-white/65 text-xs sm:text-sm font-light leading-relaxed">
                      {b}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#050509]/80 flex flex-col gap-6 relative"
              style={{
                boxShadow: "0 20px 45px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              {/* WhatsApp Large Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-2 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <MessageCircle size={28} className="fill-emerald-400/5 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-white font-extrabold text-xl leading-tight mb-2">
                  Acceso Gratuito
                </h3>
                <p className="text-white/45 text-xs leading-relaxed font-light">
                  No necesitás pagar nada para formar parte. Entrá, recibí valor diario y empezá a rodearte de personas que, igual que vos, están construyendo su mejor versión.
                </p>
              </div>

              {/* Glowing CTA Button */}
              <a
                href={communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-white font-bold text-sm transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 8px 25px rgba(16,185,129,0.35)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Sumarme gratis a la comunidad
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <div className="flex justify-center items-center gap-1.5 text-[9px] font-bold text-white/30 uppercase tracking-widest">
                <Sparkles size={9} className="text-emerald-400 animate-pulse" />
                Cupos limitados por link de WhatsApp
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
