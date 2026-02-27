import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Blogs", href: "/blogs" },
  { label: "Projects", href: "/projects" },
];

export default function HeaderClient() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }


  return (
    <header
        className="
          px-4 sticky top-0 z-50
          backdrop-blur-xl
          pt-5 pb-2
        "
      >

      <div className="max-w-236 relative mx-auto  backdrop-blur bg-white rounded-4xl shadow container flex h-16 items-center justify-between">

        {/* Name */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight code-subheading"
        >
          Aditya Soni
        </a>

        {/* Actions */}
        <div className="flex items-center gap-1">

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.85, rotate: 90 }}
            onClick={toggleTheme}
            className="p-2  cursor-pointer rounded-lg rounded-l-4xl border border-zinc-200 dark:border-zinc-700"
          >
            <AnimatePresence mode="wait">
              {dark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Moon size={18} className="cursor-pointer"/>
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Sun size={18} className="cursor-pointerf"/>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 cursor-pointer rounded-lg rounded-r-4xl border border-zinc-200 "
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      {/* Animated dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-6  overflow-hidden top-15 mt-2 w-44 rounded-xl border border-zinc-200  bg-white dark:bg-zinc-900 dark:shadow-amber-50 shadow-lg"
          >
            {menuItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm hover:bg-zinc-100 "
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      </div>

    </header>
  );
}
