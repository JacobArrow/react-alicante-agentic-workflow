import { describe, expect, it } from "vitest";

import { formatSessionLevel } from "./session-level";

describe("formatSessionLevel", () => {
  it("capitalizes each level for display", () => {
    expect(formatSessionLevel("beginner")).toBe("Beginner");
    expect(formatSessionLevel("intermediate")).toBe("Intermediate");
    expect(formatSessionLevel("advanced")).toBe("Advanced");
  });
});
