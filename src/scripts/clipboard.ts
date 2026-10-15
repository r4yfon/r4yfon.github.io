import { blip } from "@/scripts/sound";

/** Copy text and chirp; false when the clipboard isn't available (permission denied, insecure context) */
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    blip(990);
    return true;
  } catch {
    return false;
  }
}

/** how long "copied" feedback stays up */
export const COPIED_MS = 1600;
