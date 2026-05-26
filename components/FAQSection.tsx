"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Cómo funcionan los programas?",
    a: "Al comprar un programa recibirás por WhatsApp un PDF completo con tus rutinas semanales, videos de técnica, guía nutricional y todo el material incluido. Podés acceder desde cualquier dispositivo.",
  },
  {
    q: "¿Cómo recibo mi programa después de comprarlo?",
    a: "Una vez confirmado el pago por WhatsApp, recibirás todo el material digital en 24-48 horas hábiles directamente en tu WhatsApp o email. El proceso es rápido y personalizado.",
  },
  {
    q: "¿Cómo se realiza el pago?",
    a: "Los pagos se coordinan por WhatsApp. Aceptamos transferencia bancaria, Mercado Pago, PayPal y tarjetas de crédito/débito. Una vez confirmado el pago enviamos tu programa.",
  },
  {
    q: "¿Hay seguimiento incluido en los programas?",
    a: "Los programas base incluyen soporte por WhatsApp. El Impacto 1 a 1 incluye seguimiento semanal personalizado, videollamadas con Nahuel y ajustes en tiempo real del plan.",
  },
  {
    q: "¿Los programas son aptos para principiantes?",
    a: "Sí, contamos con programas para todos los niveles. El Plan Inicial y Full Body Power son perfectos para comenzar. Cada programa indica claramente el nivel recomendado.",
  },
  {
    q: "¿Puedo hacer los entrenamientos en casa?",
    a: "Varios programas incluyen versión para casa con o sin equipamiento. Te recomendamos especificarlo al momento de comprar para que el material sea adaptado a tu situación.",
  },
  {
    q: "¿Qué diferencia al Impacto 1 a 1 de un programa?",
    a: "El Impacto 1 a 1 es mentoría personalizada directamente con Nahuel. Todo está diseñado 100% para vos, con videollamadas semanales, ajustes en tiempo real y soporte ilimitado.",
  },
  {
    q: "¿Cuánto tiempo lleva ver resultados?",
    a: "Los primeros cambios visibles aparecen entre las semanas 3-4. Resultados significativos entre los meses 2-3. Los resultados dependen de la constancia y adherencia al programa.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 lg:py-44 overflow-hidden">
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
            Todo lo que{" "}
            <span className="gradient-text">necesitás saber</span>
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
                        <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
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
            href="https://wa.me/5491100000000"
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
