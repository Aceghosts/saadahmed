export type TemplateCategory = "creative" | "corporate";

export type TemplateMetadata = {
  id: string;
  name: string;
  profession: string[];
  category: TemplateCategory;
  description: string;
};

export const TEMPLATE_REGISTRY: Record<string, TemplateMetadata> = {
  minimalEditorial: {
    id: "minimalEditorial",
    name: "Minimal Editorial",
    profession: ["designer", "writer", "consultant", "marketer"],
    category: "creative",
    description: "A quiet editorial layout for narrative-driven personal brands.",
  },
  boldBrutalist: {
    id: "boldBrutalist",
    name: "Bold Brutalist",
    profession: ["artist", "designer", "creative director", "developer"],
    category: "creative",
    description: "A high-contrast, graphic template for standout creative profiles.",
  },
  warmCinematic: {
    id: "warmCinematic",
    name: "Warm Cinematic",
    profession: ["filmmaker", "photographer", "artist", "storyteller"],
    category: "creative",
    description: "A visual-first template with atmospheric sections and warm pacing.",
  },
  darkPremium: {
    id: "darkPremium",
    name: "Dark Premium",
    profession: ["executive", "founder", "advisor", "consultant"],
    category: "corporate",
    description: "A polished dark template for premium executive presence.",
  },
  cinematicAuthority: {
    id: "cinematicAuthority",
    name: "Cinematic Authority",
    profession: ["speaker", "executive", "coach", "founder"],
    category: "corporate",
    description: "A bold corporate story format for leaders and public experts.",
  },
  cleanExecutive: {
    id: "cleanExecutive",
    name: "Clean Executive",
    profession: ["executive", "consultant", "operator", "marketer"],
    category: "corporate",
    description: "A crisp, structured template for business credibility and clarity.",
  },
};
