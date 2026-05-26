"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import { useCart } from "@/context/CartContext";
import { getSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Planes", href: "/rutinas" },
  { label: "Impacto 1 a 1", href: "/impacto-1a1" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadHeaderConfig() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadHeaderConfig();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const brand = settings?.brandName || "NAHUEL COACH";
  const brandParts = brand.split(" ");
  const brandFirst = brandParts[0] || "NAHUEL";
  const brandSecond = brandParts.slice(1).join(" ") || "COACH";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#00CCFF] shadow-[0_0_20px_rgba(0,102,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] transition-all duration-300">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight leading-none block uppercase">
                {brandFirst}
              </span>
              <span className="gradient-text-cyan text-[10px] font-semibold tracking-[0.2em] uppercase leading-none block">
                {brandSecond}
              </span>
            </div>
          </Link>

          {/* Nav - desktop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("#")[0]) &&
                    link.href.split("#")[0] !== "/";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "text-[#00CCFF]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-white/5 border border-[#0066FF]/30"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#00CCFF] rounded-full group-hover:w-4/5 transition-all duration-300" />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-white/50 hover:text-[#E1306C] hover:bg-white/5 transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-white/50 hover:text-[#FF0000] hover:bg-white/5 transition-all duration-300"
              aria-label="YouTube"
            >
              <YoutubeIcon size={18} />
            </a>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#0066FF]/40 hover:bg-[#0066FF]/10 transition-all duration-300"
              aria-label="Carrito"
            >
              <ShoppingCart size={18} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00CCFF] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(0,102,255,0.5)]"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* CTA desktop */}
            <Link
              href="/impacto-1a1"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-white text-sm font-semibold"
            >
              Aplicar ahora
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0a0a0f] border-l border-white/5 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="gradient-text font-bold text-lg">NAHUEL COACH</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-white/5 flex flex-col gap-3">
                <div className="flex gap-3 justify-center">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 hover:text-[#E1306C] transition-all flex items-center justify-center gap-2 text-sm">
                    <InstagramIcon size={16} /> Instagram
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 hover:text-[#FF0000] transition-all flex items-center justify-center gap-2 text-sm">
                    <YoutubeIcon size={16} /> YouTube
                  </a>
                </div>
                <Link href="/impacto-1a1" onClick={() => setMobileOpen(false)} className="w-full py-3 rounded-xl btn-primary text-white text-sm font-semibold text-center">
                  Aplicar ahora
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
