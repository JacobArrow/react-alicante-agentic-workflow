import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { getSpeakers } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("getSpeakers", () => {
  it("groups sessions by speaker, sorted alphabetically by name", () => {
    const speakers = getSpeakers([
      session({ id: "s1", speaker: "Naia Etxeberria" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
      session({ id: "s3", speaker: "Naia Etxeberria" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "Diego Castellanos",
        sessions: [session({ id: "s2", speaker: "Diego Castellanos" })],
      },
      {
        name: "Naia Etxeberria",
        sessions: [
          session({ id: "s1", speaker: "Naia Etxeberria" }),
          session({ id: "s3", speaker: "Naia Etxeberria" }),
        ],
      },
    ]);
  });

  it("keeps a speaker's own sessions in the order they appear in the input", () => {
    const speakers = getSpeakers([
      session({ id: "s1", speaker: "Marta Fernandez", startTime: "14:00" }),
      session({ id: "s2", speaker: "Marta Fernandez", startTime: "09:00" }),
    ]);

    expect(speakers[0].sessions.map((s) => s.id)).toEqual(["s1", "s2"]);
  });

  it("excludes the closing panel's placeholder speaker value", () => {
    const speakers = getSpeakers([
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
      session({ id: "s1", speaker: "Marta Fernandez" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "Marta Fernandez",
        sessions: [session({ id: "s1", speaker: "Marta Fernandez" })],
      },
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(getSpeakers([])).toEqual([]);
  });
});
