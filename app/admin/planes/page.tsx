"use client";

import { useEffect, useState } from "react";
import { getPlans, savePlan, deletePlan } from "@/lib/data-service";
import { Plan } from "@/types/admin";
import {
  Gem,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  Palette
} from "lucide-react";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form / Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Fields state
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("mes");
  const [glow, setGlow] = useState("rgba(0, 102, 255, 0.15)");
  const [desc, setDesc] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    loadPlansList();
  }, []);

  async function loadPlansList() {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to load plans data", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setName("");
    setTag("");
    setPrice("$99");
    setPeriod("mes");
    setGlow("rgba(0, 102, 255, 0.15)");
    setDesc("");
    setFeatures(["Coaching personalizado", "Acceso premium"]);
    setSlug("plan-nuevo");
    setActive(true);
    setFeatured(true);
    setOrder(plans.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setName(plan.name);
    setTag(plan.tag);
    setPrice(plan.price);
    setPeriod(plan.period);
    setGlow(plan.glow);
    setDesc(plan.desc);
    setFeatures([...plan.features]);
    setSlug(plan.slug);
    setActive(plan.active);
    setFeatured(plan.featured);
    setOrder(plan.order);
    setIsModalOpen(true);
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature.trim()]);
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este plan VIP? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const ok = await deletePlan(id);
      if (ok) {
        setNotification({
          type: "success",
          text: "Plan VIP eliminado con éxito."
        });
        loadPlansList();
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al intentar eliminar el plan."
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      alert("El nombre y el slug son campos requeridos.");
      return;
    }

    const pData: Plan = {
      id: editingPlan ? editingPlan.id : Date.now().toString(),
      name: name.trim(),
      tag: tag.trim(),
      price: price.trim(),
      period: period.trim(),
      glow: glow.trim(),
      desc: desc.trim(),
      features,
      slug: slug.trim(),
      active,
      featured,
      order: Number(order)
    };

    try {
      await savePlan(pData);
      setNotification({
        type: "success",
        text: editingPlan ? "Plan VIP modificado con éxito." : "Nuevo plan VIP creado con éxito."
      });
      setIsModalOpen(false);
      loadPlansList();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al guardar el plan VIP."
      });
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Gestión Planes de Mentoría VIP</h1>
          <p className="text-white/40 text-sm font-light mt-2">
            Administra los programas VIP Élite y sus características en el grid de la página de inicio.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl text-white font-bold text-xs btn-primary shadow-lg flex items-center gap-2"
        >
          <Plus size={14} />
          Crear Nuevo Plan VIP
        </button>
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

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {plans.length === 0 ? (
          <div className="col-span-2 p-10 text-center rounded-2xl bg-[#09090f] border border-white/5 text-white/20">
            No se han encontrado planes de mentoría VIP creados.
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 bg-[#09090f] border flex flex-col justify-between gap-5 relative overflow-hidden transition-all duration-300 ${
                plan.active ? "border-white/5" : "border-white/5 opacity-40 border-dashed"
              }`}
            >
              {/* Glow overlay */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                style={{ background: plan.glow }}
              />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    Orden: {plan.order}
                  </span>
                  {plan.tag && (
                    <span className="text-[9px] font-bold text-[#00CCFF] bg-[#00CCFF]/5 border border-[#00CCFF]/20 px-2 py-0.5 rounded-full uppercase">
                      {plan.tag}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-white font-black text-xl leading-none">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 mt-3">
                    <span className="text-2xl font-black text-white">{plan.price}</span>
                    <span className="text-white/35 text-xs">/ {plan.period}</span>
                  </div>
                  <p className="text-white/40 text-xs font-light mt-3 leading-relaxed">{plan.desc}</p>
                </div>

                {/* Features preview (first 3) */}
                <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">
                    Características ({plan.features.length})
                  </span>
                  {plan.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="text-white/60 text-[11px] truncate flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-[#0066FF]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <span className="text-[10px] text-white/30 italic">+{plan.features.length - 3} características más</span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 bg-white/5 border ${
                    plan.active ? "text-emerald-400 border-emerald-500/10" : "text-red-400 border-red-500/10"
                  }`}>
                    {plan.active ? <Eye size={9} /> : <EyeOff size={9} />}
                    {plan.active ? "Activo" : "Oculto"}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(plan)}
                    className="w-8 h-8 rounded-lg inline-flex items-center justify-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/60 hover:text-white transition-all"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="w-8 h-8 rounded-lg inline-flex items-center justify-center border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* PLAN FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div
            className="w-full max-w-3xl rounded-3xl bg-[#09090f] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backdropFilter: "blur(25px)" }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <Gem size={18} className="text-[#7B2FFF]" />
                {editingPlan ? `Editar Plan: ${editingPlan.name}` : "Crear Nuevo Plan VIP"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable Form body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              
              {/* Row 1: Name & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Nombre del Plan</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingPlan) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }}
                    placeholder="Ej: Plan Elite Master"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\-]+/g, ""))}
                    placeholder="plan-elite-master"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-mono focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Tag & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Etiqueta Badge</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Ej: Recomendado"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Precio Visible (Texto)</label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ej: $199"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Periodo</label>
                  <input
                    type="text"
                    required
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="Ej: mes"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>
              </div>

              {/* Glow selection & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Palette size={10} />
                    Resplandor Glow (CSS Radial Color)
                  </label>
                  <input
                    type="text"
                    required
                    value={glow}
                    onChange={(e) => setGlow(e.target.value)}
                    placeholder="rgba(0, 102, 255, 0.15)"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Orden de lista</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Descripción del Plan</label>
                <textarea
                  required
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Mentoría personalizada..."
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#7B2FFF] transition-all resize-none"
                />
              </div>

              {/* FEATURES DYNAMIC EDITOR */}
              <div className="flex flex-col gap-3 p-4.5 rounded-2xl bg-white/[0.01] border border-white/5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Características Incluidas</label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Ej: Onboarding físico completo"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs focus:outline-none focus:border-[#7B2FFF] transition-all"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2.5 rounded-xl text-white font-bold text-xs btn-primary flex items-center gap-1.5"
                    style={{ background: "#7B2FFF" }}
                  >
                    <Plus size={14} />
                    Agregar
                  </button>
                </div>

                <div className="flex flex-col gap-2 mt-2 max-h-40 overflow-y-auto">
                  {features.length === 0 ? (
                    <span className="text-[10px] text-white/20 italic">No hay características cargadas.</span>
                  ) : (
                    features.map((feat, idx) => (
                      <div key={idx} className="flex justify-between items-center gap-4 p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-xs text-white/70">{feat}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="text-red-400 hover:text-red-300 w-6 h-6 rounded flex items-center justify-center hover:bg-red-500/5 transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer hover:bg-white/[0.02] transition">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-[#09090f] text-[#7B2FFF] focus:ring-[#7B2FFF]/20"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Plan Activo</span>
                    <span className="text-[10px] text-white/35 font-light block">Visible en la sección VIP del Home</span>
                  </div>
                </label>
              </div>

            </form>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 bg-white/[0.005] flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-white/70 hover:text-white text-xs font-bold transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3.5 rounded-xl text-white font-bold text-xs btn-primary shadow-lg flex items-center gap-1.5"
                style={{ background: "#7B2FFF" }}
              >
                <Save size={14} />
                Guardar Plan VIP
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
