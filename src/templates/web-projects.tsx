import Layout from "@/components/layout";
import MarkdownContent from "@/components/markdown-content";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { graphql, Link } from "gatsby";
import { ChevronLeft, ChevronRight, CodeXml, Globe } from "lucide-react";
import React from "react";

interface WebProjectTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        tags: string[];
        url: string;
        website: string;
        description: string;
        date: string;
        demo?: string;
      };
    };
    allFile: {
      nodes: Array<{
        publicURL: string;
        name: string;
        extension: string;
      }>;
    };
  };
  pageContext: {
    slug: string;
    prevProject: {
      slug: string;
      title: string;
    };
    nextProject: {
      slug: string;
      title: string;
    };
  };
  children: React.ReactNode;
}

const WebProjectTemplate: React.FC<WebProjectTemplateProps> = ({
  data,
  pageContext,
  children,
}) => {
  const { frontmatter } = data.mdx;
  const images = data.allFile.nodes;
  const { prevProject, nextProject } = pageContext;

  // Helper function to determine if file is a video
  const isVideo = (extension: string) => {
    return ["webm", "mp4", "mov", "avi"].includes(extension.toLowerCase());
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex">
          <Link
            to="/"
            className="px-3 py-2 hover:underline flex gap-x-2 items-center">
            <ChevronLeft />
            Back to home
          </Link>
        </div>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              {frontmatter.date}
            </span>
          </div>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            {frontmatter.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {frontmatter.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {frontmatter.url && (
              <Button asChild>
                <a
                  href={frontmatter.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  <CodeXml />
                  View on {frontmatter.website}
                </a>
              </Button>
            )}
            {frontmatter.demo && (
              <Button asChild>
                <a
                  href={frontmatter.demo}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Globe />
                  View Site
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Image/Video Carousel */}
        {images.length > 0 && (
          <div className="mb-8">
            <Carousel className="max-w-4xl mx-auto">
              <div className="flex top-0 -translate-y-16 right-0 absolute mb-2 justify-end gap-x-2">
                <CarouselPrevious className="static translate-0" />
                <CarouselNext className="static translate-0" />
              </div>
              <CarouselContent>
                {images.map((media, index) => (
                  <CarouselItem key={index} className="content-center">
                    <div className="p-2">
                      {isVideo(media.extension) ? (
                        <video
                          src={media.publicURL}
                          controls
                          autoPlay={false}
                          muted
                          loop
                          className="w-full rounded-lg shadow-lg"
                          aria-label={`${frontmatter.title} video ${
                            index + 1
                          }`}>
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={media.publicURL}
                          alt={`${frontmatter.title} screenshot ${index + 1}`}
                          className="w-full rounded-lg shadow-lg"
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* MDX Content */}
        <div className="max-w-4xl mx-auto">
          <MarkdownContent>{children}</MarkdownContent>
        </div>

        {/* Project Navigation */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Button
              asChild
              variant="outline"
              className="flex items-center h-auto gap-2">
              <Link to={`/web-projects/${prevProject.slug}`}>
                <ChevronLeft className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Previous
                  </div>
                  <div className="font-medium">{prevProject.title}</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex items-center h-auto gap-2">
              <Link to={`/web-projects/${nextProject.slug}`}>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Next
                  </div>
                  <div className="font-medium">{nextProject.title}</div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebProjectTemplate;

export const query = graphql`
  query ($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        url
        website
        description
        date
        demo
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "assets" }
        relativeDirectory: { eq: $slug }
        extension: { in: ["webp", "gif", "webm"] }
      }
      sort: { name: ASC }
    ) {
      nodes {
        publicURL
        name
        extension
      }
    }
  }
`;
