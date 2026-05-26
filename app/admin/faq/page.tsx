"use client";

import { useEffect, useState } from "react";
import { getFAQs, saveFAQ, deleteFAQ } from "@/lib/data-service";
import { FAQ } from "@/types/admin";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  X
} from "lucide-react";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form / Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // Fields state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    loadFAQsList();
  }, []);

  async function loadFAQsList() {
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingFAQ(null);
    setQuestion("");
    setAnswer("");
    setActive(true);
    setOrder(faqs.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setActive(faq.active);
    setOrder(faq.order);
    setIsModalOpen(true);
  };

  const toggleFAQActive = async (faq: FAQ) => {
    const updated = { ...faq, active: !faq.active };
    try {
      await saveFAQ(updated);
      loadFAQsList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta pregunta frecuente? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const ok = await deleteFAQ(id);
      if (ok) {
        setNotification({
          type: "success",
          text: "Pregunta FAQ eliminada con éxito."
        });
        loadFAQsList();
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al intentar eliminar la pregunta FAQ."
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert("La pregunta y la respuesta son campos requeridos.");
      return;
    }

    const fData: FAQ = {
      id: editingFAQ ? editingFAQ.id : Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
      active,
      order: Number(order)
    };

    try {
      await saveFAQ(fData);
      setNotification({
        type: "success",
        text: editingFAQ ? "Pregunta FAQ modificada con éxito." : "Nueva pregunta FAQ creada con éxito."
      });
      setIsModalOpen(false);
      loadFAQsList();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: "Error al guardar la pregunta FAQ."
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
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">Gestión Preguntas Frecuentes (FAQ)</h1>
          <p className="text-white/40 text-sm font-light mt-2">
            Administra las dudas, resoluciones técnicas y de pago que se consultan en la sección FAQ de la web.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl text-white font-bold text-xs btn-primary shadow-lg flex items-center gap-2"
        >
          <Plus size={14} />
          Crear Pregunta FAQ
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

      {/* List Table */}
      <div className="rounded-3xl bg-[#09090f] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-white/40 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 pl-6 w-16">Orden</th>
                <th className="p-4">Pregunta</th>
                <th className="p-4">Respuesta</th>
                <th className="p-4 text-center w-24">Estado</th>
                <th className="p-4 pr-6 text-right w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-white/20 font-medium">
                    No se han encontrado preguntas cargadas.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-white/[0.01] transition-colors">
                    
                    {/* Order */}
                    <td className="p-4 pl-6">
                      <span className="w-6 h-6 rounded bg-white/5 flex items-center justify-center font-bold text-white/50 text-[10px]">
                        {faq.order}
                      </span>
                    </td>

                    {/* Question */}
                    <td className="p-4 font-semibold text-white max-w-[220px] truncate">{faq.question}</td>

                    {/* Answer */}
                    <td className="p-4 text-white/40 max-w-[320px] truncate">{faq.answer}</td>

                    {/* Active */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleFAQActive(faq)}
                        className={`w-8 h-8 rounded-lg inline-flex items-center justify-center border transition-all ${
                          faq.active
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                            : "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15"
                        }`}
                        title={faq.active ? "Desactivar" : "Activar"}
                      >
                        {faq.active ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(faq)}
                          className="w-8 h-8 rounded-lg inline-flex items-center justify-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/60 hover:text-white transition-all"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="w-8 h-8 rounded-lg inline-flex items-center justify-center border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all"
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

      {/* FAQ FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#09090f] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backdropFilter: "blur(25px)" }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <HelpCircle size={18} className="text-[#0066FF]" />
                {editingFAQ ? "Editar Pregunta FAQ" : "Crear Pregunta FAQ"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-5 overflow-y-auto">
              
              {/* Question */}
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Pregunta de la Consulta</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ej: ¿Hay seguimiento incluido en los programas?"
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all"
                />
              </div>

              {/* Answer */}
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Respuesta Detallada</label>
                <textarea
                  required
                  rows={5}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Escribe la respuesta explicativa..."
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs font-semibold focus:outline-none focus:border-[#0066FF] transition-all resize-none"
                />
              </div>

              {/* Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Orden de lista</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer hover:bg-white/[0.02] transition mt-5">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-[#09090f] text-[#0066FF] focus:ring-[#0066FF]/20"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Pregunta Activa</span>
                    <span className="text-[10px] text-white/35 font-light block">Visible en la sección FAQ del público</span>
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
              >
                <Save size={14} />
                Guardar FAQ
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
