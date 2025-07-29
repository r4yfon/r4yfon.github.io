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
        "@/constants": path.resolve(__dirname, "src/constants"),
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
  const webProjectResults = await graphql(`
    query {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: {
          internal: { contentFilePath: { regex: "/docs/web-projects/" } }
        }
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
            date
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const androidProjectResults = await graphql(`
    query {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: {
          internal: { contentFilePath: { regex: "/docs/android-projects/" } }
        }
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
            date
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (webProjectResults.errors) {
    throw webProjectResults.errors;
  }

  if (androidProjectResults.errors) {
    throw androidProjectResults.errors;
  }

  const webProjectMdxNodes = (
    webProjectResults.data as {
      allMdx: {
        nodes: Array<{
          id: string;
          frontmatter: {
            slug: string;
            title: string;
            date: string;
          };
          internal: {
            contentFilePath: string;
          };
        }>;
      };
    }
  ).allMdx.nodes;

  const androidProjectMdxNodes = (
    androidProjectResults.data as {
      allMdx: {
        nodes: Array<{
          id: string;
          frontmatter: {
            slug: string;
            title: string;
            date: string;
          };
          internal: {
            contentFilePath: string;
          };
        }>;
      };
    }
  ).allMdx.nodes;

  webProjectMdxNodes.forEach((node, index) => {
    if (node.frontmatter.slug) {
      // Calculate previous and next projects
      const prevProject =
        index > 0
          ? webProjectMdxNodes[index - 1]
          : webProjectMdxNodes[webProjectMdxNodes.length - 1]; // Wrap to last
      const nextProject =
        index < webProjectMdxNodes.length - 1
          ? webProjectMdxNodes[index + 1]
          : webProjectMdxNodes[0]; // Wrap to first

      createPage({
        path: `/web-project/${node.frontmatter.slug}`,
        component: `${path.resolve(
          "./src/templates/web-project.tsx",
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

  androidProjectMdxNodes.forEach((node, index) => {
    if (node.frontmatter.slug) {
      // Calculate previous and next projects
      const prevProject =
        index > 0
          ? androidProjectMdxNodes[index - 1]
          : androidProjectMdxNodes[androidProjectMdxNodes.length - 1]; // Wrap to last
      const nextProject =
        index < androidProjectMdxNodes.length - 1
          ? androidProjectMdxNodes[index + 1]
          : androidProjectMdxNodes[0]; // Wrap to first

      createPage({
        path: `/android-project/${node.frontmatter.slug}`,
        component: `${path.resolve(
          "./src/templates/android-project.tsx",
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
