import { defineCollection, z } from "astro:content";

const caseStudies = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    slug: z.string(),
    cover: z.string().optional(),
  }),
});

const webProjects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    date: z.number(),
    slug: z.string(),
    thumbnail: z.string(),
  }),
});

export const collections = {
  "case-studies": caseStudies,
  "web-projects": webProjects,
};
