import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Blog {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  topic: string;
  date: string;
}

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
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: index * 0.02,
      }}
      whileHover={{ y: -6 }}
      className="
        cursor-pointer
        card block p-6 rounded-2xl
        bg-white border border-zinc-200
        hover:border-zinc-300 transition
      "
    >
      {/* Thumbnail */}
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />

      {/* Topic */}
      <span className="text-xs uppercase text-blue-600 font-semibold tracking-wide">
        {blog.topic}
      </span>

      {/* Title */}
      <h3 className="mt-2 text-lg font-semibold leading-snug">
        {blog.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-zinc-600">
        {blog.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          Published on {blog.date}
        </p>

        <ExternalLink
          size={14}
          className="text-zinc-400 group-hover:text-zinc-600"
        />
      </div>
    </motion.a>
  );
}
