"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Sirve si tengo poco tiempo?",
    a: "Totalmente. El método está diseñado específicamente para personas ocupadas. La Rutina Express de 30 minutos te permite entrenar con alta eficiencia en cualquier momento del día, y los planes personalizados se adaptan a tu agenda real, no al revés.",
  },
  {
    q: "¿Necesito experiencia entrenando?",
    a: "No, para nada. Contamos con recursos diseñados paso a paso desde cero como el Pack Impacto Inicial, donde aprenderás la técnica correcta, y planes de asesoría 1 a 1 donde Nahuel corregirá cada uno de tus ejercicios por video para evitar lesiones.",
  },
  {
    q: "¿Tengo que hacer una dieta estricta?",
    a: "No. En Impacto Fitness creemos en la alimentación consciente y flexible. Te enseñamos a organizar tus platos basándote en alimentos nutritivos y a calcular porciones, pero sin prohibiciones extremas ni obsesiones para que puedas sostener el plan socialmente.",
  },
  {
    q: "¿Puedo comprar solo una rutina?",
    a: "Sí, claro. Podés empezar con un recurso digital e independiente como la Rutina Express 30 Min o el Recetario Impacto Fitness sin necesidad de contratar una asesoría mensual. Son de un solo pago y acceso de por vida.",
  },
  {
    q: "¿Cuál es la diferencia entre una rutina y la mentoría?",
    a: "Una rutina digital es un PDF estático auto-gestionable. La mentoría y asesoría personalizada (como Impacto Base o Vital) incluye seguimiento humano real, videollamadas con Nahuel, ajustes de cargas, retroalimentación técnica y un plan nutricional adaptado a tus métricas semanales.",
  },
  {
    q: "¿La mentoría es online?",
    a: "Sí, es 100% online y a distancia. Trabajamos mediante WhatsApp para correcciones técnicas rápidas de tus videos, videollamadas para check-ins semanales y una plataforma digital para tu rutina. Esto te permite entrenar a tus propios horarios desde cualquier parte del mundo.",
  },
  {
    q: "¿Qué pasa si ya intenté muchas veces y abandoné?",
    a: "La mayoría de las personas abandona porque dependen únicamente de la motivación. En Impacto Fitness te damos estructura, disciplina y un sistema de hábitos atómicos. Nos enfocamos en reprogramar tu identidad física para que el entrenamiento sea parte de quién sos, no una carga obligatoria.",
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute top-0 left-0 right-0 h-px line-thin" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#0066FF]/4 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-[#0066FF] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Preguntas Frecuentes
          </p>
          <h2 className="text-responsive-xl text-white leading-tight">
            Todo lo que <span className="gradient-text">necesitás saber</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-[#0066FF]/40 bg-[#0a0a0f] shadow-[0_0_30px_rgba(0,102,255,0.08)]"
                    : "border-white/5 bg-[#0d0d1a] hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span
                    className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
                      openIndex === i ? "text-white" : "text-white/70"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      openIndex === i
                        ? "bg-[#0066FF]/20 border border-[#0066FF]/40"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus size={14} className="text-[#0066FF]" />
                    ) : (
                      <Plus size={14} className="text-white/50" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                        <div className="h-px line-thin mb-4" />
                        <p className="text-white/65 text-sm leading-relaxed font-light">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm mb-4">
            ¿Tenés más preguntas? Escribinos directamente.
          </p>
          <a
            href="https://wa.me/541136361630"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-ghost text-sm font-semibold"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
