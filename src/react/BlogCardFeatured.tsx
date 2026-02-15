import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Blog } from "../lib/types";


interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
  return (
    <motion.a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: index * 0.03,
      }}
      className="
        group
        block
        card
        p-6 md:p-8
        rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        transition
      "
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-semibold tracking-wide
                         text-zinc-500 dark:text-zinc-400">
          {blog.topic}
        </span>

        <ExternalLink
          size={14}
          className="text-zinc-400 transition
                     group-hover:text-zinc-600
                     dark:group-hover:text-zinc-300"
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
        {blog.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-3 text-sm leading-relaxed
                    text-zinc-600 dark:text-zinc-400
                    max-w-[65ch]">
        {blog.description}
      </p>

      {/* FOOTER */}
      <div className="mt-6 text-xs text-zinc-400">
        {blog.date}
      </div>
    </motion.a>
  );
}
