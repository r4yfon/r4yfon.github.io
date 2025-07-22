import * as path from "path";

import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  });
};

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allMarkdownRemark {
//         nodes {
//           frontmatter {
//             slug
//           }
//         }
//       }
//     }
//   `);

//   result.data.allMarkdownRemark.nodes.forEach((node) => {
//     createPage({
//       path: `/web-projects/${node.frontmatter.slug}`,
//       component: path.resolve(`src/pages/web-projects.tsx`),
//       context: { slug: node.frontmatter.slug },
//     });
//   });
// };
