/**
 * Layout maths shared by the carousel's server render and its client script, so the page
 * paints with the right grouping before JS runs and the script only has to regroup when a
 * video reports its real shape.
 */

/** the carousel frame, width ÷ height */
export const FRAME = 16 / 10;

/** narrower than this is a phone screen or a portrait page: a candidate for sharing a spread */
const PORTRAIT = 0.8;
/** how far apart two aspects can be and still sit side by side without looking mismatched */
const SIMILAR = 1.2;
/** a spread may run this much wider than the frame before it drops a shot (a hair of crop beats a lonely slide) */
const OVERFLOW = 1.05;
/** a lone shot within this much of the frame's shape just fills it; anything further gets the blurred backdrop */
const FILL_TOLERANCE = 0.15;

/** two shots that can share a spread: both portrait, and close enough in shape */
const pairs = (a: number, b: number) => a <= PORTRAIT && b <= PORTRAIT && Math.max(a, b) / Math.min(a, b) <= SIMILAR;

/**
 * Splits slides into stops, the things prev/next and the counter step through, as lists of
 * slide indexes. Runs of similar portrait shots share a spread, side by side, as many as fit the frame (and `max`), balanced so 4 phones go 2 + 2, not 3 + 1.
 */
export function planStops(aspects: number[], max = 3): number[][] {
  const stops: number[][] = [];
  let i = 0;
  while (i < aspects.length) {
    // a run of similar portrait slides
    let end = i + 1;
    while (end < aspects.length && pairs(aspects[i], aspects[end])) end++;
    const run = end - i;
    const mean = aspects.slice(i, end).reduce((a, b) => a + b, 0) / run;
    const fit = Math.max(1, Math.min(max, Math.floor((FRAME * OVERFLOW) / mean)));
    const count = Math.ceil(run / fit);
    for (let s = 0; s < count; s++) {
      const size = Math.floor(run / count) + (s < run % count ? 1 : 0);
      stops.push(Array.from({ length: size }, (_, k) => i + k));
      i += size;
    }
  }
  return stops;
}

/** a stop's caption: "Wireframe 1", "Wireframe 2" → "Wireframe 1–2"; anything else is joined */
export function stopCaption(captions: string[]) {
  if (captions.length < 2) return captions[0] ?? "";
  const parts = captions.map((c) => c.match(/^(.*?)\s*(\d+)$/));
  if (parts.every((p) => p && p[1] === parts[0]![1])) return `${parts[0]![1]} ${parts[0]![2]}–${parts.at(-1)![2]}`;
  return captions.join(" · ");
}

export interface SlideFit {
  /** shots in this slide's stop, and the sum of their aspects (to size a spread) */
  n: number;
  sum: number;
  start: boolean;
  end: boolean;
  /** shown in a box of a different shape, so the gap gets a blurred fill */
  fill: boolean;
}

/** what each slide needs to know about its stop, for the CSS to size it */
export function fitSlides(aspects: number[], stops: number[][]): SlideFit[] {
  const fits: SlideFit[] = [];
  for (const stop of stops) {
    const sum = stop.reduce((a, i) => a + aspects[i], 0);
    stop.forEach((i, k) => {
      // a spread fits its shots exactly; a slide on its own gets the whole frame
      const fill = stop.length === 1 && Math.abs(aspects[i] / FRAME - 1) > FILL_TOLERANCE;
      fits[i] = { n: stop.length, sum, start: k === 0, end: k === stop.length - 1, fill };
    });
  }
  return fits;
}
