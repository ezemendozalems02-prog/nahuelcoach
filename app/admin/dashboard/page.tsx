"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRoutines, getPlans, getBanners, getFAQs, getSettings } from "@/lib/data-service";
import { Routine, Plan, Banner, FAQ, SiteSettings } from "@/types/admin";
import {
  Dumbbell,
  Gem,
  HelpCircle,
  Image as ImageIcon,
  Settings,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    routinesCount: 0,
    activeRoutinesCount: 0,
    plansCount: 0,
    activePlansCount: 0,
    bannersCount: 0,
    activeBannersCount: 0,
    faqsCount: 0,
    activeFaqsCount: 0
  });
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [r, p, b, f, s] = await Promise.all([
          getRoutines(),
          getPlans(),
          getBanners(),
          getFAQs(),
          getSettings()
        ]);

        setStats({
          routinesCount: r.length,
          activeRoutinesCount: r.filter((x) => x.active).length,
          plansCount: p.length,
          activePlansCount: p.filter((x) => x.active).length,
          bannersCount: b.length,
          activeBannersCount: b.filter((x) => x.active).length,
          faqsCount: f.length,
          activeFaqsCount: f.filter((x) => x.active).length
        });
        setSettings(s);
      } catch (err) {
        console.error("Error loading dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex items-center justify-center animate-spin">
          <Zap size={15} className="text-white fill-white" />
        </div>
        <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Cargando Estadísticas...</p>
      </div>
    );
  }

  const statCards = [
    {
      label: "Rutinas / Programas",
      total: stats.routinesCount,
      active: stats.activeRoutinesCount,
      color: "#0066FF",
      icon: Dumbbell,
      href: "/admin/rutinas"
    },
    {
      label: "Planes VIP Élite",
      total: stats.plansCount,
      active: stats.activePlansCount,
      color: "#7B2FFF",
      icon: Gem,
      href: "/admin/planes"
    },
    {
      label: "Banners Anuncios",
      total: stats.bannersCount,
      active: stats.activeBannersCount,
      color: "#00CCFF",
      icon: ImageIcon,
      href: "/admin/banners"
    },
    {
      label: "Preguntas FAQ",
      total: stats.faqsCount,
      active: stats.activeFaqsCount,
      color: "#E1306C",
      icon: HelpCircle,
      href: "/admin/faq"
    }
  ];

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Dashboard</h1>
        <p className="text-white/40 text-sm font-light mt-2">
          Bienvenido al centro de control. Gestiona la información visible de tu web en tiempo real.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative rounded-2xl p-6 bg-[#09090f] border border-white/5 shadow-lg flex flex-col gap-4 justify-between transition-all duration-300 hover:border-white/10 hover:bg-[#0c0c14]"
            >
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{card.label}</span>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}33`
                  }}
                >
                  <Icon size={14} style={{ color: card.color }} />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white tracking-tight">{card.total}</div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/35 font-bold uppercase tracking-wider mt-1.5">
                  <CheckCircle2 size={10} className="text-emerald-400" />
                  <span>{card.active} Activos en la web</span>
                </div>
              </div>

              <div className="text-white/30 group-hover:text-white text-[10px] font-bold uppercase tracking-wider pt-3 border-t border-white/5 flex items-center gap-1 transition-colors duration-200">
                Gestionar
                <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Middle row details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings quick status card */}
        <div className="lg:col-span-2 rounded-2xl p-6 bg-[#09090f] border border-white/5 flex flex-col gap-5 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/5 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Settings size={15} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Configuración de Marca & WhatsApp</h3>
              <p className="text-white/35 text-xs font-light">Datos de destino de compra y redes sociales actuales.</p>
            </div>
          </div>

          {settings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 text-xs">
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-1">
                <span className="text-white/30 font-bold uppercase tracking-wider text-[9px]">Marca Comercial</span>
                <span className="text-white font-semibold text-sm">{settings.brandName}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-1">
                <span className="text-white/30 font-bold uppercase tracking-wider text-[9px]">WhatsApp de Enlace</span>
                <span className="text-white font-semibold text-sm">+{settings.whatsappNumber}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-1">
                <span className="text-white/30 font-bold uppercase tracking-wider text-[9px]">Instagram Link</span>
                <span className="text-white/70 font-semibold truncate">{settings.instagramUrl}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-1">
                <span className="text-white/30 font-bold uppercase tracking-wider text-[9px]">YouTube Link</span>
                <span className="text-white/70 font-semibold truncate">{settings.youtubeUrl}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-400 text-xs flex gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>No se ha encontrado la configuración de marca cargada. Ve a configuración general.</span>
            </div>
          )}

          <Link
            href="/admin/settings"
            className="self-start inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-white transition-all duration-200"
          >
            Modificar Configuración
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Database state notice */}
        <div className="rounded-2xl p-6 bg-[#09090f] border border-white/5 flex flex-col justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7B2FFF]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7B2FFF]/5 border border-[#7B2FFF]/20 flex items-center justify-center text-[#7B2FFF]">
              <Sparkles size={15} />
            </div>
            <h3 className="text-white font-bold text-sm">Base de Datos: LocalStorage</h3>
            <p className="text-white/40 text-xs font-light leading-relaxed">
              Actualmente los datos se guardan en el almacenamiento local de tu navegador. Esto te permite testear las funcionalidades de edición de textos, ABM de rutinas y planes en producción directamente en tu hosting antes de conectar base de datos física.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[#7B2FFF]/20 bg-[#7B2FFF]/5 text-[#7B2FFF] text-xs font-semibold leading-relaxed flex gap-2.5">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>Todos tus cambios persistirán en este dispositivo y navegador al recargar.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
