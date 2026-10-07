// Tiny synthesised UI sounds. Off by default; nothing is downloaded.
// Shared module, so every component script talks to the same on/off state.

let on = false;
let ctx: AudioContext | null = null;

export const isSoundOn = () => on;

export function setSound(value: boolean) {
  on = value;
  document.dispatchEvent(new CustomEvent("rf:sound", { detail: on }));
}

export function blip(freq = 520, dur = 0.07) {
  if (!on) return;
  try {
    ctx ??= new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const t = ctx.currentTime;
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(t + dur + 0.06);
  } catch {
    // audio is a nicety; ignore failures
  }
}

// any element with [data-blip] chirps softly when the pointer enters it
document.addEventListener("pointerover", (e) => {
  const el = (e.target as Element).closest?.("[data-blip]");
  if (el && !el.contains(e.relatedTarget as Node | null)) blip(460 + Math.random() * 120, 0.04);
});
