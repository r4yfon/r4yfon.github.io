import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MDXProvider } from "@mdx-js/react";
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
    body: string;
  };
}

const WebProjectTemplate: React.FC<WebProjectTemplateProps> = ({ data }) => {
  const { frontmatter, body } = data.mdx;

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
          {/* <div
            className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8
                          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6
                          [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:mt-4
                          [&>p]:mb-4 [&>p]:leading-relaxed
                          [&>ul]:mb-4 [&>ul]:pl-6 [&>li]:mb-1 [&>li]:list-disc
                          [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-800
                          dark:[&>a]:text-blue-400 dark:hover:[&>a]:text-blue-300
                          [&>img]:rounded-lg [&>img]:shadow-md [&>img]:my-6 [&>img]:max-w-full">
            {body}
          </div> */}
          <MDXProvider>{body}</MDXProvider>
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
      body
    }
  }
`;
