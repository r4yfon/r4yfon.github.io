// Everything about me that isn't a project lives here, so copy edits never touch components.

export const site = {
  name: "Ray Fon",
  title: "Ray Fon Watson",
  roles: ["Product Manager", "Fullstack Engineer"],
  pitch: "I build products people actually use, from the user interview to the database migration.",
  description:
    "Ray Fon: product manager and fullstack engineer. Information Systems + Psychology, building products from user interview to deploy.",
  email: "srayfon93@gmail.com",
  resume: "https://drive.google.com/file/d/1MgVRyODk7uSJJZAsI1NL414Pc5kfXJlT/view?usp=drive_link",
  github: "https://github.com/r4yfon",
  linkedin: "https://www.linkedin.com/in/rayfon",
  version: "3.0",
};

/**
 * About section paragraphs. Inline HTML is allowed:
 * <strong> for emphasis, <mark> for the peach highlighter.
 */
export const about = [
  "I'm an undergraduate in <strong>Information Systems</strong> with a second major in <strong>Psychology</strong>. One half of me asks <mark>why people do what they do</mark>; the other half ships the feature that helps them do it.",
  "It started at eight years old, when I jailbroke my first iPhone. Since then I've been building side projects across Vue, React, SvelteKit, Flask and Android. I still prototype ideas in Figma first, and I keep the user in the room when I'm deciding what to build.",
  "Right now I'm looking for <strong>[product / APM / fullstack]</strong> roles where I can own a problem from discovery to deploy.",
];

export type ExperienceItem = {
  when: string;
  title: string;
  body: string;
  chips: string[];
  href?: string;
  /** renders as a dashed "fill me in" card */
  placeholder?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    when: "[2025 — Now]",
    title: "[Role · Company]",
    body: "[One line on what you owned, then one line on the outcome. Lead with the decision you made, not the tool you used.]",
    chips: ["[Skill]", "[Skill]"],
    placeholder: true,
  },
  {
    when: "[Year] — Now",
    title: "B.Sc. Information Systems",
    body: "Second major in Psychology. Coursework spans software project management, enterprise systems, and how people make decisions.",
    chips: ["Product", "UX research", "Fullstack"],
  },
];

export const principles = [
  {
    title: "Talk to people first.",
    body: "Psychology taught me that what users say and what they do are different datasets. I collect both.",
  },
  {
    title: "Ship the thin slice.",
    body: "One complete flow beats five half-built ones. Scope down until it fits in a demo.",
  },
  {
    title: "Own the whole stack.",
    body: "I can read the migration and the roadmap, so trade-offs get made with real costs in view.",
  },
  {
    title: "Sweat the small stuff.",
    body: "Empty states, error copy, focus rings. Details are where trust gets built.",
  },
];

/** the "time machine": older versions stay online */
export const changelog = [
  { version: "3.0", year: 2026, note: "Astro rebuild, sidebar layout, morphing monogram", href: "/" },
  { version: "2.0", year: 2025, note: "Gatsby + Tailwind, project write-ups in MDX", href: "/v2/" },
  { version: "1.0", year: 2023, note: "First portfolio, built in Framer", href: "https://rayfon.framer.website/" },
];
