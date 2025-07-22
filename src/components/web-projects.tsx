import { EmblaOptionsType } from "embla-carousel";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

// Example project type and data (replace with your actual data source)
type Project = {
  slug: string;
  title: string;
  date?: string;
  description: string;
  thumbnail: string;
};

// Simple useMediaQuery hook for client-side media queries
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const webProjects: Project[] = [
  // Example data; replace with your real data
  {
    slug: "my-first-project",
    title: "My First Project",
    date: "2024-01-01",
    description: "A cool project.",
    thumbnail: "/images/project1.png",
  },
  {
    slug: "my-second-project",
    title: "My Second Project",
    date: "2024-02-01",
    description: "Another cool project.",
    thumbnail: "/images/project2.png",
  },
  {
    slug: "portfolio-redesign",
    title: "Portfolio Redesign",
    date: "2024-03-15",
    description:
      "A modern redesign of my personal portfolio using Gatsby and Tailwind CSS.",
    thumbnail: "/images/portfolio-redesign.png",
  },
  {
    slug: "ecommerce-demo",
    title: "E-commerce Demo",
    date: "2024-04-10",
    description:
      "A demo e-commerce site with product listings, cart, and checkout flow.",
    thumbnail: "/images/ecommerce-demo.png",
  },
  {
    slug: "blog-platform",
    title: "Blog Platform",
    date: "2024-05-05",
    description:
      "A full-featured blog platform with markdown support and user authentication.",
    thumbnail: "/images/blog-platform.png",
  },
  // ...more projects
];

const options: EmblaOptionsType = {
  breakpoints: {
    "(min-width: 768px)": {
      // For tablets and up
      active: false,
    },
  },
};

const WebProjects: React.FC = () => {
  const [preview, setPreview] = useState<{ src: string; title: string }>({
    src: "",
    title: "Hover over a project for a preview.",
  });
  const isSmall = useMediaQuery("(max-width: 671px)");
  const orientation = isSmall ? "horizontal" : "vertical";

  return (
    <section
      id="projects"
      className="my-12 container px-4 sm:px-6 lg:px-8 mx-auto">
      <h2 className="text-3xl font-bold mb-8">Web Projects</h2>
      <div className="flex">
        {/* Carousel */}
        <Carousel
          orientation={orientation}
          opts={options}
          className="!w-full md:!w-2/5">
          <CarouselContent className="">
            {webProjects.map((item) => (
              <CarouselItem
                key={item.slug}
                className="!w-full flex-shrink-0"
                onMouseOver={() =>
                  setPreview({ src: item.thumbnail, title: item.title })
                }
                onFocus={() =>
                  setPreview({ src: item.thumbnail, title: item.title })
                }
                onMouseLeave={() =>
                  setPreview({
                    src: "",
                    title: "Hover over a project for a preview.",
                  })
                }>
                <a
                  href={`/web-projects/${item.slug}`}
                  className="block p-4 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors min-w-[80vw] md:min-w-0">
                  <span className="text-xl font-semibold">{item.title}</span>
                  <span className="text-sm ms-2 text-gray-500">
                    {item.date ?? ""}
                  </span>
                  <p className="mt-2 text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                  {/* Show screenshot in carousel on mobile only */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="block mt-4 rounded-lg w-full h-40 object-cover md:hidden"
                  />
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-12/14 -top-13 -translate-y-1/2  md:hidden" />
          <CarouselNext className="absolute right-0 -top-13 -translate-y-1/2  md:hidden" />
        </Carousel>

        {/* Screenshot Preview (hidden on mobile, shown md+) */}
        <div className="hidden md:flex flex-col w-3/5 items-center justify-center h-[450px]">
          {preview.src ? (
            <img
              id="preview-img"
              src={preview.src}
              alt={preview.title}
              className="object-cover rounded-xl shadow-lg opacity-100 transition-opacity duration-300 -rotate-6 max-h-full"
            />
          ) : (
            <>
              <svg
                id="preview-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ghost-icon lucide-ghost">
                <path d="M9 10h.01"></path>
                <path d="M15 10h.01"></path>
                <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"></path>
              </svg>
              <span id="preview-title" className="mt-6">
                Hover over a project for a preview.
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebProjects;
