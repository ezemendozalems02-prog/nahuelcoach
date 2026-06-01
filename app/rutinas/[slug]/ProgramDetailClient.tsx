"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  BarChart2,
  CheckCircle2,
  Package,
  Users,
  TrendingUp,
  MessageCircle,
  ShoppingCart,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import type { Routine as Program } from "@/types/admin";
import { useCart } from "@/context/CartContext";

const levelStyle: Record<string, string> = {
  Principiante: "text-emerald-400",
  Intermedio: "text-yellow-400",
  Avanzado: "text-red-400",
  "Todos los niveles": "text-[#00CCFF]",
};

const testimonials = [
  { name: "Carlos M.", result: "Transformación total", text: "Este programa cambió mi vida. Nahuel es un crack, sabe lo que hace y los resultados lo demuestran.", avatar: "C" },
  { name: "Sofía R.", result: "-12kg en 10 semanas", text: "Increíble. Nunca pensé que podría lograrlo y acá estoy, más fuerte que nunca.", avatar: "S" },
  { name: "Mateo G.", result: "+8kg músculo", text: "El mejor programa que hice. La guía de nutrición sola vale todo el precio.", avatar: "M" },
];

const faqs = [
  { q: "¿Cuánto tiempo debo dedicar por semana?", a: "Entre 3 y 5 horas semanales dependiendo del programa. Cada sesión dura entre 45-70 minutos." },
  { q: "¿Necesito un gimnasio para hacerlo?", a: "La mayoría de programas tienen versión gym y versión casa. Te especificamos al enviarte el material." },
  { q: "¿Qué pasa si tengo dudas durante el programa?", a: "Todos los programas incluyen soporte por WhatsApp para resolver dudas sobre técnica, nutrición o el plan." },
];

