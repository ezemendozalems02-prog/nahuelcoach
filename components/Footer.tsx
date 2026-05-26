"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Zap, ArrowUpRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";

import { useState, useEffect } from "react";
import { getSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadFooterConfig() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadFooterConfig();
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const brand = settings?.brandName || "NAHUEL COACH";
  const brandParts = brand.split(" ");
  const brandFirst = brandParts[0] || "NAHUEL";
  const brandSecond = brandParts.slice(1).join(" ") || "COACH";

  const instagramLink = settings?.instagramUrl || "https://instagram.com/nahuelcoach";
  const youtubeLink = settings?.youtubeUrl || "https://youtube.com/nahuelcoach";
  const whatsappLink = settings?.whatsappNumber 
    ? `https://wa.me/${settings.whatsappNumber}` 
    : "https://wa.me/5491100000000";

  const dynamicSocials = [
    { icon: InstagramIcon, href: instagramLink, label: "Instagram", color: "#E1306C" },
    { icon: YoutubeIcon, href: youtubeLink, label: "YouTube", color: "#FF0000" },
    { icon: MessageCircle, href: whatsappLink, label: "WhatsApp", color: "#25D366" },
  ];

  return (
    <footer id="contacto" className="relative overflow-hidden bg-black border-t border-white/5">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#0066FF]/5 blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer */}
        <div className="py-14 lg:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#00CCFF] shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div>
                <span className="text-white font-black text-lg tracking-tight leading-none block uppercase">
                  {brandFirst} <span className="text-white/40">{brandSecond}</span>
                </span>
                <span className="gradient-text-cyan text-[10px] font-semibold tracking-[0.2em] uppercase leading-none block">
                  Impacto Fitness
                </span>
              </div>
            </Link>
            
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Nahuel Coach — Impacto Fitness. Entrenamiento, alimentación consciente, hábitos y transformación integral.
            </p>

            <div className="flex gap-2.5">
              {dynamicSocials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Menú</h4>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/" className="text-white/45 text-sm hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/#sobre-mi" className="text-white/45 text-sm hover:text-white transition-colors">
                Sobre mí
              </Link>
              <Link href="#asesorias" className="text-white/45 text-sm hover:text-white transition-colors">
                Planes
              </Link>
              <Link href="/rutinas" className="text-white/45 text-sm hover:text-white transition-colors">
                Tienda
              </Link>
              <Link href="#comunidad" className="text-white/45 text-sm hover:text-white transition-colors">
                Contenido gratuito
              </Link>
              <Link href="#contacto" className="text-white/45 text-sm hover:text-white transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-white/45 text-sm hover:text-white transition-colors"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                WhatsApp Directo
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-white/45 text-sm hover:text-white transition-colors"
              >
                <InstagramIcon size={15} className="text-[#E1306C]" />
                Instagram: @nahuelcoach
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            <div className="mt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-primary text-white text-xs font-bold"
              >
                Escribir ahora
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Nahuel Coach — Impacto Fitness. Todos los derechos reservados.
          </p>
          <p className="text-[#00CCFF] text-xs font-black tracking-widest uppercase">
            Cuerpo fuerte. Mente clara. Energía ordenada.
          </p>
        </div>
      </div>
    </footer>
  );
}
