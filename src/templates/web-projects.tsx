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
import { graphql } from "gatsby";
import { Globe } from "lucide-react";
import React from "react";

interface WebProjectTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        tags: string[];
        url?: string | null;
        website?: string | null;
        description: string;
        year: number;
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
  children: React.ReactNode;
}

const WebProjectTemplate: React.FC<WebProjectTemplateProps> = ({
  data,
  children,
}) => {
  const { frontmatter } = data.mdx;
  const images = data.allFile.nodes;

  // Helper function to determine if file is a video
  const isVideo = (extension: string) => {
    return ["webm", "mp4", "mov", "avi"].includes(extension.toLowerCase());
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              {frontmatter.year}
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
                  <Globe />
                  View on {frontmatter.website}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Image/Video Carousel */}
        {images.length > 0 && (
          <div className="mb-8">
            <Carousel className="max-w-4xl mx-auto">
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* MDX Content */}
        <div className="max-w-4xl mx-auto">
          <MarkdownContent>{children}</MarkdownContent>
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
        year
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
