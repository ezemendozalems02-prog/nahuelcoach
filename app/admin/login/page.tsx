"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, isAuthenticated } from "@/lib/auth-service";
import { Zap, ShieldAlert, Key, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, skip login
    if (isAuthenticated()) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Artificial delay to look premium
    setTimeout(() => {
      const user = loginAdmin(email, password);
      setLoading(false);

      if (user) {
        router.push("/admin/dashboard");
      } else {
        setError("Las credenciales ingresadas son incorrectas. Verifica tu email y contraseña.");
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md">
      
      {/* Brand logo & title */}
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#00CCFF] shadow-[0_0_30px_rgba(0,102,255,0.4)]">
          <Zap size={26} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-white font-black text-2xl tracking-tight uppercase">Panel de Control</h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">NAHUEL COACH ADMIN PANEL</p>
        </div>
      </div>

      {/* Login Card */}
      <div
        className="rounded-3xl p-8 bg-[#09090f]/80 border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.03)]"
        style={{ backdropFilter: "blur(20px)" }}
      >
        <h2 className="text-white font-bold text-lg mb-6">Iniciar Sesión</h2>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/15 bg-red-500/5 flex gap-3 items-start text-red-400 text-xs leading-relaxed animate-pulse">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Email de Acceso</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/20">
                <Mail size={14} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@test.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/20">
                <Key size={14} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 rounded-xl text-white font-bold text-sm btn-primary shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validando...
              </>
            ) : (
              "Ingresar al Panel"
            )}
          </button>
        </form>
      </div>

      {/* Safety seed label info */}
      <p className="text-center text-white/20 text-[10px] font-bold tracking-wider mt-6 uppercase">
        Credenciales de prueba: admin@test.com / admin123
      </p>

    </div>
  );
}
