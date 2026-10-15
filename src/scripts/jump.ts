import { reducedMotion } from "@/scripts/motion";

/**
 * Glide to an in-page section and move focus there. Used by the sidebar and the section sheet
 * instead of the native jump: the `html:focus-within` smooth-scroll rule in global.css only kicks
 * in when the clicked link takes focus, which Safari and Firefox on macOS never give it on click.
 */
export function jumpTo(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;
  history.pushState(null, "", hash);
  target.scrollIntoView({ behavior: reducedMotion() ? "instant" : "smooth", block: "start" });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}
