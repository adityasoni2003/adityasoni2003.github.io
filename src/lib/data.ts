import type { Blog, Project, AboutImage } from "./types";

/* ------------------------
   BLOGS
------------------------- */
export async function getBlogs(): Promise<Blog[]> {
  return [
    {
      title: "Understanding XOR in Data Structures",
      description:
        "A deep dive into XOR operations, common patterns, and how they are used in DSA problems.",
      url: "https://medium.com/@adityasoni/understanding-xor-in-dsa",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      topic: "Data Structures",
      date: "05/01/2025",
    },
    {
      title: "Building a Survey Platform Using MERN",
      description:
        "How I designed and implemented a scalable survey platform using MongoDB, Express, React, and Node.js.",
      url: "https://medium.com/@adityasoni/building-survey-platform-mern",
      thumbnail:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      topic: "System Design",
      date: "18/11/2024",
    },
    {
      title: "Static Site Generation vs SSR Explained",
      description:
        "A practical comparison between SSG and SSR with real-world examples and performance trade-offs.",
      url: "https://medium.com/@adityasoni/ssg-vs-ssr",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      topic: "Web Performance",
      date: "02/09/2024",
    },
  ];
}

/* ------------------------
   PROJECTS
------------------------- */
export async function getProjects(): Promise<Project[]> {
  return [
    {
      title: "Survey Analytics Platform",
      description:
        "An end-to-end survey creation and analytics platform used by market research teams.",
      liveUrl: "https://survey-platform.live",
      githubUrl: "https://github.com/adityasoni/survey-platform",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      date: "12/12/2024",
    },
    {
      title: "DSA Practice Tracker",
      description:
        "A web app to track DSA problems, patterns, and revision cycles with smart filtering.",
      liveUrl: "https://dsa-tracker.app",
      thumbnail:
        "https://images.unsplash.com/photo-1509228627159-6452c3b52c26",
      date: "20/10/2024",
    },
    {
      title: "Portfolio CMS",
      description:
        "A lightweight CMS built in React to manage blogs and case studies for static websites.",
      liveUrl: "https://portfolio-cms.dev",
      githubUrl: "https://github.com/adityasoni/portfolio-cms",
      thumbnail:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      date: "03/08/2024",
    },
  ];
}

export async function getAboutImages(): Promise<AboutImage[]> {
  return [
    // LANDSCAPE
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      type: "landscape",
      alt: "Workspace setup",
    },
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      type: "landscape",
      alt: "Coding environment",
    },

    // SQUARE
    {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      type: "square",
      alt: "Profile portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      type: "square",
      alt: "Casual photo",
    },

    // PORTRAIT
    {
      src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
      type: "portrait",
      alt: "Standing portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      type: "portrait",
      alt: "Outdoor portrait",
    },
  ];
}
