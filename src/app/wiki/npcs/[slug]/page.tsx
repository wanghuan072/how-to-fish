import type { Metadata } from "next";
import { CollectionDetailPage } from "@/page/detail/CollectionDetailPage";
import { getCollection } from "@/lib/content";
import { entryMetadata } from "@/seo/route";

export const dynamicParams = false;
export function generateStaticParams() { return getCollection("npcs").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; return entryMetadata("npcs", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <CollectionDetailPage collection="npcs" slug={slug} />; }
