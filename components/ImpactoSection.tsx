"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { getPlans, getSettings } from "@/lib/data-service";
import { Plan } from "@/types/admin";
import {
  Zap,
  ArrowRight,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Play,
  Volume2,
  Maximize2,
  Shield,
  Clock,
  VolumeX,
} from "lucide-react";

function spring(delay = 0) {
  return {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    delay,
  };
}

export default function ImpactoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [whatsapp, setWhatsapp] = useState("5491100000000");

  useEffect(() => {
    async function loadPlansData() {
      try {
        const [loadedPlans, settings] = await Promise.all([
          getPlans(),
          getSettings()
        ]);
        setPlans(loadedPlans.filter(p => p.active).sort((a, b) => a.order - b.order));
        if (settings?.whatsappNumber) {
          setWhatsapp(settings.whatsappNumber);
        }
      } catch (err) {
        console.error("Failed to load plans in home", err);
      }
    }
    loadPlansData();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative bg-[#030307] overflow-hidden">
      
      {/* 1. SECCIÓN DE PROGRAMAS VIP (MOVIDA HACIA ARRIBA Y EXPANDIDA) */}
      <section 
        className="relative border-b border-white/5 bg-[#05050a] mentorias-vip-section"
        style={{
          paddingTop: "clamp(6rem, 8vw, 10rem)",
          paddingBottom: "clamp(8rem, 10vw, 13rem)",
        }}
      >
        
        {/* Top Hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,102,255,0.25), rgba(0,204,255,0.2), transparent)",
          }}
        />

        {/* Ambient Glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(123,47,255,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring()}
            className="text-center mb-20 lg:mb-24"
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
              style={{
                background: "rgba(0,102,255,0.06)",
                border: "1px solid rgba(0,102,255,0.18)",
              }}
            >
              <Sparkles size={12} className="text-[#00CCFF]" />
              <span className="text-[#00CCFF] text-[10px] font-bold tracking-[0.3em] uppercase">
                Opciones de Mentoría
              </span>
            </div>
            <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none">
              Planes de <span className="gradient-text">Mentoría VIP</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg font-light leading-relaxed mt-4 max-w-[55ch] mx-auto">
              Elegí el nivel de personalización y seguimiento que tu transformación física y mental exige.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {plans.map((prog, idx) => {
              const color = idx % 2 === 1 ? "#7B2FFF" : "#0066FF";
              const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
                `Hola! Quiero unirme al plan VIP: *${prog.name}*`
              )}`;

              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={spring(idx * 0.15)}
                  className="group relative rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col gap-6 lg:gap-8 cursor-default"
                  style={{
                    background: "rgba(10, 10, 15, 0.75)",
                    border: `1px solid rgba(255, 255, 255, ${idx === 1 ? 0.08 : 0.05})`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03), 0 0 40px ${prog.glow}`,
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Header info */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/5">
                    <div>
                      <span
                        className="text-xs font-black uppercase tracking-wider block mb-1"
                        style={{ color }}
                      >
                        {prog.name}
                      </span>
                      <p className="text-white/40 text-xs">{prog.tag}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl lg:text-4xl font-black text-white leading-none">
                        {prog.price}
                      </div>
                      <span className="text-white/35 text-[10px] uppercase tracking-wider">
                        / {prog.period}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    {prog.desc}
                  </p>

                  {/* Features List */}
                  <div className="flex flex-col gap-3.5 my-2 flex-1">
                    {prog.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex gap-3 items-start">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 size={14} style={{ color }} />
                        </div>
                        <span className="text-white/65 text-xs lg:text-sm font-light leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold text-sm transition-all duration-300 btn-primary shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)]"
                    >
                      Elegir {prog.name}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. SECCIÓN IMPACTO 1 A 1 (TOTALMENTE AISLADA ABAJO Y CON VSL VIDEO) */}
      <section 
        className="relative bg-black impacto-isolated-section"
        style={{
          paddingTop: "clamp(8rem, 10vw, 13rem)",
          paddingBottom: "clamp(8rem, 10vw, 13rem)",
        }}
      >
        
        {/* Glow orbs for VSL Area */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#0066FF]/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring()}
            >
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#0066FF]" />
                <span className="text-[#0066FF] text-[10px] font-bold tracking-[0.42em] uppercase">
                  Mentoría Élite Exclusiva
                </span>
                <div className="w-8 h-px bg-[#0066FF]" />
              </div>
              
              <h2 className="text-responsive-xl text-white font-black tracking-tight leading-none mb-6">
                Impacto <span className="gradient-text">1 a 1</span>
              </h2>

              <p className="text-white/60 text-lg lg:text-xl font-light leading-relaxed max-w-[52ch] mx-auto">
                No es un plan de entrenamiento genérico. Es una mentoría premium de élite 
                donde Nahuel trabaja <span className="text-white font-semibold">directamente con vos</span> para reconstruir tu físico, hábitos y mindset.
              </p>
            </motion.div>
          </div>

          {/* VSL VIDEO SALES LETTER (REPRODUCTOR INTERACTIVO ULTRA-PREMIUM) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring(0.1)}
            className="max-w-4xl mx-auto mb-20 lg:mb-24"
          >
            <div
              className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
                background: "rgba(10, 10, 15, 0.8)",
              }}
              onClick={togglePlay}
            >
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                src="https://assets.mixkit.co/videos/preview/mixkit-athlete-training-in-the-gym-34079-large.mp4"
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ opacity: isPlaying ? 1 : 0.4 }}
              />

              {/* Cover Overlay Thumbnail (Visible when not playing) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                  
                  {/* Glowing Pulsing Play Button */}
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 glow-blue text-white mb-6 hover:bg-[#0066FF] hover:border-[#00CCFF]/50 transition-colors duration-300"
                  >
                    <Play size={32} className="text-white fill-white translate-x-0.5" />
                  </motion.div>

                  <div className="px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                    Video de Presentación
                  </div>
                  
                  <h3 className="text-white font-black text-xl lg:text-3xl tracking-tight max-w-[28ch] leading-snug">
                    Descubrí el método exacto detrás de las transformaciones
                  </h3>
                  
                  <p className="text-white/40 text-xs lg:text-sm font-light mt-2">
                    Haz clic para reproducir el video explicativo (5 min)
                  </p>

                </div>
              )}

              {/* Custom Control Bar overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between gap-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/5"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                >
                  {isPlaying ? (
                    <div className="flex gap-1">
                      <div className="w-1 h-3.5 bg-white rounded-full animate-pulse" />
                      <div className="w-1 h-3.5 bg-white rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <Play size={14} className="fill-white" />
                  )}
                </button>

                {/* Progress bar mock */}
                <div className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#00CCFF] transition-all duration-300" 
                    style={{ width: isPlaying ? "42%" : "0%" }}
                  />
                </div>

                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <span>{isPlaying ? "02:18 / 05:42" : "00:00 / 05:42"}</span>
                  
                  {/* Mute button */}
                  <button 
                    onClick={toggleMute}
                    className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  {/* Maximize */}
                  <button 
                    onClick={handleMaximize}
                    className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FINAL PROLIJO Y CON LLAMADO A LA ACCION */}
          <div className="max-w-2xl mx-auto text-center border-t border-white/5 pt-16 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring()}
              className="flex flex-col gap-6 lg:gap-8 items-center"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/5 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase"
              >
                <Shield size={12} className="text-emerald-400" />
                Inscripciones Abiertas — Cupos Limitados por Mes
              </div>

              <h3 className="text-white font-black text-2xl lg:text-4xl tracking-tight leading-tight max-w-[20ch]">
                ¿Listo para forjar tu mejor versión física y mental?
              </h3>

              <p className="text-white/45 text-sm lg:text-base font-light leading-relaxed max-w-[50ch]">
                Agenda una sesión de evaluación gratuita directamente con Nahuel por WhatsApp. Evaluaremos tus metas, responderemos tus dudas y veremos si aplicas para la mentoría de élite.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    "Hola! Me gustaría agendar una evaluación gratuita para la mentoría de élite."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl text-white font-bold text-base transition-all duration-300 btn-primary shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)]"
                >
                  Aplicar a la Mentoría Exclusiva
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    "Hola! Tengo una consulta rápida sobre tus servicios de coaching."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl text-white/70 hover:text-white font-bold text-base transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <MessageCircle size={18} className="text-[#00CCFF]" />
                  Consulta rápida por WhatsApp
                </a>
              </div>

              {/* Trust highlights */}
              <div className="flex flex-wrap justify-center gap-6 mt-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <div className="flex items-center gap-2">
                  <Clock size={11} className="text-white/20" />
                  Videollamadas Semanales
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={11} className="text-white/20" />
                  Garantía de Resultados
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={11} className="text-white/20" />
                  Soporte 24/7 Directo
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
