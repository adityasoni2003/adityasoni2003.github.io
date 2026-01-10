import type {SkillsBannerProps} from "../lib/types"
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useState } from "react";


export default function SkillsBanner({ skills }: SkillsBannerProps) {
  /* duplicate list for seamless loop */
  const items = [...skills, ...skills];

  /* random border color per skill (stable) */
  const glowMap = useMemo(
    () =>
      skills.map(() => {
        const hues = [180, 200, 220, 260, 280];
        const h = hues[Math.floor(Math.random() * hues.length)];
        return `hsl(${h}, 70%, 65%)`;
      }),
    [skills]
  );


  return (
    <section className="relative w-full overflow-hidden pt-5 pb-10">


      <motion.div
        className="flex w-max gap-4 "
        animate={{ x: ["0%", "-50%"] }}
        transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {items.map((skill, i) => {
          const glow = glowMap[i % skills.length];

          return (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.06,
                boxShadow: `0 0 0 1px ${glow}, 0 0 18px ${glow}`,
              }}
              transition={{ duration: 0.2 }}
              className="
                px-5 py-2 rounded-full text-sm font-medium
                border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900
                text-zinc-800 dark:text-zinc-100
                whitespace-nowrap cursor-default
              "
            >
              {skill}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
