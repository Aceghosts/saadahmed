import { notFound } from "next/navigation";
import { ProfileSite } from "@/components/templates/corporate/DarkPremium/ProfileSite";
import saad from "@/data/clients/saad.json";
import type { ProfileData } from "@/lib/types/profile";

const CLIENTS: Record<string, ProfileData> = {
  saad: saad as ProfileData,
};

type SitePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return Object.keys(CLIENTS).map((slug) => ({ slug }));
}

export default function SitePage({ params }: SitePageProps) {
  const profile = CLIENTS[params.slug];

  if (!profile) {
    notFound();
  }

  return <ProfileSite profile={profile} />;
}
