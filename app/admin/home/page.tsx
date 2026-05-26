"use client";

import { useEffect, useState, useRef } from "react";
import { getSettings, saveSettings } from "@/lib/data-service";
import { SiteSettings } from "@/types/admin";
import { Home, Save, CheckCircle2, AlertCircle, Upload, Globe, Trash2 } from "lucide-react";

export default function AdminHomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [aboutImageMethod, setAboutImageMethod] = useState<"file" | "url">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        setSettings(data);
        if (data.aboutImage && data.aboutImage.startsWith("data:image")) {
          setAboutImageMethod("file");
        }
      } catch (err) {
        console.error("Failed to load settings data", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    // Verify it is an image
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSettings({
        ...settings,
        aboutImage: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const removeAboutImage = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      aboutImage: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setNotification(null);

    try {
      await saveSettings(settings);
      setNotification({
        type: "success",
        text: "Textos del Hero y Sobre Mí actualizados en la base local."
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al guardar los textos de la página."
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
      
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Textos Home & Sobre Mí</h1>
        <p className="text-white/40 text-sm font-light mt-2">
          Edita de forma directa el Hero promocional del inicio y la sección de historia y biografía.
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

      {/* Forms layout */}
      {settings && (
        <form onSubmit={handleSubmit} className="max-w-4xl flex flex-col gap-6">
          
          {/* HERO SECTION BLOCK */}
          <div
            className="rounded-3xl p-6 lg:p-8 bg-[#09090f] border border-white/5 shadow-2xl flex flex-col gap-6"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <h2 className="text-white font-bold text-sm flex items-center gap-2 pb-4 border-b border-white/5">
              <Home size={16} className="text-[#0066FF]" />
              Textos del Hero de Bienvenida
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Título del Hero (Gritador)
              </label>
              <input
                type="text"
                required
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none"
              />
            </div>

            {/* Subtitle */}
            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Subtítulo / Bajada del Hero
              </label>
              <textarea
                required
                rows={3}
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none resize-none"
              />
            </div>

            {/* CTA Button Text */}
            <div className="flex flex-col gap-2 max-w-sm">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Texto del Botón Principal
              </label>
              <input
                type="text"
                required
                value={settings.heroCtaText}
                onChange={(e) => setSettings({ ...settings, heroCtaText: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#0066FF] focus:outline-none"
              />
            </div>
          </div>

          {/* SOBRE MI SECTION BLOCK */}
          <div
            className="rounded-3xl p-6 lg:p-8 bg-[#09090f] border border-white/5 shadow-2xl flex flex-col gap-6"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <h2 className="text-white font-bold text-sm flex items-center gap-2 pb-4 border-b border-white/5">
              <Home size={16} className="text-[#00CCFF]" />
              Sección Sobre Mí (Nahuel Historia)
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Título de la Sección
              </label>
              <input
                type="text"
                required
                value={settings.aboutTitle}
                onChange={(e) => setSettings({ ...settings, aboutTitle: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#00CCFF] focus:outline-none"
              />
            </div>

            {/* Biography */}
            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Biografía / Metodología
              </label>
              <textarea
                required
                rows={6}
                value={settings.aboutBio}
                onChange={(e) => setSettings({ ...settings, aboutBio: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#00CCFF] focus:outline-none resize-y"
              />
            </div>

            {/* About Image Selection */}
            <div className="flex flex-col gap-3">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Imagen de la Sección
              </label>

              {/* Selector de Método */}
              <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5 self-start mb-2">
                <button
                  type="button"
                  onClick={() => setAboutImageMethod("url")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    aboutImageMethod === "url"
                      ? "bg-[#0066FF] text-white shadow-md"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <Globe size={12} />
                  Pegar URL
                </button>
                <button
                  type="button"
                  onClick={() => setAboutImageMethod("file")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    aboutImageMethod === "file"
                      ? "bg-[#0066FF] text-white shadow-md"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <Upload size={12} />
                  Subir Archivo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Inputs */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  {aboutImageMethod === "url" ? (
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={settings.aboutImage || ""}
                      onChange={(e) => setSettings({ ...settings, aboutImage: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-sm font-semibold transition-all duration-300 focus:bg-white/[0.04] focus:border-[#00CCFF] focus:outline-none"
                    />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-6 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.03] text-white/50 hover:text-white text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center gap-2"
                      >
                        <Upload size={18} className="text-[#0066FF]" />
                        Haz clic para seleccionar una foto de tu PC
                      </button>
                    </div>
                  )}

                  {settings.aboutImage && (
                    <button
                      type="button"
                      onClick={removeAboutImage}
                      className="self-start px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={11} />
                      Eliminar Foto
                    </button>
                  )}
                </div>

                {/* Preview Thumbnail */}
                <div className="flex flex-col gap-2">
                  <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Vista Previa</span>
                  {settings.aboutImage ? (
                    <div
                      className="w-full aspect-[4/3] rounded-2xl border border-white/10 bg-cover bg-center overflow-hidden relative shadow-lg"
                      style={{ backgroundImage: `url('${settings.aboutImage}')` }}
                    >
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-white/5 bg-white/[0.01] flex items-center justify-center text-white/20 text-xs">
                      Sin imagen
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Submit action */}
          <button
            type="submit"
            disabled={saving}
            className="self-end px-8 py-4 rounded-xl text-white font-bold text-sm btn-primary shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:shadow-[0_0_35px_rgba(0,102,255,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando textos...
              </>
            ) : (
              <>
                <Save size={16} />
                Guardar Textos
              </>
            )}
          </button>
          
        </form>
      )}

    </div>
  );
}
