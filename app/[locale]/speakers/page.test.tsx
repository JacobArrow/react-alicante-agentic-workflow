import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

const { fetchSessions } = vi.hoisted(() => ({
  fetchSessions: vi.fn<() => Promise<Session[]>>(),
}));

vi.mock("@/services/sessions", () => ({ fetchSessions }));

// page.tsx is an async Server Component — no JSX magic beyond `await`, so it
// can be called directly and the resolved element rendered like any other.
async function renderPage() {
  const { default: SpeakersPage } = await import("./page");
  render(await SpeakersPage());
}

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

describe("SpeakersPage", () => {
  it("renders a card per speaker when there are sessions", async () => {
    fetchSessions.mockResolvedValue([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
    ]);

    await renderPage();

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Diego Castellanos")).toBeInTheDocument();
    expect(
      screen.queryByText("No speakers yet — check back closer to the day."),
    ).not.toBeInTheDocument();
  });

  it("shows an empty-state message when there are no speakers", async () => {
    fetchSessions.mockResolvedValue([]);

    await renderPage();

    expect(
      screen.getByText("No speakers yet — check back closer to the day."),
    ).toBeInTheDocument();
  });
});
