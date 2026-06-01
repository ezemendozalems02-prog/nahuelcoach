import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import TransitionPhrase from "@/components/TransitionPhrase";
import ImpactoSection from "@/components/ImpactoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommunitySection from "@/components/CommunitySection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      {/* 1. INICIO / HERO */}
      <Hero />

      {/* 2. SOBRE MÍ */}
      <AboutSection />

      {/* 3. PLANES / PRODUCTOS DIGITALES */}
      <FeaturedPrograms />

      {/* 4. FRASE DE TRANSICIÓN */}
      <TransitionPhrase />

      {/* 5. ENTRENAMIENTO A DISTANCIA & 6. PLANES DE ASESORÍA & 7. COMPARATIVA */}
      <ImpactoSection />

      {/* 8. TESTIMONIOS */}
      <TestimonialsSection />

      {/* 9. COMUNIDAD GRATUITA DE WHATSAPP */}
      <CommunitySection />

      {/* 10. PREGUNTAS FRECUENTES (FAQ) */}
      <FAQSection />

      {/* 12. CTA FINAL */}
      <FinalCTA />
    </>
  );
}
