import type { MeetingContext } from "@/lib/shared-links-defaults";

export type MeetingTrackType =
  | "general"
  | "start-ai"
  | "wonka-build"
  | "wonka-chat";

export function meetingContextToTrackType(
  context: MeetingContext,
): MeetingTrackType {
  return context === "default" ? "general" : context;
}

export function meetingTrackProps(type: MeetingTrackType) {
  return {
    "data-track": "meeting" as const,
    "data-meeting-type": type,
  };
}
