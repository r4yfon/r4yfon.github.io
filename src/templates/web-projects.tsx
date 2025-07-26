import Layout from "@/components/layout";
import MarkdownContent from "@/components/markdown-content";
import { Button } from "@/components/ui/button";
import { graphql } from "gatsby";
import React from "react";

interface WebProjectTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        thumbnail: string;
        tags: string[];
        github?: string | null;
        description: string;
        year: number;
      };
    };
  };
  children: React.ReactNode;
}

const WebProjectTemplate: React.FC<WebProjectTemplateProps> = ({
  data,
  children,
}) => {
  const { frontmatter } = data.mdx;

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
            {frontmatter.github && (
              <Button asChild>
                <a
                  href={frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {frontmatter.thumbnail && (
          <div className="mb-8">
            <img
              src={`/images/${frontmatter.thumbnail}`}
              alt={frontmatter.title}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            />
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
        thumbnail
        tags
        github
        description
        year
      }
    }
  }
`;
