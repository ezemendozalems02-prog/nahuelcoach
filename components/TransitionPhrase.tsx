"use client";

import { motion } from "framer-motion";

export default function TransitionPhrase() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 filter grayscale contrast-125"
          style={{
            backgroundImage: "url('/beach_flex.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030307] via-transparent to-[#030307]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Sutil bar */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#00CCFF] rounded-full mb-2" />
          
          <h2 
            className="font-black tracking-tight text-white leading-[1.1] max-w-3xl"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}
          >
            “Un cambio físico real también exige un cambio en tu{" "}
            <span className="gradient-text">identidad</span>, tus{" "}
            <span className="gradient-text-cyan">hábitos</span> y tu forma de sostenerte.”
          </h2>

          <div className="w-16 h-[2px] bg-gradient-to-r from-[#00CCFF] to-[#7B2FFF] rounded-full mt-2" />
        </motion.div>
      </div>
    </section>
  );
}
