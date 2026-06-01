"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-8 right-5 z-50 flex flex-col items-end gap-3"
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/541136361630"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 rounded-2xl overflow-hidden shadow-lg"
            aria-label="WhatsApp"
          >
            <span className="hidden group-hover:flex items-center px-3 py-2 text-white text-xs font-semibold whitespace-nowrap rounded-l-2xl"
              style={{ background: "#25D366" }}>
              Escribinos
            </span>
            <div
              className="w-14 h-14 flex items-center justify-center text-white"
              style={{
                background: "#25D366",
                boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
              }}
            >
              <MessageCircle size={24} fill="white" strokeWidth={0} />
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/nahuel.coach/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 rounded-2xl overflow-hidden shadow-lg"
            aria-label="Instagram"
          >
            <span className="hidden group-hover:flex items-center px-3 py-2 text-white text-xs font-semibold whitespace-nowrap rounded-l-2xl"
              style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
              @nahuel.coach
            </span>
            <div
              className="w-14 h-14 flex items-center justify-center text-white relative"
              style={{
                background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
                boxShadow: "0 8px 24px rgba(253,29,29,0.35)",
              }}
            >
              <InstagramIcon size={24} />
              <motion.span
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-white"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ boxShadow: "0 0 0 2px rgba(253,29,29,0.4)" }}
              />
            </div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
