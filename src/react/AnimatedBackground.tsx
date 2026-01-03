import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  light: { lineColor: string; gridSize: string; glowColor: string };
  dark: { dotColor: string; lineColor: string; bgColor: string; dotSize: string };
  variant?: "grid-glow" | "grid" | "dots";
}

export default function AnimatedBackground({
  light,
  dark,
  variant = "grid-glow",
}: Props) {
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode from localStorage or html class
  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || html.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  // Observe <html> class changes (toggle button)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Light background style
  const lightStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    backgroundImage:
      variant === "grid-glow"
        ? `linear-gradient(to right, ${light.lineColor} 1px, transparent 1px),
           linear-gradient(to bottom, ${light.lineColor} 1px, transparent 1px),
           radial-gradient(circle 500px at 50% 200px, ${light.glowColor}, transparent)`
        : "",
    backgroundSize:
      variant === "grid-glow" ? `${light.gridSize}, ${light.gridSize}, auto` : "auto",
  };

  // Dark background style
  const darkStyle: React.CSSProperties = {
    backgroundColor: dark.bgColor,
    backgroundImage: `radial-gradient(${dark.dotColor} 1px, ${dark.bgColor} 1px),
                      linear-gradient(to right, ${dark.lineColor} 1px, transparent 1px),
                      linear-gradient(to bottom, ${dark.lineColor} 1px, transparent 1px)`,
    backgroundSize: `${dark.dotSize} ${dark.dotSize}, 6rem 4rem, 6rem 4rem`,
  };

  return (
    <AnimatePresence mode="wait">
      {!isDark ? (
        <motion.div
          key="light-bg"
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={lightStyle}
        />
      ) : (
        <motion.div
          key="dark-bg"
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={darkStyle}
        />
      )}
    </AnimatePresence>
  );
}
