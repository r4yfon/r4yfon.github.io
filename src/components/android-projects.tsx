import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

const projects = [
  {
    title: "Mobile Legends: Bang Bang",
    category: "Action • Strategy",
    rating: 3.8,
    image: "/images/mlbb.jpg", // Replace with your actual image paths
    url: "https://play.google.com/store/apps/details?id=com.mobile.legends",
  },
  {
    title: "Free Fire MAX",
    category: "Action • Tactical shooter",
    rating: 4.5,
    image: "/images/freefire.jpg",
    url: "https://play.google.com/store/apps/details?id=com.dts.freefiremax",
  },
  {
    title: "Clash Royale",
    category: "Strategy • Tower defense",
    rating: 3.9,
    image: "/images/clashroyale.jpg",
    url: "https://play.google.com/store/apps/details?id=com.supercell.clashroyale",
  },
];

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
    <section className="py-12 container px-4 sm:px-6 lg:px-8 mx-auto">
      <h2>Android Projects</h2>
      <Carousel
        className="relative"
        opts={{
          align: "start",
          slidesToScroll: 1,
          loop: false,
        }}>
        <CarouselContent
          className="
            [&>div]:transition-all
            flex
            ">
          {androidProjects.map((project, idx) => (
            <CarouselItem
              key={project.title}
              className="
                basis-full
                sm:basis-1/2
                lg:basis-1/3
                pr-6
                "
              style={{
                minWidth: "0",
              }}>
              <Link
                to={`/android-project/${project.frontmatter.slug}`}
                className="block bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                {/* <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    {project.frontmatter.title}
                  </h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default AndroidProjects;
