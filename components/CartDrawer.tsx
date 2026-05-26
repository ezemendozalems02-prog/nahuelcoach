"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const pathname = usePathname();
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    total,
    checkout,
    itemCount,
  } = useCart();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/65"
            style={{ backdropFilter: "blur(4px)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[400px] flex flex-col"
            style={{
              background: "rgba(5, 5, 9, 0.96)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 1px 0 0 rgba(255,255,255,0.04), -20px 0 60px -20px rgba(0,0,0,0.8)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(0,102,255,0.12)",
                    border: "1px solid rgba(0,102,255,0.22)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <ShoppingCart size={14} className="text-[#0066FF]" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Mi carrito</h2>
                  <p className="text-white/35 text-[11px]">
                    {itemCount} {itemCount === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white/35 hover:text-white transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-52 gap-4"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <ShoppingCart size={20} className="text-white/15" />
                    </div>
                    <p className="text-white/30 text-sm">Tu carrito está vacío</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.program.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
                      layout
                      className="flex gap-4 p-4 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                      }}
                    >
                      {/* Image thumbnail */}
                      <div
                        className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative"
                        style={{
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${item.program.image}')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-black/25" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate mb-0.5">
                          {item.program.name}
                        </p>
                        <p className="text-[#00CCFF] text-xs font-medium mb-3">
                          {item.program.duration}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.program.id, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-white text-sm font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.program.id, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className="font-bold text-sm"
                              style={{
                                background:
                                  "linear-gradient(135deg, #00CCFF, #0066FF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              ${item.program.price * item.quantity}
                            </span>
                            <button
                              onClick={() => removeItem(item.program.id)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 flex flex-col gap-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Totals */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-white/30">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div
                    className="h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(0,102,255,0.25), transparent)",
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-sm">Total</span>
                    <span
                      className="font-black tracking-tighter"
                      style={{
                        fontSize: "1.5rem",
                        background: "linear-gradient(135deg, #00CCFF, #0066FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ${total}{" "}
                      <span
                        className="text-sm font-normal tracking-normal"
                        style={{ WebkitTextFillColor: "rgba(255,255,255,0.3)" }}
                      >
                        USD
                      </span>
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={checkout}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl btn-primary text-white font-bold"
                >
                  <MessageCircle size={16} />
                  Comprar por WhatsApp
                  <ArrowRight size={14} />
                </button>

                <p className="text-white/18 text-[11px] text-center">
                  Se redireccionará a WhatsApp con tu pedido
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
