"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Dumbbell,
  LineChart,
  Compass,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const pillars = [
  { icon: Brain, title: "Mentalidad de élite", desc: "Desarrollá la fortaleza mental que distingue a los campeones y transforma cada obstáculo en combustible.", color: "#7B2FFF", glow: "#7B2FFF" },
  { icon: Target, title: "Hábitos poderosos", desc: "Construí rutinas diarias que transformen tu vida de forma permanente y sostenible.", color: "#0066FF", glow: "#0066FF" },
  { icon: Compass, title: "Disciplina real", desc: "La disciplina constante y sistemática que convierte metas ambiciosas en resultados concretos.", color: "#00CCFF", glow: "#00CCFF" },
  { icon: LineChart, title: "Seguimiento preciso", desc: "Control semana a semana de cada métrica de tu progreso. Nada queda al azar.", color: "#0066FF", glow: "#0066FF" },
  { icon: Dumbbell, title: "Estrategia física", desc: "Plan de entrenamiento y nutrición 100% diseñado para tu cuerpo, objetivos y estilo de vida.", color: "#7B2FFF", glow: "#7B2FFF" },
  { icon: TrendingUp, title: "Evolución continua", desc: "Progresión constante hacia tu mejor versión, ajustada semana a semana con Nahuel.", color: "#00CCFF", glow: "#00CCFF" },
];

const steps = [
  { num: "01", title: "Aplicación", desc: "Completás el formulario de aplicación con tus objetivos, experiencia, disponibilidad y lo que querés lograr.", detail: "Sin compromiso. Gratis." },
  { num: "02", title: "Sesión de evaluación", desc: "Videollamada gratuita con Nahuel para conocerte, evaluar tu situación física y mental, y ver si somos el match perfecto.", detail: "30-45 minutos." },
  { num: "03", title: "Tu plan personalizado", desc: "Nahuel diseña tu programa de entrenamiento y nutrición 100% desde cero, hecho para vos y nadie más.", detail: "100% personalizado." },
  { num: "04", title: "Ejecución y resultados", desc: "Empezás a entrenar con soporte directo, videollamadas semanales, ajustes en tiempo real y seguimiento total.", detail: "Soporte ilimitado." },
];

const features = [
  { icon: Clock, label: "Videollamada semanal", desc: "Check-in semanal con Nahuel" },
  { icon: MessageCircle, label: "Soporte 24/7", desc: "WhatsApp directo con Nahuel" },
  { icon: Users, label: "100% personalizado", desc: "Plan exclusivo para vos" },
  { icon: Shield, label: "Resultados garantizados", desc: "O seguimos hasta lograrlo" },
  { icon: Zap, label: "Ajustes en tiempo real", desc: "Plan que evoluciona con vos" },
  { icon: Star, label: "Acceso VIP", desc: "Comunidad y recursos premium" },
];

const testimonials = [
  {
    name: "Marcos R.", result: "-18kg en 4 meses", avatar: "M",
    text: "Nahuel cambió mi vida completamente. No es solo un entrenador, es un mentor que está con vos en cada paso. La metodología del Impacto 1 a 1 es incomparable.",
    stars: 5,
  },
  {
    name: "Valentina S.", result: "Primera competencia fitness", avatar: "V",
    text: "Gracias al coaching personalizado pude prepararme para mi primera competencia y quedar en el top 3. Resultados increíbles que no creía posibles.",
    stars: 5,
  },
  {
    name: "Diego L.", result: "+12kg de músculo", avatar: "D",
    text: "En 6 meses logré lo que en 3 años solo no pude. El seguimiento semanal y la personalización total hacen toda la diferencia.",
    stars: 5,
  },
  {
    name: "Laura M.", result: "Cambio de hábitos permanente", avatar: "L",
    text: "Lo que más me sorprendió fue el trabajo mental. Nahuel va mucho más allá del físico y te transforma desde adentro.",
    stars: 5,
  },
];

const faqs = [
  { q: "¿Cuánto cuesta el Impacto 1 a 1?", a: "El precio varía según la duración y el tipo de programa. En la sesión de evaluación gratuita te contamos todo sin compromiso." },
  { q: "¿Cuánto tiempo dura el proceso?", a: "El mínimo recomendado es 8 semanas para resultados significativos. Los ciclos más comunes son 8, 12 o 16 semanas." },
  { q: "¿Puedo hacerlo desde casa o necesito ir al gym?", a: "Adaptamos el plan a tu situación. Gym, casa, viajes... el programa funciona en cualquier contexto." },
  { q: "¿Qué pasa si no veo resultados?", a: "Si seguís el plan al 100% y no ves resultados, seguimos trabajando sin costo adicional hasta que los veas." },
  { q: "¿Con qué frecuencia hablo con Nahuel?", a: "Al menos 1 videollamada semanal de seguimiento más soporte ilimitado por WhatsApp durante toda la semana." },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay },
  };
}

