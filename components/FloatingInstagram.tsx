"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { InstagramIcon } from "@/components/SocialIcons";

export default function FloatingInstagram() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
          className="fixed bottom-8 right-5 z-50 flex flex-col items-end gap-2"
        >
          <AnimatePresence>
            {expanded && (
              <motion.a
                href="https://www.instagram.com/nahuel.coach/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-white text-sm font-semibold whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                  boxShadow: "0 8px 24px rgba(253,29,29,0.35)",
                }}
              >
                <InstagramIcon size={16} />
                @nahuel.coach
              </motion.a>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setExpanded(!expanded)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
              boxShadow: "0 8px 30px rgba(253,29,29,0.4)",
            }}
            aria-label="Instagram"
          >
            <InstagramIcon size={24} />
            <motion.span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: "0 0 0 2px rgba(253,29,29,0.5)" }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
