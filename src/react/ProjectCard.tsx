import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {

  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: index * 0.02,
      }}
      whileHover={{ y: -6 }}
      className="card p-6 rounded-2xl bg-white border border-zinc-200"
    >
      {/* Thumbnail */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />

      {/* Title */}
      <h3 className="text-lg font-semibold">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-zinc-600">
        {project.description}
      </p>

      {/* Links */}
      {project.githubUrl || project.liveUrl ? 
      <div className="mt-4 flex gap-4 text-sm items-center">
      { project.liveUrl &&  <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
        >
          <ExternalLink size={14} />
          Live
        </a>}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-600 hover:underline"
          >
            <Github size={14} />
            GitHub
          </a>
        )}
      </div>
     : null}


      {/* Date */}
      <p className="mt-4 text-xs text-zinc-400">
        Published on {formattedDate}
      </p>
    </motion.div>
  );
}
