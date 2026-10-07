# r4yfon.github.io

Personal portfolio of Ray Fon: product manager × fullstack engineer.

Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages.

## Develop

```sh
bun install
bun run dev       # http://localhost:4321
bun run build     # static site in dist/
bun run check     # type-check .astro and .ts files
```

## Where things live

| What | Where |
| --- | --- |
| Bio, links, experience, principles, changelog | `src/data/site.ts` |
| Projects (one Markdown file each) | `src/content/projects/*.md` |
| Project images | `public/assets/<project-id>/`: `thumbnail.webp`, `logo.webp`, `z_*.webp` screenshots, `y-demo.webm` |
| Design tokens (colours, fonts, easing) | `src/styles/global.css` |
| Archived v2 (Gatsby build, served at `/v2/`) | `public/v2/`, source on the `v2` tag |

### Adding a project

Create `src/content/projects/<id>.md`:

```md
---
title: "My Project"
date: "2026-03"
description: "One sentence on what it is."
kind: web            # web | android | case-study
role: "Solo"
tags: [Astro, Supabase]
repo: https://github.com/r4yfon/my-project
demo: https://my-project.example
featured: true       # show as a full card on the home page
order: 4
problem: "What was broken, for whom."
decision: "What you chose to build and why."
impact: "What changed because of it."
---

Longer write-up in Markdown.
```
