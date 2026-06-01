"use client";

import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";
import { Settings, Save, AlertCircle, CheckCircle2, Link2, MessageSquare } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setNotification(null);

    try {
      await saveSettings(settings);
      setNotification({
        type: "success",
        text: "Configuración general y redes guardadas con éxito."
      });
      // Clear alert after 3s
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Hubo un error al guardar los cambios."
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00CCFF] flex items-center justify-center animate-spin" />
        <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Configuración & Redes</h1>
        <p className="text-white/40 text-sm font-light mt-2">
          Edita los accesos de contacto, el número de checkout de WhatsApp y las redes sociales del sitio.
        </p>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed transition-all duration-300 ${
            notification.type === "success"
              ? "border-emerald-500/15 bg-emerald-500/5 text-emerald-400"
              : "border-red-500/15 bg-red-500/5 text-red-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={16} className="shrink-0" />
          ) : (
            <AlertCircle size={16} className="shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Form Card */}
      {settings && (
        <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6">
          <div
            className="rounded-3xl p-6 lg:p-8 bg-[#09090f] border border-white/5 shadow-2xl flex flex-col gap-6"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <h2 className="text-white font-bold text-sm flex items-center gap-2 pb-4 border-b border-white/5">
              <Settings size={16} className="text-[#0066FF]" />
              Identidad de Marca & Checkout
            </h2>

            {/* Brand Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  Nombre Comercial (Brand Name)
                </label>
                <input
                  type="text"
                  required
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              {/* WhatsApp checkout number */}
              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare size={11} />
                  Número de WhatsApp (Sin + ni espacios)
                </label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="541136361630"
                  className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none"
                />
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-wide">
                  Ejemplo: Codigo de país + area + telefono (Ej: 5491133334444)
                </p>
              </div>
            </div>

            <h2 className="text-white font-bold text-sm flex items-center gap-2 pb-4 border-b border-white/5 mt-4">
              <Link2 size={16} className="text-[#00CCFF]" />
              Redes Sociales
            </h2>

            {/* Social URL links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  Enlace de Instagram
                </label>
                <input
                  type="url"
                  required
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#00CCFF] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  Canal de YouTube
                </label>
                <input
                  type="url"
                  required
                  value={settings.youtubeUrl}
                  onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#00CCFF] focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={saving}
            className="self-end px-8 py-4 rounded-xl text-white font-bold text-sm btn-primary shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:shadow-[0_0_35px_rgba(0,102,255,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando cambios...
              </>
            ) : (
              <>
                <Save size={16} />
                Guardar Configuración
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
}
