import type { Metadata } from "next";
import { HomeView, homeMetadata } from "@/views/home";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return homeMetadata("en");
}

export default function Home() {
  return <HomeView locale="en" />;
}
