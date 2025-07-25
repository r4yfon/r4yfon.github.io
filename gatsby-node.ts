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

  // Query MDX files (not markdownRemark)
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
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

  mdxNodes.forEach((node) => {
    if (node.frontmatter.slug) {
      createPage({
        path: `/web-projects/${node.frontmatter.slug}`,
        component: `${path.resolve(
          "./src/templates/web-projects.tsx",
        )}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};
