import type { Metadata } from "next";
import { WonkaChatView, wonkaChatMetadata } from "@/views/wonka-chat";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return wonkaChatMetadata("en");
}

export default function WonkaChatPage() {
  return <WonkaChatView locale="en" />;
}
