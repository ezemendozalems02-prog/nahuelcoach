"use client";

import { useEffect, useState, useRef } from "react";
import { getRoutines, saveRoutine, deleteRoutine } from "@/lib/data-service";
import { Routine } from "@/types/admin";
import {
  Dumbbell,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  X,
  Upload,
  Globe
} from "lucide-react";

export default function AdminRoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  
  // Image Upload helpers
  const [imageMethod, setImageMethod] = useState<"file" | "url">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("Principiante");
  const [badge, setBadge] = useState("");
  const [desc, setDesc] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    loadRoutinesList();
  }, []);

  async function loadRoutinesList() {
    try {
      const data = await getRoutines();
      setRoutines(data);
    } catch (err) {
      console.error("Failed to load routines", err);
    } finally {
      setLoading(false);
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/[\s_]+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-"); // Collapse multiple dashes
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editingRoutine) {
      setSlug(generateSlug(val));
    }
  };

  const handleOpenAdd = () => {
    setEditingRoutine(null);
    setName("");
    setSubtitle("");
    setSlug("");
    setPrice(29);
    setOriginalPrice("");
    setDuration("4 semanas");
    setLevel("Principiante");
    setBadge("");
    setDesc("");
    setBenefits(["Rutinas personalizadas", "Soporte por WhatsApp"]);
    setImage("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80");
    setActive(true);
    setFeatured(false);
    setOrder(routines.length + 1);
    setImageMethod("url");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (routine: Routine) => {
    setEditingRoutine(routine);
    setName(routine.name);
    setSubtitle(routine.subtitle);
    setSlug(routine.slug);
    setPrice(routine.price);
    setOriginalPrice(routine.originalPrice || "");
    setDuration(routine.duration);
    setLevel(routine.level);
    setBadge(routine.badge || "");
    setDesc(routine.desc);
    setBenefits([...routine.benefits]);
    setImage(routine.image);
    setActive(routine.active);
    setFeatured(routine.featured);
    setOrder(routine.order);
    
    if (routine.image && routine.image.startsWith("data:image")) {
      setImageMethod("file");
    } else {
      setImageMethod("url");
    }
    
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    setBenefits([...benefits, newBenefit.trim()]);
    setNewBenefit("");
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta rutina? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const ok = await deleteRoutine(id);
      if (ok) {
        setNotification({
          type: "success",
          text: "Rutina eliminada con éxito."
        });
        loadRoutinesList();
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al intentar eliminar la rutina."
      });
    }
  };

  const toggleRoutineActive = async (routine: Routine) => {
    const updated = { ...routine, active: !routine.active };
    try {
      await saveRoutine(updated);
      loadRoutinesList();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleRoutineFeatured = async (routine: Routine) => {
    const updated = { ...routine, featured: !routine.featured };
    try {
      await saveRoutine(updated);
      loadRoutinesList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      alert("El nombre y el slug son campos requeridos.");
      return;
    }

    const rData: Routine = {
      id: editingRoutine ? editingRoutine.id : Date.now().toString(),
      name: name.trim(),
      subtitle: subtitle.trim(),
      slug: slug.trim(),
      price: Number(price),
      originalPrice: originalPrice === "" ? undefined : Number(originalPrice),
      duration: duration.trim(),
      level,
      badge: badge.trim() || undefined,
      desc: desc.trim(),
      benefits,
      active,
      featured,
      order: Number(order),
      image
    };

    try {
      await saveRoutine(rData);
      setNotification({
        type: "success",
        text: editingRoutine ? "Rutina modificada con éxito." : "Nueva rutina creada con éxito."
      });
      setIsModalOpen(false);
      loadRoutinesList();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al guardar la rutina."
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
      
      {/* Title & action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Gestión de Rutinas / Programas</h1>
          <p className="text-white/40 text-sm font-light mt-2">
            Crea, edita o elimina programas de entrenamiento estables para vender en el sitio.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl text-white font-bold text-xs btn-primary shadow-lg flex items-center gap-2"
        >
          <Plus size={14} />
          Crear Nueva Rutina
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

      {/* Table / Grid list */}
      <div className="rounded-3xl bg-[#09090f] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-white/40 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 pl-6">Imagen & Nombre</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Nivel / Duración</th>
                <th className="p-4 text-center">Visibilidad</th>
                <th className="p-4 text-center">Destacado</th>
                <th className="p-4 pr-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {routines.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-white/20 font-medium">
                    No se han encontrado rutinas creadas. ¡Crea la primera ahora!
                  </td>
                </tr>
              ) : (
                routines.map((routine) => (
                  <tr key={routine.id} className="hover:bg-white/[0.01] transition-colors">
                    
                    {/* Name & Img Thumbnail */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-cover bg-center border border-white/5"
                          style={{ backgroundImage: `url('${routine.image}')` }}
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-white truncate block">{routine.name}</span>
                          <span className="text-[10px] text-white/35 font-light truncate block max-w-[200px]">
                            {routine.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="p-4 font-mono text-white/50 text-[10px]">{routine.slug}</td>

                    {/* Price */}
                    <td className="p-4">
                      <span className="font-bold text-white text-sm">${routine.price} USD</span>
                      {routine.originalPrice && (
                        <span className="text-white/20 text-[10px] line-through ml-2">${routine.originalPrice}</span>
                      )}
                    </td>

                    {/* Level / Duration */}
                    <td className="p-4">
                      <span className="text-white/70 block">{routine.level}</span>
                      <span className="text-white/35 text-[10px] mt-0.5 block">{routine.duration}</span>
                    </td>

                    {/* Active Check */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleRoutineActive(routine)}
                        className={`w-8 h-8 rounded-lg inline-flex items-center justify-center border transition-all ${
                          routine.active
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                            : "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15"
                        }`}
                        title={routine.active ? "Desactivar de la web" : "Mostrar en la web"}
                      >
                        {routine.active ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                    </td>

                    {/* Featured Check */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleRoutineFeatured(routine)}
                        className={`w-8 h-8 rounded-lg inline-flex items-center justify-center border transition-all ${
                          routine.featured
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/15"
                            : "border-white/5 bg-white/[0.01] text-white/20 hover:bg-white/[0.05]"
                        }`}
                        title={routine.featured ? "Quitar de destacados" : "Destacar en home"}
                      >
                        <Star size={13} className={routine.featured ? "fill-amber-400" : ""} />
                      </button>
                    </td>

                    {/* Actions buttons */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(routine)}
                          className="w-8 h-8 rounded-lg inline-flex items-center justify-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/60 hover:text-white transition-all"
                          title="Editar Rutina"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(routine.id)}
                          className="w-8 h-8 rounded-lg inline-flex items-center justify-center border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all"
                          title="Eliminar Rutina"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD FORM GLASS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div
            className="w-full max-w-3xl rounded-3xl bg-[#09090f] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backdropFilter: "blur(25px)" }}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <Dumbbell size={18} className="text-[#0066FF]" />
                {editingRoutine ? `Editar Rutina: ${editingRoutine.name}` : "Crear Nueva Rutina"}
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
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Nombre del Programa</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Ej: Plan Fuerza Extrema"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Slug (Dirección URL)</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="ej-fuerza-extrema"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-mono focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Subtitle */}
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Subtítulo / Lema Corto</label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Tu transformación física en 8 semanas"
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                />
              </div>

              {/* Row 3: Prices & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Precio de Venta ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="39"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Precio Original (Opcional tachado)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Ej: 59"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Duración</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ej: 8 semanas"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Level, Badge, Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Nivel Requerido</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#09090f] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Todos los niveles">Todos los niveles</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Etiqueta (Badge)</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Ej: Más elegido, Premium"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Orden de lista</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Descripción del Programa</label>
                <textarea
                  required
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Detalla los objetivos del programa..."
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all resize-y"
                />
              </div>

              {/* BENEFITS LIST EDITOR */}
              <div className="flex flex-col gap-3 p-4.5 rounded-2xl bg-white/[0.01] border border-white/5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Beneficios del Programa</label>
                
                {/* Add new benefit input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Ej: Videos de técnica HD explicados"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs focus:outline-none focus:border-[#0066FF] transition-all"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addBenefit();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="px-4 py-2.5 rounded-xl text-white font-bold text-xs btn-primary flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    Agregar
                  </button>
                </div>

                {/* Render current benefits list */}
                <div className="flex flex-col gap-2 mt-2 max-h-40 overflow-y-auto">
                  {benefits.length === 0 ? (
                    <span className="text-[10px] text-white/20 italic">No hay beneficios cargados. Agrega uno.</span>
                  ) : (
                    benefits.map((b, idx) => (
                      <div key={idx} className="flex justify-between items-center gap-4 p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-xs text-white/70">{b}</span>
                        <button
                          type="button"
                          onClick={() => removeBenefit(idx)}
                          className="text-red-400 hover:text-red-300 w-6 h-6 rounded flex items-center justify-center hover:bg-red-500/5 transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* IMAGE SELECTION */}
              <div className="flex flex-col gap-3">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Imagen del Programa</label>

                {/* Method toggler */}
                <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5 self-start">
                  <button
                    type="button"
                    onClick={() => setImageMethod("url")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      imageMethod === "url" ? "bg-[#0066FF] text-white shadow-md" : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Globe size={11} />
                    Pegar URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMethod("file")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      imageMethod === "file" ? "bg-[#0066FF] text-white shadow-md" : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Upload size={11} />
                    Subir Archivo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                  
                  {/* Inputs */}
                  <div className="md:col-span-2 flex flex-col gap-3">
                    {imageMethod === "url" ? (
                      <input
                        type="url"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                      />
                    ) : (
                      <div>
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
                          className="w-full py-5 rounded-xl border border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.03] text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          <Upload size={14} className="text-[#0066FF]" />
                          Seleccionar Archivo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Preview */}
                  <div>
                    {image ? (
                      <div
                        className="w-full aspect-[4/3] rounded-xl border border-white/10 bg-cover bg-center overflow-hidden relative shadow"
                        style={{ backgroundImage: `url('${image}')` }}
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] rounded-xl border border-dashed border-white/5 bg-white/[0.01] flex items-center justify-center text-white/20 text-xs">
                        Sin imagen
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Toggles (Active / Featured) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer hover:bg-white/[0.02] transition">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-[#09090f] text-[#0066FF] focus:ring-[#0066FF]/20"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Programa Activo</span>
                    <span className="text-[10px] text-white/35 font-light block">Visible al público en la catálogo</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer hover:bg-white/[0.02] transition">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-[#09090f] text-[#0066FF] focus:ring-[#0066FF]/20"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Destacar en el Home</span>
                    <span className="text-[10px] text-white/35 font-light block">Se mostrará en la sección destacados del inicio</span>
                  </div>
                </label>
              </div>

            </form>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4.5 border-t border-white/5 bg-white/[0.005] flex justify-end gap-3 shrink-0">
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
              >
                <Save size={14} />
                Guardar Rutina
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
