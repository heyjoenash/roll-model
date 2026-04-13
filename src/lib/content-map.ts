export interface ContentEntry {
  title: string;
  chapter: string;
  chapterNumber: number;
  scene: string;
  description: string;
}

export interface Chapter {
  number: number;
  title: string;
  slug: string;
  sections: { title: string; slug: string }[];
}

export const contentMap: Record<string, ContentEntry> = {
  "the-release/rev-rate": {
    title: "Rev Rate (Revolutions Per Minute)",
    chapter: "The Release",
    chapterNumber: 5,
    scene: "rev-rate",
    description: "How fast the bowling ball spins and why it matters",
  },
  prototypes: {
    title: "Prototype Sandbox",
    chapter: "Development",
    chapterNumber: 0,
    scene: "prototype",
    description: "Asset prototype sandbox — ball + pin deck together",
  },
};

export const chapters: Chapter[] = [
  {
    number: 1,
    title: "The Basics",
    slug: "the-basics",
    sections: [
      { title: "The Lane", slug: "the-lane" },
      { title: "The Pins", slug: "the-pins" },
      { title: "How Scoring Works", slug: "scoring" },
      { title: "Board Numbering", slug: "board-numbering" },
    ],
  },
  {
    number: 2,
    title: "The Ball",
    slug: "the-ball",
    sections: [
      { title: "Coverstock Types", slug: "coverstock-types" },
      { title: "Core Design", slug: "core-design" },
      { title: "RG & Differential", slug: "rg-and-differential" },
      { title: "Ball Motion: Skid-Hook-Roll", slug: "ball-motion" },
      { title: "Surface Preparation", slug: "surface-preparation" },
      { title: "Weight & Drilling", slug: "weight-and-drilling" },
    ],
  },
  {
    number: 3,
    title: "The Approach",
    slug: "the-approach",
    sections: [
      { title: "Stance & Setup", slug: "stance-and-setup" },
      { title: "The 4-Step Approach", slug: "four-step-approach" },
      { title: "The 5-Step Approach", slug: "five-step-approach" },
      { title: "Timing", slug: "timing" },
      { title: "Drift", slug: "drift" },
    ],
  },
  {
    number: 4,
    title: "The Swing",
    slug: "the-swing",
    sections: [
      { title: "The Pushaway", slug: "pushaway" },
      { title: "The Backswing", slug: "backswing" },
      { title: "The Forward Swing", slug: "forward-swing" },
      { title: "Free vs Muscled Swing", slug: "free-vs-muscled" },
      { title: "Swing Plane", slug: "swing-plane" },
    ],
  },
  {
    number: 5,
    title: "The Release",
    slug: "the-release",
    sections: [
      { title: "Wrist Position", slug: "wrist-position" },
      { title: "Rev Rate", slug: "rev-rate" },
      { title: "Axis Tilt", slug: "axis-tilt" },
      { title: "Axis Rotation", slug: "axis-rotation" },
      { title: "One-Handed vs Two-Handed", slug: "one-vs-two-handed" },
      { title: "Follow-Through", slug: "follow-through" },
    ],
  },
  {
    number: 6,
    title: "Ball Motion Down the Lane",
    slug: "ball-motion-down-the-lane",
    sections: [
      { title: "The Three Phases", slug: "three-phases" },
      { title: "Speed & Rev Rate Interaction", slug: "speed-rev-interaction" },
      { title: "Breakpoint", slug: "breakpoint" },
      { title: "Total Hook", slug: "total-hook" },
      { title: "Loft", slug: "loft" },
    ],
  },
  {
    number: 7,
    title: "The Lane",
    slug: "the-lane-conditions",
    sections: [
      { title: "Oil Pattern Basics", slug: "oil-pattern-basics" },
      { title: "House Shot", slug: "house-shot" },
      { title: "PBA Patterns", slug: "pba-patterns" },
      { title: "Sport Shots", slug: "sport-shots" },
      { title: "Lane Transition", slug: "lane-transition" },
      { title: "Lane Surfaces", slug: "lane-surfaces" },
    ],
  },
  {
    number: 8,
    title: "The Strike",
    slug: "the-strike",
    sections: [
      { title: "The Pocket", slug: "the-pocket" },
      { title: "Entry Angle", slug: "entry-angle" },
      { title: "Pin Action", slug: "pin-action" },
      { title: "Speed at the Pins", slug: "speed-at-pins" },
      { title: "Common Pin Leaves", slug: "common-pin-leaves" },
      { title: "The Perfect Game", slug: "perfect-game" },
    ],
  },
  {
    number: 9,
    title: "Spares",
    slug: "spares",
    sections: [
      { title: "Why Spares Matter", slug: "why-spares-matter" },
      { title: "The 3-6-9 System", slug: "three-six-nine-system" },
      { title: "Corner Pin Spares", slug: "corner-pin-spares" },
      { title: "Split Conversions", slug: "split-conversions" },
    ],
  },
  {
    number: 10,
    title: "Equipment Strategy",
    slug: "equipment-strategy",
    sections: [
      { title: "Choosing Your First Ball", slug: "first-ball" },
      { title: "Building an Arsenal", slug: "building-arsenal" },
      { title: "Matching Ball to Oil", slug: "matching-ball-to-oil" },
      { title: "Surface Adjustments", slug: "surface-adjustments" },
    ],
  },
  {
    number: 11,
    title: "Reading the Lane",
    slug: "reading-the-lane",
    sections: [
      { title: "Rule of 31", slug: "rule-of-31" },
      { title: "Watching Ball Reaction", slug: "watching-ball-reaction" },
      { title: "Making Adjustments", slug: "making-adjustments" },
    ],
  },
  {
    number: 12,
    title: "Two-Handed Bowling",
    slug: "two-handed-bowling",
    sections: [
      { title: "The Two-Handed Revolution", slug: "two-handed-revolution" },
      { title: "Grip & Release", slug: "grip-and-release" },
      { title: "Extra Rev Rate & Rotation", slug: "extra-rev-rate" },
      { title: "Body Mechanics", slug: "body-mechanics" },
    ],
  },
];

export function getContentBySlug(
  slug: string
): ContentEntry | undefined {
  return contentMap[slug];
}
