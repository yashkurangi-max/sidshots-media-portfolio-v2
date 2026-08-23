import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");

describe("Frames in motion video asset", () => {
  it("uses the verified FinalSlide.mp4 storage path", () => {
    expect(homeSource).toContain('src="/assets/FinalSlide-web.mp4"');
    expect(homeSource).not.toContain('/manus-storage/FinalSlide_3cc02987.mp4');
    expect(homeSource).not.toContain('/manus-storage/final-slide_43a9af3e.mp4');
  });
});