export default function ProgramDetailClient({ program }: { program: Program }) {
  const { addItem } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Fallbacks for premium visual consistency
  const color = (program as any).color || "#0066FF";
  const category = (program as any).category || "Fitness";
  const desc = program.desc || "Entrenamiento premium diseñado para lograr resultados óptimos de forma sustentable.";
  const longDescription = (program as any).longDescription || desc;
  const benefits = program.benefits && program.benefits.length > 0
    ? program.benefits
    : ["Guía de entrenamiento estructurado paso a paso", "Soporte exclusivo por WhatsApp", "Acceso de por vida al material"];
  const includes = (program as any).includes || [
    "Rutina en PDF de alta calidad con videos demostrativos",
    "Calculadora de Macros personalizada",
    "Soporte prioritario por WhatsApp directo con Nahuel",
    "Guía de suplementación inteligente basada en evidencia"
  ];
  const forWho = (program as any).forWho || [
    "Personas decididas a transformar su físico de manera definitiva",
    "Quienes busquen entrenar con bases científicas y metodología probada",
    "Buscadores de disciplina, mentalidad de hierro y alto rendimiento"
  ];
  const expectedResults = (program as any).expectedResults || [
    "Aumento significativo de masa muscular y fuerza",
    "Reducción de porcentaje de grasa corporal manteniendo masa magra",
    "Mejora radical en niveles de energía diaria y foco mental",
    "Desarrollo de hábitos sostenibles a largo plazo"
  ];

  const whatsappMsg = encodeURIComponent(
    `Hola Nahuel! 👋\n\nQuiero comprar el programa: *${program.name}*\n\n💰 Precio: $${program.price.toLocaleString("es-AR")} ARS\n\nMi nombre:\nMi objetivo:`
  );

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${program.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${color}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-16">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/rutinas"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft size={16} />
              Volver a programas
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            {program.badge && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-sm bg-[#0066FF]/10 text-[#00CCFF] border-[#0066FF]/30">
                  <Star size={10} className="fill-current" />
                  {program.badge}
                </span>
              </div>
            )}
            <h1 className="text-responsive-xl text-white leading-tight mb-3">{program.name}</h1>
            <p className="text-[#00CCFF] text-xl font-medium mb-4">{program.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><Clock size={14} />{program.duration}</span>
              <span className="flex items-center gap-1.5">
                <BarChart2 size={14} />
                <span className={levelStyle[program.level]}>{program.level}</span>
              </span>
              <span className="flex items-center gap-1.5"><Package size={14} />{category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky purchase bar */}
      <div className="sticky top-[72px] z-40 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {program.originalPrice && (
              <span className="text-white/30 text-sm line-through">${program.originalPrice.toLocaleString("es-AR")}</span>
            )}
            <span className="text-2xl font-black gradient-text-blue">${program.price.toLocaleString("es-AR")} ARS</span>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/541136361630?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-ghost text-sm font-semibold"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => addItem(program)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-semibold"
            >
              <ShoppingCart size={16} />
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-3 gap-10">
        {/* Left: Main content */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SectionTitle icon={<TrendingUp size={18} />} title="Sobre este programa" />
            <p className="text-white/70 leading-relaxed">{longDescription}</p>
          </motion.section>

          {/* Benefits */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle icon={<CheckCircle2 size={18} />} title="Beneficios" />
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 p-3 rounded-xl glass-card hover:border-[#0066FF]/30 transition-all">
                  <CheckCircle2 size={16} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Includes */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle icon={<Package size={18} />} title="¿Qué incluye?" />
            <div className="grid sm:grid-cols-2 gap-2.5">
              {includes.map((item: string) => (
                <div key={item} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0066FF]/5 border border-[#0066FF]/15">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] flex-shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* For who */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <SectionTitle icon={<Users size={18} />} title="¿Para quién es?" />
            <div className="flex flex-col gap-2.5">
              {forWho.map((fw: string) => (
                <div key={fw} className="flex items-center gap-3 py-2.5 px-4 rounded-xl glass-card hover:border-[#00CCFF]/30 transition-all">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{fw}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expected results */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle icon={<TrendingUp size={18} />} title="Resultados esperados" />
            <div className="grid sm:grid-cols-2 gap-3">
              {expectedResults.map((r: string, i: number) => (
                <div key={r} className="flex items-center gap-3 p-4 rounded-xl border border-[#7B2FFF]/20 bg-[#7B2FFF]/5">
                  <span className="text-[#7B2FFF] font-black text-lg">0{i + 1}</span>
                  <span className="text-white/80 text-sm font-medium">{r}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <SectionTitle icon={<Star size={18} />} title="Testimonios" />
            <div className="grid sm:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div key={t.name} className="glass-card p-5 flex flex-col gap-3 hover:border-[#0066FF]/30 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex items-center justify-center text-white font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-[#00CCFF] text-xs">{t.result}</div>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed italic">"{t.text}"</p>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionTitle icon={<MessageCircle size={18} />} title="Preguntas frecuentes" />
            <div className="flex flex-col gap-2.5">
              {faqs.map((f, i) => (
                <div key={i} className={`rounded-2xl border overflow-hidden transition-all ${openFaq === i ? "border-[#0066FF]/30 bg-[#0066FF]/5" : "border-white/5 bg-white/[0.02]"}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  >
                    <span className={`font-medium text-sm transition-colors ${openFaq === i ? "text-white" : "text-white/70"}`}>{f.q}</span>
                    {openFaq === i ? <ChevronUp size={16} className="text-[#0066FF] flex-shrink-0" /> : <ChevronDown size={16} className="text-white/30 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <div className="h-px line-thin mb-3" />
                      <p className="text-white/60 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right: Purchase card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-[130px] glass-card p-6 flex flex-col gap-5"
          >
            <div className="text-center">
              {program.originalPrice && (
                <div className="text-white/30 text-sm line-through mb-1">${program.originalPrice.toLocaleString("es-AR")} ARS</div>
              )}
              <div className="text-4xl font-black gradient-text-blue mb-1">${program.price.toLocaleString("es-AR")}</div>
              <div className="text-white/40 text-sm">ARS — Pago único</div>
            </div>

            <div className="h-px line-thin" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} className="text-[#0066FF]" />
                Duración: {program.duration}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BarChart2 size={14} className="text-[#0066FF]" />
                <span className={levelStyle[program.level] + " text-sm"}>{program.level}</span>
              </div>
            </div>

            <div className="h-px line-thin" />

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => addItem(program)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl btn-primary text-white font-bold"
              >
                <ShoppingCart size={18} />
                Agregar al carrito
              </button>
              <a
                href={`https://wa.me/541136361630?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl btn-ghost font-semibold text-sm"
              >
                <MessageCircle size={16} />
                Comprar por WhatsApp
              </a>
            </div>

            <div className="space-y-2">
              {includes.slice(0, 4).map((inc: string) => (
                <div key={inc} className="flex items-center gap-2 text-white/50 text-xs">
                  <CheckCircle2 size={12} className="text-[#0066FF] flex-shrink-0" />
                  {inc}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <section className="relative py-28 lg:py-36 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            ¿Listo para comenzar con{" "}
            <span className="gradient-text">{program.name}?</span>
          </h2>
          <p className="text-white/50 mb-8">Transformá tu cuerpo hoy. Resultados reales, metodología comprobada.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => addItem(program)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-primary text-white font-bold"
            >
              <ShoppingCart size={18} />
              Agregar al carrito — ${program.price.toLocaleString("es-AR")} ARS
            </button>
            <a
              href={`https://wa.me/541136361630?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-ghost font-semibold"
            >
              <MessageCircle size={18} />
              Hablar con Nahuel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center text-[#0066FF]">
        {icon}
      </div>
      <h2 className="text-white font-bold text-xl">{title}</h2>
    </div>
  );
}
