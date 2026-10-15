// Everything about me that isn't a project lives here, so copy edits never touch components.

export const site = {
  name: "Ray Fon",
  title: "Ray Fon Watson",
  roles: ["Product Manager", "Fullstack Engineer"],
  pitch:
    "I build products people actually use, from the user interview to the database migration.",
  description:
    "Ray Fon: product manager and fullstack engineer. Information Systems + Psychology, building products from user interview to deployment.",
  email: "srayfon93@gmail.com",
  resume:
    "https://drive.google.com/file/d/1MgVRyODk7uSJJZAsI1NL414Pc5kfXJlT/view?usp=drive_link",
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
  "I've been taking software apart since I jailbroke my first iPhone at eight. Now I build it from both sides: as a PM intern at <strong>Workato</strong> I ran user research and led a 300-customer LLM migration, and as a software engineer intern at <strong>GFTN</strong> I ship fullstack features in React.",
  "Right now I'm looking for <strong>Product</strong> roles where I can own a problem from discovery to deploy.",
];

export type ExperienceItem = {
  /** "YYYY-MM"; leave end out while it's ongoing */
  start: string;
  end?: string;
  /** the role or degree */
  title: string;
  /** company or school; href is its website, or its LinkedIn page if it has no site */
  org?: {
    name: string;
    href?: string;
    /** its favicon, saved under public/ (e.g. "/assets/orgs/workato.png"); a letter stands in without one */
    logo?: string;
  };
  body: string;
  chips: string[];
  /** education items get their own list under an "Education" label, after the roles */
  kind?: "education";
};

export const experience: ExperienceItem[] = [
  {
    start: "2026-08",
    end: "2026-12",
    title: "Software Engineer Intern",
    org: {
      name: "Global Finance & Technology Network",
      href: "https://www.linkedin.com/company/gftn",
      logo: "/assets/orgs/gftn.png",
    },
    body: "Building a real-time transcription and translation app for Singapore FinTech Festival 2026 (70,000 attendees expected), across the React frontend and backend. Built Power BI dashboards on usage across in-house products, now leadership's single source of truth for internal metrics.",
    chips: ["Fullstack Development", "Real-time Systems", "Power BI"],
  },
  {
    start: "2025-11",
    end: "2026-04",
    title: "Product Manager Intern",
    org: {
      name: "Workato",
      href: "https://www.linkedin.com/company/workato",
      logo: "/assets/orgs/workato.png",
    },
    body: "Led the auto-migration of 300+ customers off a deprecated LLM in 3 weeks, using Langfuse evals to confirm outputs stayed consistent before anyone was switched, with zero escalations. Interviewed stakeholders to turn pain points into use cases that made the platform's business value concrete.",
    chips: ["Change Management", "LLM Evaluation", "UX Research"],
  },
  {
    start: "2022-08",
    end: "2026-12",
    title: "B.Sc. Information Systems",
    kind: "education",
    org: {
      name: "Singapore Management University",
      href: "https://computing.smu.edu.sg",
      logo: "/assets/orgs/smu.png",
    },
    body: "Second major in Psychology. Coursework spans software project management, enterprise systems, and how people make decisions.",
    chips: ["Product Management", "UX Research", "Data Architecture"],
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
  {
    version: "3.0",
    year: 2026,
    note: "Astro rebuild",
  },
  {
    version: "2.0",
    year: 2025,
    note: "Gatsby + Tailwind, project write-ups in MDX",
    href: "/v2/",
  },
  {
    version: "1.0",
    year: 2023,
    note: "First portfolio, built in Framer",
    href: "https://rayfon.framer.website/",
  },
];
