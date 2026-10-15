import fs from "node:fs";
import path from "node:path";
import { imageMetadata } from "astro/assets/utils";
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

/**
 * Media for a project lives in public/assets/<id>/ by convention (carried over from v2):
 *   thumbnail.webp · logo.webp · z_*.webp screenshots · y-demo.webm
 * Read at build time, so adding a file is all it takes. Anything else in the folder (e.g. a
 * persona.webp kept for reference) stays out of the carousel.
 */
export function projectMedia(id: string) {
  const dir = path.join(process.cwd(), "public", "assets", id);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).sort() : [];
  const url = (f: string) => `/assets/${id}/${f}`;
  const find = (name: string) => (files.includes(name) ? url(name) : undefined);
  const video = files.find((f) => /^y[-_].+\.(webm|mp4)$/.test(f));
  return {
    thumbnail: find("thumbnail.webp"),
    logo: find("logo.webp"),
    screenshots: files.filter((f) => /^z[-_].+\.(webp|png|jpe?g)$/.test(f)).map(url),
    video: video && url(video),
  };
}

/** Width ÷ height of an image under public/, read from its header at build time; undefined for anything it can't read (videos) */
export async function aspectOf(src: string) {
  try {
    const { width, height } = await imageMetadata(fs.readFileSync(path.join(process.cwd(), "public", src)), src);
    return width / height;
  } catch {
    return undefined;
  }
}

/** "z_manager-team-schedule.webp" → "Manager team schedule"; a leading "01-" only sets the order and is dropped */
export function captionFromFile(src: string) {
  const name = src.split("/").pop()!.replace(/^z[-_](\d+[-_])?/, "").replace(/\.\w+$/, "").replace(/[-_]/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}
