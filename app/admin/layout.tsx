"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  isAuthenticated,
  logoutAdmin,
  getAuthenticatedUser
} from "@/lib/auth-service";
import {
  LayoutDashboard,
  Home,
  Dumbbell,
  Gem,
  Grid,
  Image as ImageIcon,
  HelpCircle,
  Settings,
  LogOut,
  Zap,
  User
} from "lucide-react";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    // Check if authenticated
    const authStatus = isAuthenticated();
    if (!authStatus && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setUser(getAuthenticatedUser());
      setChecked(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  // If path is /admin/login, render without sidebar layout
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#030307] text-white flex items-center justify-center p-4">{children}</div>;
  }

  // Loading state
  if (!checked) {
    return (
      <div className="min-h-screen bg-[#030307] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex items-center justify-center animate-spin">
          <Zap size={20} className="text-white fill-white" />
        </div>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Verificando Sesión...</p>
      </div>
    );
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Textos Home/Sobre Mí", href: "/admin/home", icon: Home },
    { label: "Gestión Rutinas", href: "/admin/rutinas", icon: Dumbbell },
    { label: "Planes VIP", href: "/admin/planes", icon: Gem },
    { label: "Orden/Visibilidad Home", href: "/admin/secciones", icon: Grid },
    { label: "Banners Promocionales", href: "/admin/banners", icon: ImageIcon },
    { label: "FAQ CRUD", href: "/admin/faq", icon: HelpCircle },
    { label: "Configuración & Redes", href: "/admin/settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#030307] text-white flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside 
        className="w-full md:w-64 bg-[#07070d] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between shrink-0"
        style={{
          boxShadow: "inset -1px 0 0 rgba(255,255,255,0.02), 10px 0 30px rgba(0,0,0,0.5)"
        }}
      >
        {/* Top Header info */}
        <div>
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#00CCFF]">
                <Zap size={15} className="text-white fill-white" />
              </div>
              <div>
                <span className="text-white font-bold text-sm tracking-tight leading-none block">NAHUEL</span>
                <span className="gradient-text-cyan text-[9px] font-semibold tracking-[0.2em] uppercase leading-none block">COACH</span>
              </div>
            </Link>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 px-2 py-0.5 rounded-full uppercase">
              Admin
            </span>
          </div>

          {/* User profile capsule */}
          {user && (
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                <User size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/80 font-bold truncate leading-none">{user.name}</p>
                <p className="text-[10px] text-white/35 truncate mt-1 leading-none">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-white bg-[#0066FF]/10 border border-[#0066FF]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_20px_rgba(0,102,255,0.05)]"
                      : "text-white/50 border border-transparent hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-[#00CCFF]" : "text-white/40"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/5 bg-white/[0.005]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-bold transition-all duration-200"
          >
            <LogOut size={13} />
            Cerrar Sesión
          </button>
        </div>

      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto flex-1">
          {children}
        </div>
      </main>

    </div>
  );
}
