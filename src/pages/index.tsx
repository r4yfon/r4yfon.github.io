import WebProjects from "@/components/web-projects";
import type { HeadFC } from "gatsby";
import React from "react";
import Navbar from "../components/navbar";

const IndexPage: React.FC = () => (
  <>
    <Navbar />
    <WebProjects />
  </>
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
