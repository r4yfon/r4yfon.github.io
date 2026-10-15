// Read on every call rather than once at load, so flipping the OS setting mid-visit takes effect.
export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
