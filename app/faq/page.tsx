"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, ArrowLeft, MessageCircle } from "lucide-react";

const categories = [
  {
    label: "Programas",
    faqs: [
      {
        q: "¿Cómo funcionan los programas?",
        a: "Al comprar un programa recibís por WhatsApp un PDF completo con tus rutinas semanales, videos de técnica, guía nutricional y todo el material incluido. Podés acceder desde cualquier dispositivo.",
      },
      {
        q: "¿Cómo recibo mi programa después de comprarlo?",
        a: "Una vez confirmado el pago por WhatsApp, recibís todo el material digital en 24-48 horas hábiles directamente en tu WhatsApp o email. El proceso es rápido y personalizado.",
      },
      {
        q: "¿Los programas son aptos para principiantes?",
        a: "Sí, contamos con programas para todos los niveles. El Plan Inicial y Full Body Power son perfectos para comenzar. Cada programa indica claramente el nivel recomendado.",
      },
      {
        q: "¿Puedo hacer los entrenamientos en casa?",
        a: "Varios programas incluyen versión para casa con o sin equipamiento. Te recomendamos especificarlo al momento de comprar para que el material sea adaptado a tu situación.",
      },
    ],
  },
  {
    label: "Pagos",
    faqs: [
      {
        q: "¿Cómo se realiza el pago?",
        a: "Los pagos se coordinan por WhatsApp. Aceptamos transferencia bancaria, Mercado Pago, PayPal y tarjetas de crédito/débito. Una vez confirmado el pago enviamos tu programa.",
      },
      {
        q: "¿Hay política de devolución?",
        a: "Si el material no es lo que esperabas o no cumple con lo descrito, lo analizamos caso a caso. Contactanos por WhatsApp dentro de los 7 días de la compra.",
      },
    ],
  },
  {
    label: "Coaching 1 a 1",
    faqs: [
      {
        q: "¿Hay seguimiento incluido en los programas?",
        a: "Los programas base incluyen soporte por WhatsApp. El Impacto 1 a 1 incluye seguimiento semanal personalizado, videollamadas con Nahuel y ajustes en tiempo real del plan.",
      },
      {
        q: "¿Qué diferencia al Impacto 1 a 1 de un programa?",
        a: "El Impacto 1 a 1 es mentoría personalizada directamente con Nahuel. Todo está diseñado 100% para vos, con videollamadas semanales, ajustes en tiempo real y soporte ilimitado.",
      },
      {
        q: "¿Cuánto tiempo lleva ver resultados?",
        a: "Los primeros cambios visibles aparecen entre las semanas 3-4. Resultados significativos entre los meses 2-3. Los resultados dependen de la constancia y adherencia al programa.",
      },
    ],
  },
];

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.06 }}
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: isOpen
            ? "rgba(13,13,26,0.9)"
            : "rgba(255,255,255,0.02)",
          border: isOpen
            ? "1px solid rgba(0,102,255,0.25)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: isOpen
            ? "inset 0 1px 0 rgba(255,255,255,0.05)"
            : "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        >
          <span
            className="font-semibold text-sm sm:text-base transition-colors duration-300"
            style={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)" }}
          >
            {q}
          </span>
          <div
            className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300"
            style={{
              background: isOpen
                ? "rgba(0,102,255,0.15)"
                : "rgba(255,255,255,0.04)",
              border: isOpen
                ? "1px solid rgba(0,102,255,0.3)"
                : "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {isOpen ? (
              <Minus size={12} className="text-[#0066FF]" />
            ) : (
              <Plus size={12} className="text-white/40" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div
                  className="h-px mb-4"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,102,255,0.3), rgba(0,204,255,0.2), transparent)",
                  }}
                />
                <p className="text-white/50 text-sm leading-relaxed">{a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="min-h-[100dvh] bg-[#050509]">

      {/* Ambient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(0,102,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-44 lg:pb-60">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white text-sm font-medium transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase">
              Preguntas frecuentes
            </span>
          </div>
          <h1
            className="font-black tracking-tighter leading-[0.9] text-white mb-5"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
          >
            Todo lo que{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF 20%, #00CCFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              necesitás saber.
            </span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-[48ch] leading-relaxed">
            Encontrá respuestas a las preguntas más comunes sobre programas,
            pagos y coaching personalizado.
          </p>
        </motion.div>

        {/* FAQ categories */}
        <div className="flex flex-col gap-14 lg:gap-16">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: catIdx * 0.05,
              }}
            >
              <p className="text-white/25 text-[10px] font-bold tracking-[0.38em] uppercase mb-6">
                {cat.label}
              </p>
              <div className="flex flex-col gap-2.5">
                {cat.faqs.map((faq, faqIdx) => {
                  const key = `${catIdx}-${faqIdx}`;
                  return (
                    <AccordionItem
                      key={key}
                      q={faq.q}
                      a={faq.a}
                      isOpen={openKey === key}
                      onToggle={() => toggle(key)}
                      index={faqIdx}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div>
            <p className="text-white/60 font-semibold mb-1">
              ¿No encontraste tu respuesta?
            </p>
            <p className="text-white/30 text-sm">
              Escribinos directamente y te respondemos a la brevedad.
            </p>
          </div>
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl btn-ghost text-sm font-semibold flex-shrink-0"
          >
            <MessageCircle size={15} />
            Consultar por WhatsApp
          </a>
        </motion.div>

      </div>
    </main>
  );
}
