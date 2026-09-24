import type { Session } from "@/types/session";

/**
 * The closing panel's `speaker` value in the seed data — it names the whole
 * lineup, not a single person, so it must not be listed as a speaker.
 */
const NON_SPEAKER_VALUE = "Full speaker lineup";

export interface SpeakerSessions {
  name: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker, sorted alphabetically by name. Each speaker's
 * own sessions keep the order they appear in `sessions` (already start-time
 * order from `fetchSessions()`). The closing panel's placeholder speaker
 * value is excluded.
 */
export function getSpeakers(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === NON_SPEAKER_VALUE) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([name, sessions]) => ({
    name,
    sessions,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
