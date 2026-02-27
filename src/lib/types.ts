export type Blog = {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  topic: string;
  date: string;
};

export type Project = {
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string; 
  thumbnail: string;
  date: string;  
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
