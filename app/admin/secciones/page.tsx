"use client";

import { useEffect, useState } from "react";
import { getSections, saveSections } from "@/lib/data-service";
import { HomeSectionConfig } from "@/types/admin";
import { Grid, Save, ArrowUp, ArrowDown, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<HomeSectionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadSections() {
      try {
        const data = await getSections();
        setSections(data);
      } catch (err) {
        console.error("Failed to load sections", err);
      } finally {
        setLoading(false);
      }
    }
    loadSections();
  }, []);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const list = [...sections];
    const temp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = temp;

    // Recalculate order numbers
    const updated = list.map((sec, i) => ({ ...sec, order: i + 1 }));
    setSections(updated);
  };

  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const list = [...sections];
    const temp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = temp;

    // Recalculate order numbers
    const updated = list.map((sec, i) => ({ ...sec, order: i + 1 }));
    setSections(updated);
  };

  const toggleActive = (id: string) => {
    const updated = sections.map((sec) => {
      if (sec.id === id) {
        return { ...sec, active: !sec.active };
      }
      return sec;
    });
    setSections(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setNotification(null);
    try {
      await saveSections(sections);
      setNotification({
        type: "success",
        text: "Estructura y orden de secciones actualizados en la base local."
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al intentar guardar el orden de las secciones."
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
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Orden & Visibilidad Home</h1>
        <p className="text-white/40 text-sm font-light mt-2">
          Activa, desactiva o reordena los bloques principales que se muestran en tu página de inicio (`/`).
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

      {/* Layout manager list */}
      <div className="max-w-2xl flex flex-col gap-6">
        <div className="rounded-3xl p-6 bg-[#09090f] border border-white/5 shadow-2xl flex flex-col gap-4">
          <h2 className="text-white font-bold text-sm flex items-center gap-2 pb-4 border-b border-white/5 mb-2">
            <Grid size={16} className="text-[#0066FF]" />
            Secciones en el Home
          </h2>

          <div className="flex flex-col gap-3">
            {sections.map((section, index) => {
              const isFirst = index === 0;
              const isLast = index === sections.length - 1;

              return (
                <div
                  key={section.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 ${
                    section.active
                      ? "bg-white/[0.01] border-white/5"
                      : "bg-black/40 border-dashed border-white/5 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-white/40 font-bold">
                      {section.order}
                    </span>
                    <div>
                      <span className="text-xs text-white/40 font-bold uppercase tracking-wider block">ID: {section.key}</span>
                      <span className="text-sm font-semibold text-white">{section.title}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    {/* Move Up */}
                    <button
                      onClick={() => moveUp(index)}
                      disabled={isFirst}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-150 ${
                        isFirst
                          ? "border-transparent text-white/10 cursor-not-allowed"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70"
                      }`}
                    >
                      <ArrowUp size={13} />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => moveDown(index)}
                      disabled={isLast}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-150 ${
                        isLast
                          ? "border-transparent text-white/10 cursor-not-allowed"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70"
                      }`}
                    >
                      <ArrowDown size={13} />
                    </button>

                    {/* Show / Hide Toggle */}
                    <button
                      onClick={() => toggleActive(section.id)}
                      className={`ml-2 w-10 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                        section.active
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                          : "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15"
                      }`}
                      title={section.active ? "Desactivar Sección" : "Activar Sección"}
                    >
                      {section.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="self-end px-8 py-4 rounded-xl text-white font-bold text-sm btn-primary shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:shadow-[0_0_35px_rgba(0,102,255,0.4)] transition-all duration-300 flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando orden...
            </>
          ) : (
            <>
              <Save size={16} />
              Guardar Cambios
            </>
          )}
        </button>
      </div>

    </div>
  );
}
