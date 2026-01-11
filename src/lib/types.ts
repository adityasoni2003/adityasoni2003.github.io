export type Blog = {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  topic: string;
  date: string; // dd/mm/yyyy
};

export type Project = {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;   // optional
  thumbnail: string;
  date: string;  // dd/mm/yyyy
};

export type AboutImage = {
  src: string;
  type: "landscape" | "square" | "portrait";
  alt?: string;
};

export interface SkillsBannerProps {
  skills: string[];
}
export interface FeaturedBlogsProps {
  blogs: Blog[];
}
export interface FeaturedProjectsProps {
  projects: Project[];
}
export interface ImageCarouselProps {
  images: AboutImage[];
}
