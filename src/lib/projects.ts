import fs from "node:fs";
import path from "node:path";
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

/**
 * Media for a project lives in public/assets/<id>/ by convention (carried over from v2):
 *   thumbnail.webp · logo.webp · z_*.webp screenshots · y-demo.webm
 * Read at build time, so adding a file is all it takes.
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

/** "z_manager-team-schedule.webp" → "Manager team schedule" */
export function captionFromFile(src: string) {
  const name = src.split("/").pop()!.replace(/^z[-_]/, "").replace(/\.\w+$/, "").replace(/[-_]/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}
