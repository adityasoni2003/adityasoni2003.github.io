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
const cardVariants : Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
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

  useEffect(() => {
    if (activeIndex === null) return;

    const el = descRefs.current[activeIndex];
    if (!el) return;

    let rafId: number;
    let lastTime = 0;
    const speed = 0.015; // adjust scroll speed here

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      el.scrollTop += delta * speed;

      // 🔁 LOOP BACK TO TOP
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
        el.scrollTop = 0;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      el.scrollTop = 0; // reset when card closes
    };
  }, [activeIndex]);



  return (
    <motion.div
      className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }} // 🔥 triggers on scroll
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
            onClick={() => setActiveIndex(isActive ? null : idx)}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{skill.icon}</span>
              <h3 className="font-bold text-sm">
                {skill.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-hidden">
              {/* TECH */}
              <p
                className={`
                  text-sm transition-all duration-300
                  ${isActive ? "opacity-0 -translate-y-2" : "opacity-100"}
                  lg:group-hover:opacity-0
                `}
              >
                {skill.tech}
              </p>

              {/* DESCRIPTION */}
              <motion.div
                ref={(el) => {
                  descRefs.current[idx] = el;
                }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 16,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`
                  absolute inset-0 text-sm font-medium
                  overflow-y-auto pr-1
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
