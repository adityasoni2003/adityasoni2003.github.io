import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

/* ---------------------------
   Theme observer hook
---------------------------- */
function useThemeKey() {
  const [themeKey, setThemeKey] = useState("light");

  useEffect(() => {
    const html = document.documentElement;

    const update = () => {
      setThemeKey(html.classList.contains("dark") ? "dark" : "light");
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return themeKey;
}

/* ---------------------------
   Dust animation variants
---------------------------- */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const dust: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 16,
    x: i,
    filter: "blur(6px)",
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


/* ---------------------------
   Dust text component
---------------------------- */
function DustText({
  text,
  themeKey,
}: {
  text: string;
  themeKey: string;
}) {
  return (
    <motion.span
      key={`${text}-${themeKey}`}
      variants={container}
      initial="hidden"
      animate="show"
      className="inline-block"
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={dust} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ---------------------------
   Hero Component
---------------------------- */
export default function HeroDust() {
  const themeKey = useThemeKey();

  return (
    <section className="relative w-full min-h-70 xl:min-h-100 max-w-360 pb-10 pt-5 px-4 mx-auto md:py-18">
      <div className="relative flex flex-col max-w-236 mx-auto">

        {/* OPEN TO WORK */}
        <motion.div
          key={`badge-${themeKey}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex items-center gap-1 max-w-fit p-1 px-2 rounded-full
                     bg-white 
                     shadow  "
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
          </span>
          <span className="text-[10px] font-medium tracking-wide">
            Open to Work
          </span>
        </motion.div>

        {/* SOFTWARE */}
        <h1 className="text-[clamp(3.5rem,8vw,7rem)] heading font-extrabold text-nowrap tracking-tight leading-none">
          <DustText text="Software" themeKey={themeKey} />
        </h1>

        {/* MOBILE ENGINEER */}
        <h2 className="text-[clamp(3.5rem,8vw,7rem)] heading text-nowrap block lg:hidden font-bold tracking-tight">
          <DustText text="Engineer" themeKey={themeKey} />
        </h2>

        {/* DESCRIPTION + DESKTOP ENGINEER */}

        <div className="flex flex-col md:flex-row items-start">
            <HeroDescription/>


          <h2 className="text-[clamp(3.5rem,8vw,7rem)] heading hidden lg:block font-bold text-nowrap tracking-tight">
            <DustText text="Engineer" themeKey={themeKey} />
          </h2>

        </div>

      </div>
    </section>
  );
}


const wordVariants: Variants = {
  hidden: { opacity: 0, y: -20 }, // start 20px above
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function HeroDescription() {
  const text = [
    "user focused,", 
    "backend capable,", 
    "cloud ready,", 
    "problem solver."
  ];


  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[90%] text-center py-[0.35rem] px-[0.6rem] xl:text-left lg:pl-4 lg:mt-5 lg:max-w-[50%] text-lg leading-relaxed"
    >
      {text.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={`inline-block mr-1 }`}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}