"use client";

import { useEffect, useState, useRef } from "react";
import { getBanners, saveBanner } from "@/lib/data-service";
import { Banner } from "@/types/admin";
import {
  Image as ImageIcon,
  Plus,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  Upload,
  Globe,
  Sliders
} from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form / Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Upload helpers
  const [imgMethodD, setImgMethodD] = useState<"file" | "url">("url");
  const [imgMethodM, setImgMethodM] = useState<"file" | "url">("url");
  const fileDRef = useRef<HTMLInputElement>(null);
  const fileMRef = useRef<HTMLInputElement>(null);

  // Fields state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageDesktop, setImageDesktop] = useState("");
  const [imageMobile, setImageMobile] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [overlayOpacity, setOverlayOpacity] = useState(70);
  const [sectionId, setSectionId] = useState("general");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    loadBannersList();
  }, []);

  async function loadBannersList() {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setTitle("");
    setSubtitle("");
    setImageDesktop("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80");
    setImageMobile("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80");
    setButtonText("Ver Rutinas");
    setButtonLink("#rutinas");
    setOverlayOpacity(70);
    setSectionId("general");
    setActive(true);
    setOrder(banners.length + 1);
    setImgMethodD("url");
    setImgMethodM("url");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
    setImageDesktop(banner.imageDesktop);
    setImageMobile(banner.imageMobile);
    setButtonText(banner.buttonText || "");
    setButtonLink(banner.buttonLink || "");
    setOverlayOpacity(banner.overlayOpacity);
    setSectionId(banner.sectionId);
    setActive(banner.active);
    setOrder(banner.order);

    setImgMethodD(banner.imageDesktop.startsWith("data:image") ? "file" : "url");
    setImgMethodM(banner.imageMobile.startsWith("data:image") ? "file" : "url");

    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: "desktop" | "mobile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (target === "desktop") {
        setImageDesktop(reader.result as string);
      } else {
        setImageMobile(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleBannerActive = async (banner: Banner) => {
    const updated = { ...banner, active: !banner.active };
    try {
      await saveBanner(updated);
      loadBannersList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageDesktop.trim() || !imageMobile.trim()) {
      alert("El título y ambas imágenes son requeridas.");
      return;
    }

    const bData: Banner = {
      id: editingBanner ? editingBanner.id : Date.now().toString(),
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      imageDesktop,
      imageMobile,
      buttonText: buttonText.trim() || undefined,
      buttonLink: buttonLink.trim() || undefined,
      overlayOpacity: Number(overlayOpacity),
      sectionId,
      active,
      order: Number(order)
    };

    try {
      await saveBanner(bData);
      setNotification({
        type: "success",
        text: editingBanner ? "Banner modificado con éxito." : "Nuevo banner creado con éxito."
      });
      setIsModalOpen(false);
      loadBannersList();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al guardar el banner."
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Banners Promocionales</h1>
          <p className="text-white/40 text-sm font-light mt-2">
            Administra los banners publicitarios, anuncios especiales y eventos promocionales del sitio.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl text-white font-bold text-xs btn-primary shadow-lg flex items-center gap-2"
        >
          <Plus size={14} />
          Crear Nuevo Banner
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

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {banners.length === 0 ? (
          <div className="col-span-2 p-10 text-center rounded-2xl bg-[#09090f] border border-white/5 text-white/20">
            No se han encontrado banners creados.
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner.id}
              className={`rounded-3xl p-6 bg-[#09090f] border flex flex-col justify-between gap-5 relative overflow-hidden transition-all duration-300 ${
                banner.active ? "border-white/5" : "border-white/5 opacity-40 border-dashed"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    Orden: {banner.order} | {banner.sectionId}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 border ${
                    banner.active ? "text-emerald-400 border-emerald-500/10 bg-emerald-400/5" : "text-red-400 border-red-500/10 bg-red-500/5"
                  }`}>
                    {banner.active ? "Activo" : "Desactivado"}
                  </span>
                </div>

                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/5">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${banner.imageDesktop}')` }}
                  />
                  <div 
                    className="absolute inset-0 bg-black" 
                    style={{ opacity: banner.overlayOpacity / 100 }}
                  />
                  <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-0.5">
                    <span className="text-white font-bold text-xs leading-tight">{banner.title}</span>
                    {banner.subtitle && (
                      <span className="text-white/60 text-[9px] leading-tight mt-0.5">{banner.subtitle}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  onClick={() => toggleBannerActive(banner)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                    banner.active
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                      : "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15"
                  }`}
                  title={banner.active ? "Ocultar" : "Mostrar"}
                >
                  {banner.active ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>

                <button
                  onClick={() => handleOpenEdit(banner)}
                  className="px-4 py-2 rounded-xl text-white text-[10px] font-bold uppercase tracking-wider border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-1.5 transition-all"
                >
                  <Edit3 size={11} />
                  Editar Banner
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* BANNER FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div
            className="w-full max-w-3xl rounded-3xl bg-[#09090f] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backdropFilter: "blur(25px)" }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <ImageIcon size={18} className="text-[#00CCFF]" />
                {editingBanner ? `Editar Banner: ${editingBanner.title}` : "Crear Nuevo Banner"}
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
              
              {/* Title & Subtitle */}
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Título del Anuncio</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: 10% OFF EN TU PRIMER PLAN"
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#00CCFF] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Subtítulo / Mensaje secundario</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej: Cupón de bienvenida por tiempo limitado. ¡Aprovechalo hoy!"
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#00CCFF] transition-all"
                />
              </div>

              {/* Desktop Image upload */}
              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Imagen Desktop (1600x400 recomendado)</label>
                
                <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5 self-start">
                  <button
                    type="button"
                    onClick={() => setImgMethodD("url")}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      imgMethodD === "url" ? "bg-[#00CCFF] text-black shadow-md" : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Globe size={11} /> Pegar URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImgMethodD("file")}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      imgMethodD === "file" ? "bg-[#00CCFF] text-black shadow-md" : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Upload size={11} /> Subir File
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2">
                    {imgMethodD === "url" ? (
                      <input
                        type="url"
                        value={imageDesktop}
                        onChange={(e) => setImageDesktop(e.target.value)}
                        placeholder="https://ejemplo.com/desktop.jpg"
                        className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#030307] text-white text-xs focus:outline-none"
                      />
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileDRef}
                          onChange={(e) => handleFileChange(e, "desktop")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileDRef.current?.click()}
                          className="w-full py-4 rounded-xl border border-dashed border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/[0.02]"
                        >
                          <Upload size={13} className="text-[#00CCFF]" /> Cargar Imagen Desktop
                        </button>
                      </div>
                    )}
                  </div>
                  {imageDesktop && (
                    <div
                      className="w-full aspect-[21/9] rounded-xl border border-white/10 bg-cover bg-center"
                      style={{ backgroundImage: `url('${imageDesktop}')` }}
                    />
                  )}
                </div>
              </div>

              {/* Mobile Image upload */}
              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Imagen Mobile (800x600 recomendado)</label>
                
                <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5 self-start">
                  <button
                    type="button"
                    onClick={() => setImgMethodM("url")}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      imgMethodM === "url" ? "bg-[#00CCFF] text-black shadow-md" : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Globe size={11} /> Pegar URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImgMethodM("file")}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      imgMethodM === "file" ? "bg-[#00CCFF] text-black shadow-md" : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Upload size={11} /> Subir File
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2">
                    {imgMethodM === "url" ? (
                      <input
                        type="url"
                        value={imageMobile}
                        onChange={(e) => setImageMobile(e.target.value)}
                        placeholder="https://ejemplo.com/mobile.jpg"
                        className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#030307] text-white text-xs focus:outline-none"
                      />
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileMRef}
                          onChange={(e) => handleFileChange(e, "mobile")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileMRef.current?.click()}
                          className="w-full py-4 rounded-xl border border-dashed border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/[0.02]"
                        >
                          <Upload size={13} className="text-[#00CCFF]" /> Cargar Imagen Mobile
                        </button>
                      </div>
                    )}
                  </div>
                  {imageMobile && (
                    <div
                      className="w-full aspect-[4/3] rounded-xl border border-white/10 bg-cover bg-center"
                      style={{ backgroundImage: `url('${imageMobile}')` }}
                    />
                  )}
                </div>
              </div>

              {/* Button text & link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Texto del Botón (Opcional)</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Ej: Comprar Ahora"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#00CCFF] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Redirección Link</label>
                  <input
                    type="text"
                    value={buttonLink}
                    onChange={(e) => setButtonLink(e.target.value)}
                    placeholder="Ej: #rutinas o /rutinas/plan-inicial"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#00CCFF] transition-all"
                  />
                </div>
              </div>

              {/* Overlay Opacity and Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders size={11} />
                    Opacidad de Capa Oscura (Overlay: {overlayOpacity}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="95"
                    step="5"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="w-full h-2.5 rounded-lg bg-white/5 accent-[#00CCFF]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Orden de lista</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs focus:outline-none focus:border-[#00CCFF]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer hover:bg-white/[0.02] transition">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-[#09090f] text-[#00CCFF] focus:ring-[#00CCFF]/20"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Banner Activo</span>
                    <span className="text-[10px] text-white/35 font-light block">Visible en la carrusel de anuncios general</span>
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
                style={{ background: "#00CCFF", color: "#000" }}
              >
                <Save size={14} />
                Guardar Banner
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
