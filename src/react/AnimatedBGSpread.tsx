import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  headerCenter?: { x: string; y: string };
}

export default function BackgroundSpread({ headerCenter = { x: "50%", y: "64px" } }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || html.classList.contains("dark")) setIsDark(true);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isDark ? "dark-overlay" : "light-overlay"}
        className="absolute inset-0 -z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: isDark
            ? `radial-gradient(circle at ${headerCenter.x} ${headerCenter.y}, #0b1226 0%, #0b1226 100%)`
            : `radial-gradient(circle at ${headerCenter.x} ${headerCenter.y}, #C9EBFF33 0%, transparent 100%)`,
        }}
      />
    </AnimatePresence>
  );
}
