"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { getSettings } from "@/lib/data-service";

export default function FinalCTA() {
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

  const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hola Nahuel! Me gustaría consultar por tus planes de asesoría y mentoría."
  )}`;

  const mentoriaLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hola Nahuel! Me gustaría postularme a la Mentoría Impacto Fitness trimestral y agendar una entrevista."
  )}`;

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden bg-black flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter grayscale contrast-125 brightness-50"
          style={{
            backgroundImage: "url('/mountain_flex.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030307] via-transparent to-[#030307]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Internal ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#7B2FFF]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#00CCFF] animate-pulse" />
              EL MOMENTO ES AHORA
            </span>
            <div className="w-8 h-px bg-[#0066FF]" />
          </div>

          {/* Headline */}
          <h2 
            className="font-black tracking-tighter text-white leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
          >
            Tu cambio no empieza cuando tengas más tiempo.<br />
            <span className="gradient-text">Empieza cuando dejás de postergarte.</span>
          </h2>

          {/* Body Copy */}
          <p className="text-white/45 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Podés empezar con una rutina. Podés ordenar tu alimentación con una guía. Podés aplicar a una mentoría completa. Pero no sigas esperando el momento perfecto.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center w-full mt-4">
            <Link
              href="/rutinas"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-white font-bold text-base transition-all duration-300 w-full sm:w-auto"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <ShoppingBag size={18} className="text-[#00CCFF]" />
              Comprar recursos digitales
            </Link>
            
            <a
              href={mentoriaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl btn-primary text-white font-bold text-base shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] transition-all duration-300 w-full sm:w-auto"
            >
              Aplicar a la mentoría
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 font-bold text-base transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle size={18} />
              Hablar por WhatsApp
            </a>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mt-4">
            Garantía de Compromiso · Nahuel Coach — Impacto Fitness
          </div>

        </motion.div>
      </div>
    </section>
  );
}
