import type { GatsbySSR } from "gatsby";
import React from "react";

// v2 is an archived snapshot served at /v2/; keep search engines on the current site.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([<meta key="robots" name="robots" content="noindex" />]);
};
