import AndroidProjects from "@/components/android-projects";
import Hero from "@/components/hero";
import WebProjects from "@/components/web-projects";
import type { HeadFC } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <WebProjects />
    <AndroidProjects />
    {/* <CaseStudies /> */}
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Ray Fon Watson</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:image" content="/assets/social-banner.png" />
    <meta name="twitter:image" content="/assets/social-banner.png" />
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
  </>
);
