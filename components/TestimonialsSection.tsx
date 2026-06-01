"use client";

import { motion } from "framer-motion";
import { Star, Quote, Camera } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  result: string;
  tag: string;
  text: string;
  avatar: string;
  photo?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos M.",
    role: "Emprendedor",
    result: "-12kg y mejor composición corporal",
    tag: "Cambio físico real",
    text: "Llegué sin constancia y sin claridad. Con el proceso pude ordenar mi entrenamiento, mejorar mi alimentación y volver a confiar en mí.",
    avatar: "CM",
    photo: "/testimonio_hombre2.jpg",
  },
  {
    name: "Sofía R.",
    role: "Diseñadora",
    result: "Más fuerza, más energía y disciplina real",
    tag: "Más energía",
    text: "El acompañamiento va mucho más allá de una rutina. Hoy entreno con una estructura que disfruto sostener y que se adapta a mi vida.",
    avatar: "SR",
    photo: "/testimonio_sofia.jpg",
  },
  {
    name: "Mateo G.",
    role: "Desarrollador",
    result: "-15kg en 3 meses de proceso",
    tag: "Recuperó confianza",
    text: "Pasé años improvisando y abandonando. El método me dio la estructura exacta que necesitaba para ser constante de verdad.",
    avatar: "MG",
    photo: "/testimonio_mujer.jpg",
  },
];

const tagColors: Record<string, string> = {
  "Cambio físico real": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Más energía": "text-[#00CCFF] bg-[#00CCFF]/10 border-[#00CCFF]/20",
  "Recuperó confianza": "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

function PhotoPlaceholder({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`relative aspect-[3/4] rounded-2xl overflow-hidden border ${
          accent
            ? "border-[#0066FF]/25 bg-gradient-to-b from-[#0066FF]/8 to-[#16161e]"
            : "border-white/8 bg-gradient-to-b from-white/5 to-[#16161e]"
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Camera size={22} className={accent ? "text-[#0066FF]/40" : "text-white/15"} />
          <span className={`text-[10px] font-bold tracking-widest uppercase ${accent ? "text-[#0066FF]/50" : "text-white/20"}`}>
            {label}
          </span>
        </div>
        {accent && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#00CCFF]" />
        )}
      </div>
      <span className={`text-center text-[10px] font-bold tracking-[0.3em] uppercase ${accent ? "text-[#00CCFF]/60" : "text-white/25"}`}>
        {label}
      </span>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative py-24 lg:py-36 bg-[#101018] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0066FF]/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7B2FFF]/2 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 bg-[#0066FF]/5 border border-[#0066FF]/15">
            <Star size={11} className="text-[#00CCFF] fill-[#00CCFF]" />
            <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.3em] uppercase">
              Resultados Reales
            </span>
          </div>
          <h2
            className="font-black tracking-tight leading-none text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Transformaciones <span className="gradient-text">que hablan</span>
          </h2>
          <p className="text-white/45 text-sm sm:text-base font-light leading-relaxed max-w-[48ch] mx-auto">
            Procesos reales de personas que decidieron dejar de improvisar y construir un cambio sostenible.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.08 }}
              className="flex flex-col gap-5 p-5 sm:p-6 rounded-3xl border border-white/6 bg-[#1a1a28]/70 backdrop-blur-xl relative overflow-hidden"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />

              {/* Before / After fotos */}
              <div className="grid grid-cols-2 gap-2.5">
                {t.photo ? (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/8">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url('${t.photo}')`,
                            backgroundPosition: "left center",
                            backgroundSize: "200% 100%",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <span className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-white/25">Antes</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#0066FF]/25">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url('${t.photo}')`,
                            backgroundPosition: "right center",
                            backgroundSize: "200% 100%",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#00CCFF]" />
                      </div>
                      <span className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-[#00CCFF]/60">Después</span>
                    </div>
                  </>
                ) : (
                  <>
                    <PhotoPlaceholder label="Antes" />
                    <PhotoPlaceholder label="Después" accent />
                  </>
                )}
              </div>

              {/* Tag de resultado */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase border ${tagColors[t.tag]}`}
                >
                  {t.tag}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={10} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Resultado principal */}
              <p className="text-white font-semibold text-sm leading-snug">
                {t.result}
              </p>

              {/* Quote */}
              <div className="relative">
                <Quote size={20} className="text-white/8 absolute -top-1 -left-1" />
                <p className="text-white/55 text-sm leading-relaxed italic pl-3 font-light">
                  "{t.text}"
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5 w-full" />

              {/* Avatar + nombre */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex items-center justify-center text-white font-extrabold text-xs shadow-[0_0_12px_rgba(0,102,255,0.3)] flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">{t.name}</h4>
                  <span className="text-white/30 text-xs">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA debajo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/25 text-xs font-semibold tracking-[0.3em] uppercase mt-12"
        >
          +200 personas ya transformaron su cuerpo y su mentalidad
        </motion.p>

      </div>
    </section>
  );
}
