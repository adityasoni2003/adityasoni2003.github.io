import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = [
  { icon: <Github size={20} />, href: "https://github.com/yourusername" },
  { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourusername" },
  { icon: <Mail size={20} />, href: "mailto:your.email@example.com" },
];

export default function AutoExpandingMenu() {
  const [expanded, setExpanded] = useState(false);

  // Expand automatically on load
  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-30  left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Ball / initial placeholder */}
      {!expanded && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          className="w-14 h-14 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-lg flex items-center justify-center"
        >
          <span className="text-white dark:text-zinc-900 font-bold">AS</span>
        </motion.div>
      )}

      {/* Expanded Menu */}
      {expanded && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 shadow-lg space-y-4"
        >
          {/* Icons row */}
          <div className="flex space-x-6">
            {menuItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
                className="text-zinc-900 dark:text-zinc-100"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>

          {/* Text */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Let's Connect &rarr;
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}
