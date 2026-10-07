import type { Metadata } from "next";
import { HomeV2Page, homeV2Metadata } from "@/components/pages/home-v2/home-v2-page";

export const dynamic = "force-static";

export const metadata: Metadata = homeV2Metadata("en");

export default function HomeV2() {
  return <HomeV2Page locale="en" />;
}
