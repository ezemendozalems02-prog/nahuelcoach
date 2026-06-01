"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Routine as Program } from "@/types/admin";

import { getSettingsFromStorage } from "@/lib/local-storage-service";

export interface CartItem {
  program: Program;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  addItem: (program: Program) => void;
  removeItem: (programId: string) => void;
  updateQuantity: (programId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.program.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback((program: Program) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.program.id === program.id);
      if (existing) {
        return prev.map((i) =>
          i.program.id === program.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { program, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((programId: string) => {
    setItems((prev) => prev.filter((i) => i.program.id !== programId));
  }, []);

  const updateQuantity = useCallback((programId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.program.id !== programId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.program.id === programId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const checkout = useCallback(() => {
    if (items.length === 0) return;
    const itemsList = items
      .map((i) => `- ${i.program.name} x${i.quantity} ($${(i.program.price * i.quantity).toLocaleString("es-AR")} ARS)`)
      .join("\n");
    const message = encodeURIComponent(
      `Hola Nahuel! 👋\n\nQuiero comprar:\n${itemsList}\n\n💰 Total: $${total.toLocaleString("es-AR")} ARS\n\nMi nombre:\nMi objetivo principal:\n\n¿Podemos coordinar?`
    );
    const settings = typeof window !== "undefined" ? getSettingsFromStorage() : null;
    const whatsappNum = settings?.whatsappNumber || "541136361630";
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, "_blank");
  }, [items, total]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        total,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
