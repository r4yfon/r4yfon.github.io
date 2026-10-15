import fs from "node:fs";
import path from "node:path";
import type { ImageMetadata } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export async function getProjects() {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.date.localeCompare(a.data.date));
}

/** "2025-04" → "Apr 2025" */
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1)).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** The problem → decision → impact story shown on featured cards and project pages; rows without text are left out */
export function projectStory(data: Project["data"]) {
  return [
    { term: "Problem", text: data.problem },
    { term: "Decision", text: data.decision },
    { term: "Impact", text: data.impact, highlight: true },
  ].filter((row): row is { term: string; text: string; highlight?: boolean } => Boolean(row.text));
}

/**
 * View-transition names a project's card and page share, so its thumbnail and title morph
 * between them. Thumbnails also get `data-vt-thumb`, which Base.astro uses to find them.
 */
export const vt = {
  thumb: (id: string) => `thumb-${id}`,
  title: (id: string) => `view-transition-name: title-${id}; view-transition-class: project-title`,
};

// Project images, optimised by astro:assets. Only files that match the convention are pulled in
const images = import.meta.glob<ImageMetadata>(
  ["/src/assets/projects/*/{thumbnail,logo}.webp", "/src/assets/projects/*/z[-_]*.{webp,png,jpg,jpeg}"],
  { eager: true, import: "default" },
);

/**
 * Media for a project lives in src/assets/projects/<id>/ by convention (carried over from v2):
 *   thumbnail.webp · logo.webp · z_*.webp screenshots
 * and its recording in public/assets/<id>/y-demo.webm. Read at build time, so adding a file is all
 * it takes. Anything else in the folder (e.g. a persona.webp kept for reference) stays out of the carousel.
 */
export function projectMedia(id: string) {
  const dir = `/src/assets/projects/${id}/`;
  const own = Object.keys(images)
    .filter((k) => k.startsWith(dir))
    .sort()
    .map((k) => ({ file: k.slice(dir.length), image: images[k] }));
  const find = (name: string) => own.find((m) => m.file === name)?.image;
  const videoDir = path.join(process.cwd(), "public", "assets", id);
  const video = fs.existsSync(videoDir) ? fs.readdirSync(videoDir).sort().find((f) => /^y[-_].+\.(webm|mp4)$/.test(f)) : undefined;
  return {
    thumbnail: find("thumbnail.webp"),
    logo: find("logo.webp"),
    screenshots: own.filter((m) => m.file.startsWith("z")).map((m) => ({ image: m.image, caption: captionFromFile(m.file) })),
    video: video && `/assets/${id}/${video}`,
  };
}

/** Widths for a srcset: those of `candidates` the image can fill, plus its own */
export function widthsFor(image: ImageMetadata, candidates: number[]) {
  return [...candidates.filter((w) => w < image.width), image.width];
}

/** "z_manager-team-schedule.webp" → "Manager team schedule"; a leading "01-" only sets the order and is dropped */
export function captionFromFile(src: string) {
  const name = src.split("/").pop()!.replace(/^z[-_](\d+[-_])?/, "").replace(/\.\w+$/, "").replace(/[-_]/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}
