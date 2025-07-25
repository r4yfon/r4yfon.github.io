import { GatsbyNode } from "gatsby";
import path from "path";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib": path.resolve(__dirname, "src/lib"),
      },
    },
  });
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  // Query MDX files
  const result = await graphql(`
    query {
      allMdx(sort: { frontmatter: { year: DESC } }) {
        nodes {
          id
          frontmatter {
            slug
            title
            year
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const mdxNodes = result.data.allMdx.nodes;

  mdxNodes.forEach((node, index) => {
    if (node.frontmatter.slug) {
      // Calculate previous and next projects
      const prevProject =
        index > 0 ? mdxNodes[index - 1] : mdxNodes[mdxNodes.length - 1]; // Wrap to last
      const nextProject =
        index < mdxNodes.length - 1 ? mdxNodes[index + 1] : mdxNodes[0]; // Wrap to first

      createPage({
        path: `/web-projects/${node.frontmatter.slug}`,
        component: `${path.resolve(
          "./src/templates/web-projects.tsx",
        )}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug: node.frontmatter.slug,
          prevProject: {
            slug: prevProject.frontmatter.slug,
            title: prevProject.frontmatter.title,
          },
          nextProject: {
            slug: nextProject.frontmatter.slug,
            title: nextProject.frontmatter.title,
          },
        },
      });
    }
  });
};
