import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type project = {
  frontmatter: {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: [string];
  };
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

const WebProjects: React.FC = () => {
  const [preview, setPreview] = useState<{ src: string; title: string }>({
    src: "",
    title: "Hover over a project for a preview.",
  });
  const isSmall = useMediaQuery("(max-width: 671px)");
  const orientation = isSmall ? "horizontal" : "vertical";
  const webProjects = useStaticQuery(graphql`
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: {
          internal: { contentFilePath: { regex: "/docs/web-projects/" } }
        }
      ) {
        nodes {
          frontmatter {
            slug
            tags
            title
            date
            description
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `).allMdx.nodes;

  return (
    <section
      id="projects"
      className="my-12 container px-4 sm:px-6 lg:px-8 mx-auto">
      <h2>Web Projects</h2>
      <div className="flex gap-10">
        {/* Carousel */}
        <Carousel orientation={orientation} className="!w-full md:!w-2/5">
          <div className="flex top-0 -translate-y-12 right-0 absolute md:hidden mb-2 justify-end gap-x-2">
            <CarouselPrevious className="static translate-0" />
            <CarouselNext className="static translate-0" />
          </div>
          <CarouselContent>
            {webProjects.map((item: project) => (
              <CarouselItem
                key={item.frontmatter.slug}
                className="!w-full flex-shrink-0"
                onMouseOver={() =>
                  setPreview({
                    src: `assets/${item.frontmatter.slug}/thumbnail.webp`,
                    title: item.frontmatter.title,
                  })
                }
                onFocus={() =>
                  setPreview({
                    src: `assets/${item.frontmatter.slug}/thumbnail.webp`,
                    title: item.frontmatter.title,
                  })
                }
                onMouseLeave={() =>
                  setPreview({
                    src: "",
                    title: "Hover over a project for a preview.",
                  })
                }>
                <Link
                  to={`/web-project/${item.frontmatter.slug}`}
                  className="block p-4 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors min-w-[80vw] md:min-w-0">
                  <span className="text-xl font-semibold">
                    {item.frontmatter.title}
                  </span>
                  <span className="text-sm ms-2 text-gray-500">
                    {item.frontmatter.date}
                  </span>
                  <p className="mt-2 text-gray-700 dark:text-gray-400">
                    {item.frontmatter.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.frontmatter.tags &&
                      item.frontmatter.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          {tag}
                        </span>
                      ))}
                  </div>
                  {/* Show screenshot in carousel on mobile only */}
                  <img
                    src={`assets/${item.frontmatter.slug}/thumbnail.webp`}
                    alt={item.frontmatter.title}
                    className="block mt-4 rounded-lg w-full aspect-video object-cover md:hidden"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Screenshot Preview (hidden on mobile, shown md+) */}
        <div className="hidden md:flex flex-col w-3/5 items-center justify-center min-h-[450px]">
          {preview.src ? (
            <>
              <img
                id="preview-img"
                src={`${preview.src}`}
                alt={preview.title}
                className="object-cover rounded-xl shadow-lg opacity-100 transition-opacity duration-300 -rotate-6 max-h-full"
              />
              <span className="mt-6">{preview.title}</span>
            </>
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