export default function ImpactoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* HERO — VSL + Copy */}
      <section className="relative bg-black pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,102,255,0.08)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-10">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#0066FF] text-[11px] font-bold tracking-[0.35em] uppercase mb-4 text-center"
          >
            Mentoría Personal — Impacto Fitness
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-black tracking-tight leading-none text-white text-center mb-8"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          >
            Impacto <span className="gradient-text">1 a 1</span>
          </motion.h1>

          {/* VSL Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative w-full rounded-2xl overflow-hidden border border-white/8 mb-10"
            style={{
              aspectRatio: "16/9",
              background: "linear-gradient(135deg, #0d0d18 0%, #0a0a14 100%)",
              boxShadow: "0 0 60px rgba(0,102,255,0.1), 0 30px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(0,102,255,0.15)",
                  border: "2px solid rgba(0,102,255,0.4)",
                  boxShadow: "0 0 40px rgba(0,102,255,0.25)",
                }}
              >
                <div
                  className="w-0 h-0 ml-1.5"
                  style={{
                    borderTop: "12px solid transparent",
                    borderBottom: "12px solid transparent",
                    borderLeft: "20px solid rgba(0,204,255,0.9)",
                  }}
                />
              </div>
              <span className="text-white/25 text-xs font-semibold tracking-[0.3em] uppercase">Video próximamente</span>
            </div>
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 border border-white/10">
              <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">VSL</span>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-5 text-white/65 text-base sm:text-lg leading-relaxed font-light"
          >
            <p>
              <span className="text-[#00CCFF] font-semibold">Impacto Fitness 1 a 1</span> es una mentoría personalizada para transformar tu cuerpo desde una raíz más profunda: identidad, hábitos, mentalidad y energía.
            </p>
            <p>
              No se trata solo de entrenar más o comer mejor. Se trata de dejar de operar desde la versión que se abandona, se posterga o pierde dirección, y empezar a construir una estructura interna que puedas sostener en tu vida real.
            </p>
            <p>
              Durante el proceso trabajamos tu entrenamiento, alimentación, organización, disciplina, autoimagen y patrones de comportamiento para que puedas verte mejor, sentirte con más energía y volver a confiar en vos.
            </p>
            <p className="border-l-2 border-[#0066FF]/50 pl-4 text-white/50 italic">
              Si sentís que ya intentaste muchas veces, pero nunca lograste sostenerlo, este puede ser el camino para dejar de empezar de cero.
            </p>
            <p className="text-white/80 font-medium">
              Aplicá a la mentoría y veamos juntos si este proceso es para tu momento.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="https://wa.me/541136361630"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl btn-primary text-white font-bold text-base shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] transition-all duration-300"
            >
              Aplicar ahora
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/541136361630"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl btn-ghost font-semibold text-white/80 hover:text-white text-base"
            >
              <MessageCircle size={17} />
              Hablar por WhatsApp
            </a>
          </motion.div>

        </div>
      </section>

      {/* Features strip */}
      <section className="relative border-t border-b border-white/5 bg-[#050508] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center text-center gap-2.5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shadow-lg">
                    <Icon size={20} className="text-[#00CCFF]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs leading-none mb-1">{f.label}</div>
                    <div className="text-white/45 text-[10px] leading-normal">{f.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-36 lg:py-44 overflow-hidden bg-black">
        {/* Glow orbs for pillars */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#7B2FFF]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#0066FF]/5 blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-20 lg:mb-24">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
              style={{
                background: "rgba(0,102,255,0.06)",
                border: "1px solid rgba(0,102,255,0.18)",
              }}
            >
              <Sparkles size={12} className="text-[#00CCFF]" />
              <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.3em] uppercase">Metodología Nahuel Coach</span>
            </div>
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none">
              Los <span className="gradient-text">6 Pilares</span> del Impacto
            </h2>
            <p className="text-white/45 text-base sm:text-lg font-light leading-relaxed mt-4 max-w-[50ch] mx-auto">
              Una estructura integral diseñada minuciosamente para garantizar tu éxito físico, mental y de hábitos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: i * 0.1,
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative rounded-3xl overflow-hidden p-8 hover:border-[#0066FF]/40 transition-all duration-500 cursor-default"
                  style={{
                    background: "rgba(10, 10, 15, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(15px)",
                  }}
                >
                  {/* Hover background glow container */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${p.color}0b 0%, transparent 70%)`
                    }}
                  />

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                    style={{
                      background: `${p.color}15`,
                      border: `1px solid ${p.color}28`,
                      boxShadow: `0 0 30px ${p.glow}12`
                    }}
                  >
                    <Icon size={24} style={{ color: p.color }} />
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#00CCFF] transition-colors duration-300">
                    {p.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Elegant divider */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 bg-black">
        <div 
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(0,102,255,0.15), rgba(255,255,255,0.05), transparent)"
          }}
        />
      </div>

      {/* How it works */}
      <section className="relative py-36 lg:py-44 overflow-hidden bg-[#030307]">
        {/* Atmosphere decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#0066FF]/3 blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-20 lg:mb-24">
            <p className="text-[#0066FF] text-sm font-semibold tracking-[0.3em] uppercase mb-4">El Camino</p>
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none">
              ¿Cómo <span className="gradient-text">funciona</span> el proceso?
            </h2>
            <p className="text-white/45 text-base sm:text-lg font-light leading-relaxed mt-4 max-w-[50ch] mx-auto">
              Un recorrido paso a paso diseñado para llevarte de tu estado actual a tu máximo potencial físico y mental.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: i * 0.12,
                }}
                className="group relative rounded-3xl overflow-hidden p-8 flex flex-col gap-6 hover:border-[#0066FF]/40 transition-all duration-500"
                style={{
                  background: "rgba(255, 255, 255, 0.015)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
                }}
              >
                {/* Step hover background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(0,102,255,0.05) 0%, transparent 70%)"
                  }}
                />

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-5 z-10">
                    <ArrowRight size={18} className="text-[#0066FF]/35 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/25 flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.15)] group-hover:scale-105 transition-transform duration-500">
                  <span className="text-[#00CCFF] font-black text-xl">{step.num}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-bold text-lg group-hover:text-[#00CCFF] transition-colors duration-300">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/5">
                  <span className="text-[#00CCFF] text-xs font-semibold uppercase tracking-wider">{step.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant divider */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 bg-[#030307]">
        <div 
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(123,47,255,0.15), rgba(255,255,255,0.05), transparent)"
          }}
        />
      </div>

      {/* Testimonials */}
      <section className="relative py-36 lg:py-44 overflow-hidden bg-black">
        {/* Background glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/3 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-20 lg:mb-24">
            <p className="text-[#0066FF] text-sm font-semibold tracking-[0.3em] uppercase mb-4">Casos de Éxito</p>
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none">
              Historias <span className="gradient-text">reales</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg font-light leading-relaxed mt-4 max-w-[50ch] mx-auto">
              Resultados contundentes de personas reales que se comprometieron a transformar sus vidas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative rounded-3xl overflow-hidden p-8 flex flex-col gap-5 hover:border-[#0066FF]/40 transition-all duration-500 cursor-default"
                style={{
                  background: "rgba(10, 10, 15, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
                  backdropFilter: "blur(15px)",
                }}
              >
                {/* Glow container */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(0,102,255,0.04) 0%, transparent 70%)"
                  }}
                />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#7B2FFF] flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform duration-500">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-base leading-tight">{t.name}</div>
                    <div className="text-[#00CCFF] text-xs font-semibold mt-0.5">{t.result}</div>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed italic flex-1 font-light mt-2">
                  "{t.text}"
                </p>

                <div className="flex gap-1 mt-2">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant divider */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 bg-black">
        <div 
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(0,204,255,0.15), rgba(255,255,255,0.05), transparent)"
          }}
        />
      </div>

      {/* FAQ */}
      <section className="relative py-36 lg:py-44 overflow-hidden bg-[#030307]">
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#0066FF]/3 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-16 lg:mb-20">
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none">
              Preguntas <span className="gradient-text">frecuentes</span>
            </h2>
            <p className="text-white/45 text-sm sm:text-base font-light leading-relaxed mt-4">
              Despejá tus dudas sobre la mentoría premium de Impacto 1 a 1.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 lg:gap-5">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  openFaq === i 
                    ? "border-[#0066FF]/50 bg-[#0066FF]/5 shadow-[0_10px_30px_rgba(0,102,255,0.05)]" 
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className={`font-semibold text-sm sm:text-base transition-colors ${openFaq === i ? "text-[#00CCFF]" : "text-white/80 hover:text-white"}`}>
                    {f.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-[#00CCFF] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-white/30 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="h-px bg-white/5 mb-4" />
                    <p className="text-white/55 text-sm leading-relaxed font-light">{f.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant divider */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 bg-[#030307]">
        <div 
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(0,102,255,0.15), rgba(255,255,255,0.05), transparent)"
          }}
        />
      </div>

      {/* Final CTA */}
      <section className="relative py-36 lg:py-48 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(123,47,255,0.08)_0%,transparent_60%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0,204,255,0.06)",
                border: "1px solid rgba(0,204,255,0.18)",
              }}
            >
              <CheckCircle2 size={12} className="text-[#00CCFF]" />
              <span className="text-[#00CCFF] text-[10px] font-bold tracking-wider uppercase">Cupos VIP Limitados — Aplicación Requerida</span>
            </div>
            
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-tight mb-6">
              ¿Estás listo para tu <span className="gradient-text">transformación</span>?
            </h2>
            
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Aplicá ahora y agenda tu sesión de evaluación gratuita directamente con Nahuel. 
              Sin compromisos de ningún tipo. Solo para personas verdaderamente decididas a obtener resultados extraordinarios.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/541136361630"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-10 py-5 rounded-2xl btn-primary text-white font-bold text-lg shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] transition-all duration-300"
              >
                Aplicar ahora — Es gratis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
