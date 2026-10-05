import type { Metadata } from "next";
import { HomeView, homeMetadata } from "@/views/home";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return homeMetadata("en");
}

export default function HomePage() {
  return <HomeView locale="en" />;
}
