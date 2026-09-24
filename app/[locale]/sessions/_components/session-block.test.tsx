import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SessionBlock } from "./session-block";

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "",
};

describe("SessionBlock", () => {
  it("shows the title, the start time and the speaker", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00 · Marta Fernandez")).toBeInTheDocument();
  });

  it("shows the level as a badge", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    // The visually-hidden "Level: " prefix splits the badge's text across
    // two elements, so an exact getByText string won't match — compare the
    // badge span's full (including visually-hidden) text content instead.
    // tagName narrows the match to the badge itself, not its wrapping Box
    // (same textContent, since the badge is its only child).
    expect(
      screen.getByText(
        (_, element) =>
          element?.tagName === "SPAN" &&
          element.textContent === "Level: Beginner",
      ),
    ).toBeInTheDocument();
  });

  it("links to the session page", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });
});
