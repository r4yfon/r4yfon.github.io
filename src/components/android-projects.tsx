import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

const AndroidProjects: React.FC = () => {
  const androidProjects = useStaticQuery(graphql`
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: {
          internal: { contentFilePath: { regex: "/docs/android-projects/" } }
        }
      ) {
        nodes {
          frontmatter {
            slug
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
      className="py-12 container px-4 sm:px-6 lg:px-8 mx-auto scroll-m-20"
      id="android-projects">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:flex-1/3 mb-8 lg:mb-0">
          <h2>Android Projects</h2>
          <p>
            A collection of simple Android projects, created as part of a
            university course to explore mobile app development concepts.
          </p>
        </div>
        <Carousel className="relative lg:flex-2/3">
          <div className="flex top-0 -translate-y-10 right-0 absolute lg:hidden mb-2 justify-end gap-x-2">
            <CarouselPrevious className="static translate-0" />
            <CarouselNext className="static translate-0" />
          </div>
          <CarouselContent className="flex">
            {androidProjects.map((project) => (
              <CarouselItem
                key={project.title}
                className="
                basis-full
                sm:basis-1/2
                lg:basis-1/3
                pr-6
                ">
                <Link
                  to={`/android-project/${project.frontmatter.slug}`}
                  className="relative block bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors rounded-xl hover:shadow-md p-2 mb-1 group">
                  <img
                    src={`assets/${project.frontmatter.slug}/logo.webp`}
                    alt={`${project.frontmatter.title} app logo`}
                    className="w-full h-48 object-contain aspect-square rounded-lg inset-shadow-sm"
                  />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">
                      {project.frontmatter.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {project.frontmatter.date}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default AndroidProjects;
