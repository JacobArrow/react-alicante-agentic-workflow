import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

const { fetchSessionById, fetchSessions, notFound } = vi.hoisted(() => ({
  fetchSessionById: vi.fn<(id: string) => Promise<Session | null>>(),
  fetchSessions: vi.fn<() => Promise<Session[]>>(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/services/sessions", () => ({ fetchSessionById, fetchSessions }));

// This page branches on notFound() when no session matches the id — that
// branch was previously untested anywhere it's used in the app, so it's
// covered here alongside the new level badge.
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound,
}));

const session: Session = {
  id: "build-your-agentic-workflow",
  title: "Build Your Agentic Workflow",
  speaker: "Evangelia Mitsopoulou",
  track: "Agentic AI",
  level: "intermediate",
  room: "Workshop Room A",
  startTime: "09:45",
  durationMinutes: 180,
  description: "Hands-on workshop.",
};

async function renderPage(id: string) {
  const { default: SessionDetailPage } = await import("./page");
  render(await SessionDetailPage({ params: Promise.resolve({ id }) }));
}

describe("SessionDetailPage", () => {
  it("shows the track and the level as separate badges", async () => {
    fetchSessionById.mockResolvedValue(session);

    await renderPage(session.id);

    expect(screen.getByText("Agentic AI")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
  });

  it("shows the session title, speaker and description", async () => {
    fetchSessionById.mockResolvedValue(session);

    await renderPage(session.id);

    expect(screen.getByText(session.title)).toBeInTheDocument();
    expect(screen.getByText(session.speaker)).toBeInTheDocument();
    expect(screen.getByText(session.description)).toBeInTheDocument();
  });

  it("calls notFound when no session matches the id", async () => {
    fetchSessionById.mockResolvedValue(null);

    const { default: SessionDetailPage } = await import("./page");

    await expect(
      SessionDetailPage({ params: Promise.resolve({ id: "unknown" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
