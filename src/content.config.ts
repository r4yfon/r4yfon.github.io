import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  // the entry id comes from the `slug` frontmatter, falling back to the filename
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}$/, "use YYYY-MM"),
    description: z.string(),
    kind: z.enum(["web", "android", "case-study"]),
    role: z.string(),
    tags: z.array(z.string()).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    // the PM framing shown on featured cards and detail pages
    problem: z.string().optional(),
    decision: z.string().optional(),
    impact: z.string().optional(),
  }),
});

export const collections = { projects };
