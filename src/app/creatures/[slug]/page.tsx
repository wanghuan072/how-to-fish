import type { Metadata } from "next";
import { FishDetailPage } from "@/page/fish/FishDetailPage";
import { getFish, getFishContent, regularFish } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { getFishTdk } from "@/seo/tdk";

export const dynamicParams = false;
export function generateStaticParams() { return regularFish.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const fishEntry = getFish(slug); if (!fishEntry) return createMetadata({ title: "Creature Guide Not Found - How to Fish Wiki", description: "The requested How to Fish creature guide is unavailable. Browse the complete creature list to find locations, rods, bait pairings, values and related quest pages.", path: "/creatures/", noIndex: true }); const entry = getFishContent(fishEntry); return createMetadata({ ...getFishTdk(fishEntry, entry, `/creatures/${slug}/`), type: "article" }); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <FishDetailPage slug={slug} />; }
