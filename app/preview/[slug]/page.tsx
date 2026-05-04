import { notFound } from "next/navigation";
import { ProfileSite } from "@/components/templates/corporate/DarkPremium/ProfileSite";
import saad from "@/data/clients/saad.json";
import type { ProfileData } from "@/lib/types/profile";

const CLIENTS: Record<string, ProfileData> = {
  saad: saad as ProfileData,
};

type PreviewPageProps = {
  params: {
    slug: string;
  };
};

export default function PreviewPage({ params }: PreviewPageProps) {
  const profile = CLIENTS[params.slug];

  if (!profile) {
    notFound();
  }

  return <ProfileSite profile={profile} isPreview />;
}
