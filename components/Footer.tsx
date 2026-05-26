"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Zap, ArrowUpRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";

import { useState, useEffect } from "react";
import { getSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";

const links = {
  pages: [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/#sobre-mi" },
    { label: "Rutinas", href: "/rutinas" },
    { label: "Impacto 1 a 1", href: "/impacto-1a1" },
    { label: "FAQ", href: "/faq" },
  ],
  programs: [
    { label: "Plan Inicial", href: "/rutinas/plan-inicial" },
    { label: "Plan Transformación", href: "/rutinas/plan-transformacion" },
    { label: "Coaching Premium", href: "/rutinas/coaching-premium" },
    { label: "Full Body Power", href: "/rutinas/full-body" },
    { label: "Ver todos", href: "/rutinas" },
  ],
};

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

  const instagramLink = settings?.instagramUrl || "https://instagram.com";
  const youtubeLink = settings?.youtubeUrl || "https://youtube.com";
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
        <div className="py-14 lg:py-20 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#00CCFF] shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight leading-none block uppercase">{brandFirst}</span>
                <span className="gradient-text-cyan text-[10px] font-semibold tracking-[0.2em] uppercase leading-none block">{brandSecond}</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-[240px]">
              Entrenamiento premium, resultados reales. Transformá tu cuerpo, mente y espíritu.
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
                    style={{ "--hover-color": s.color } as React.CSSProperties}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">Páginas</h4>
            <ul className="flex flex-col gap-3">
              {links.pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">Programas</h4>
            <ul className="flex flex-col gap-3">
              {links.programs.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                WhatsApp
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors"
              >
                <InstagramIcon size={14} className="text-[#E1306C]" />
                @nahuelcoach
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors"
              >
                <YoutubeIcon size={14} className="text-[#FF0000]" />
                Nahuel Coach
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            <div className="mt-6">
              <Link
                href="/impacto-1a1"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-white text-xs font-semibold"
              >
                Aplicar ahora
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Nahuel Coach. Todos los derechos reservados.
          </p>
          <p className="text-white/15 text-xs">
            Diseñado para transformar vidas.
          </p>
        </div>
      </div>
    </footer>
  );
}
