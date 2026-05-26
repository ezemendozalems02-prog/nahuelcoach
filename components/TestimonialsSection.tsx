"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  result: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendoza",
    role: "Emprendedor",
    result: "-12kg de grasa & más enfoque",
    text: "Empecé con el Pack Impacto Inicial y luego pasé al plan Vital. No solo logré bajar de peso y verme más marcado, sino que ordené mi alimentación diaria por completo. Nahuel me enseñó a comer de forma consciente sin renunciar a las comidas con amigos.",
    avatar: "CM",
  },
  {
    name: "Sofía Rinaldi",
    role: "Diseñadora UX",
    result: "Fuerza integral & disciplina diaria",
    text: "El acompañamiento de Nahuel va mucho más allá de una rutina física. Su enfoque en la disciplina consciente y el checklist de hábitos atómicos me ayudó a erradicar el cansancio diario. Hoy entreno con una estructura real que disfruto sostener.",
    avatar: "SR",
  },
  {
    name: "Mateo Galarza",
    role: "Desarrollador Software",
    result: "+6kg de masa muscular & energía",
    text: "Pasé años improvisando rutinas de gimnasio y dietas de internet que terminaba abandonando. La mentoría trimestral me dio el sistema exacto que necesitaba. Aumenté mi fuerza notablemente y reprogramé por completo mi mentalidad.",
    avatar: "MG",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative py-28 lg:py-40 bg-[#030307] overflow-hidden">
      {/* Top Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0066FF]/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7B2FFF]/2 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 bg-[#0066FF]/5 border border-[#0066FF]/15">
              <Star size={11} className="text-[#00CCFF] fill-[#00CCFF] animate-pulse" />
              <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.3em] uppercase">
                Resultados Reales
              </span>
            </div>
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none mb-4">
              Ellos ya iniciaron su <span className="gradient-text">cambio integral</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg font-light leading-relaxed max-w-[50ch] mx-auto">
              Descubrí cómo transformaron su físico, recuperaron su vitalidad y sostienen su evolución diaria con estructura y mentalidad.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(0,102,255,0.3)" }}
              className="flex flex-col gap-5 p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#09090f]/65 backdrop-blur-xl transition-all duration-300 relative"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-white/[0.03] pointer-events-none">
                <Quote size={48} />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/65 text-sm sm:text-base leading-relaxed italic flex-1 font-light">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="h-px bg-white/5 w-full my-1" />

              {/* User profile */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_15px_rgba(0,102,255,0.35)]">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm sm:text-base leading-tight">
                    {t.name}
                  </h4>
                  <div className="flex flex-wrap gap-x-2 text-[11px] font-semibold">
                    <span className="text-white/35">{t.role}</span>
                    <span className="text-white/15">•</span>
                    <span className="text-[#00CCFF]">{t.result}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
