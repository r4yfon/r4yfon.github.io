import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const WebProject: React.FC = () => {
  // const { frontmatter, body } = data.mdx;
  const webProject = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
          html
        }
      }
    }
  `).allMarkdownRemark;

  return (
    <Layout pageTitle="Project">
      <h1>{webProject.title}</h1>
      <p>{webProject.year}</p>
      <img src={`/images/${webProject.thumbnail}`} alt={webProject.title} />
      <p>{webProject.description}</p>
      <div>
        {webProject.tags &&
          webProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <a href={webProject.github}>GitHub</a>
      {/* {webProject.demo && <a href={webProject.demo}>Live Demo</a>} */}
      <hr />
      {/* Render the full body (MDX) */}
      <div>
        {/* If using gatsby-plugin-mdx: */}
        <div dangerouslySetInnerHTML={{ __html: webProject.html }} />
      </div>
    </Layout>
  );
};

export default WebProject;
