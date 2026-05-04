export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  location: string;
  email: string;
  phone?: string;
  profileImage: string;
  stats: Array<{ label: string; value: string }>;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  portfolio: Array<{
    title: string;
    description: string;
    image?: string;
    link?: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    text: string;
    avatar?: string;
  }>;
  blog: Array<{
    title: string;
    summary: string;
    date: string;
    link?: string;
  }>;
  services: Array<{
    title: string;
    description: string;
  }>;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  templateId: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fontPair: {
    heading: string;
    body: string;
  };
  profession: string;
}
