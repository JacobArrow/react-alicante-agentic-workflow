import type { Level } from "@/types/session";

/**
 * `level` is stored lowercase in the database (the enum values themselves),
 * but the badge shows it capitalized — this is the one place that mapping
 * lives, so both the timeline block and the session page stay in sync.
 */
const SESSION_LEVEL_LABELS: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function formatSessionLevel(level: Level): string {
  return SESSION_LEVEL_LABELS[level];
}
