import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

type CaseStudy = {
  frontmatter: {
    slug: string;
    title: string;
    date: string;
    description: string;
  };
  internal: {
    contentFilePath: string;
  };
};

const CaseStudies: React.FC = () => {
  const caseStudies = useStaticQuery(graphql`
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: {
          internal: { contentFilePath: { regex: "/docs/case-studies/" } }
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
      id="case-studies">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:flex-1/3 mb-8 lg:mb-0">
          <h2>UI/UX Case Studies</h2>
          <p>
            Explore my process and outcomes in designing user interfaces and
            experiences for web and mobile projects.
          </p>
        </div>
        <Carousel className="relative lg:flex-2/3">
          <div className="flex top-0 -translate-y-10 right-0 absolute lg:hidden mb-2 justify-end gap-x-2">
            <CarouselPrevious className="static translate-0" />
            <CarouselNext className="static translate-0" />
          </div>
          <CarouselContent className="flex">
            {caseStudies.map((study: CaseStudy) => (
              <CarouselItem
                key={study.frontmatter.slug}
                className="
                  basis-full
                  sm:basis-1/2
                  lg:basis-1/3
                  pr-6 mb-1
                ">
                <Link
                  to={`/case-study/${study.frontmatter.slug}`}
                  className="relative block bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors rounded-xl hover:shadow-md p-2 group">
                  <img
                    src={`assets/${study.frontmatter.slug}/cover.webp`}
                    alt={`${study.frontmatter.title} case study cover`}
                    className="w-full h-48 object-contain aspect-square rounded-lg inset-shadow-sm"
                  />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">
                      {study.frontmatter.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {study.frontmatter.date}
                    </span>
                    <p className="mt-2">{study.frontmatter.description}</p>
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

export default CaseStudies;
