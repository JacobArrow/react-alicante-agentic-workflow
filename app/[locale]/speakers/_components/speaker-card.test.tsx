import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { SpeakerSessions } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

const speaker: SpeakerSessions = {
  name: "Marta Fernandez",
  sessions: [
    {
      id: "opening-keynote",
      title: "Opening Keynote",
      speaker: "Marta Fernandez",
      track: "Architecture",
      room: "Main Hall",
      startTime: "09:00",
      durationMinutes: 30,
      description: "",
    },
    {
      id: "closing-remarks",
      title: "Closing Remarks",
      speaker: "Marta Fernandez",
      track: "Architecture",
      room: "Main Hall",
      startTime: "17:00",
      durationMinutes: 15,
      description: "",
    },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's title and start time", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Closing Remarks")).toBeInTheDocument();
    expect(screen.getByText("17:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Opening Keynote").closest("a")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
    expect(screen.getByText("Closing Remarks").closest("a")).toHaveAttribute(
      "href",
      "/en/sessions/closing-remarks",
    );
  });
});
