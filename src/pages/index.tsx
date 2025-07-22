import WebProjects from "@/components/web-projects";
import type { HeadFC } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const IndexPage: React.FC = () => (
  <Layout pageTitle="Home">
    <WebProjects />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Ray Fon Watson</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </>
);
