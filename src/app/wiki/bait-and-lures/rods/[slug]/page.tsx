import type { Metadata } from "next";
import { createMetadata } from "@/seo/metadata";
import { getRod, RodDetailPage } from "@/page/wiki/RodDetailPage";
import tackleJson from "@/data/tackle.json";

type RodEntry = { slug: string; name: string; description: string };
const rods = tackleJson as RodEntry[];

export function generateStaticParams() {
  return rods.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const rod = getRod(slug);
  if (!rod) return createMetadata({ title: "Rod not found", description: "This rod reference is not available.", path: "/wiki/bait-and-lures/", noIndex: true });
  return createMetadata({ title: `${rod.name}: Uses, Bait & Catch Pools`, description: rod.description, keywords: [rod.name, "How to Fish rods", "How to Fish bait", "How to Fish catch pools"], path: `/wiki/bait-and-lures/rods/${rod.slug}/`, type: "article" });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RodDetailPage slug={slug} />;
}
