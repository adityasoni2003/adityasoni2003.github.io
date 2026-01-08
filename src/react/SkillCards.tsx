"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Skill {
  title: string;
  icon: string;
  tech: string;
  description: string;
  colSpan: string;
}

interface SkillsCardsProps {
  skills: Skill[];
}

/* 🔹 Card animation */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
};

export default function SkillsCards({ skills }: SkillsCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  /* 🔁 Auto-scroll */
  useEffect(() => {
    if (activeIndex === null) return;

    const el = descRefs.current[activeIndex];
    if (!el) return;

    let lastTime = 0;
    const speed = 0.015;

    const step = (time: number) => {
      if (isInteractingRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      el.scrollTop += delta * speed;


      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.scrollTop = 0;
      lastTime = 0;
    };
  }, [activeIndex]);

  /* 🛑 Interaction handlers */
  const pauseAutoScroll = () => {
    isInteractingRef.current = true;
  };

  const resumeAutoScroll = () => {
    isInteractingRef.current = false;
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {skills.map((skill, idx) => {
        const isActive = activeIndex === idx;

        return (
          <motion.div
            key={skill.title}
            custom={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className={`group ${skill.colSpan}
              cursor-pointer bg-white border border-gray-200 rounded-2xl
              p-4 lg:p-6 flex flex-col min-h-30
            `}
            onClick={() => setActiveIndex(idx)}
            onHoverStart={() => setActiveIndex(isActive ? null : idx)}

          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{skill.icon}</span>
              <h3 className="font-bold text-sm">{skill.title}</h3>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-hidden">
              {/* TECH */}
              <p
                className={`
                  text-sm transition-all duration-300
                  ${isActive ? "opacity-0 -translate-y-2" : "opacity-100"}
                `}
              >
                {skill.tech}
              </p>

              {/* DESCRIPTION */}
              <motion.div
                ref={(el) => {descRefs.current[idx] = el}}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 16,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onMouseDown={pauseAutoScroll}
                onMouseUp={resumeAutoScroll}
                onMouseLeave={resumeAutoScroll}
                onTouchStart={pauseAutoScroll}
                onTouchEnd={resumeAutoScroll}
                onWheel={pauseAutoScroll}
                className={`
                  absolute inset-0 text-sm font-medium
                  overflow-y-auto pr-1 no-scrollbar
                  ${isActive ? "pointer-events-auto" : "pointer-events-none"}
                `}
              >
                {skill.description}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
