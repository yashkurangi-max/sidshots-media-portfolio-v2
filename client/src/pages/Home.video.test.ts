import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Frames in motion video asset", () => {
  it("uses the verified FinalSlide.mp4 storage path", () => {
    expect(homeSource).toContain('src="/assets/FinalSlide-web.mp4"');
    expect(homeSource).not.toContain('/manus-storage/FinalSlide_3cc02987.mp4');
    expect(homeSource).not.toContain('/manus-storage/final-slide_43a9af3e.mp4');
  });

  it("keeps moving-strip selections in a centered single-slide lightbox track", () => {
    expect(homeSource).toContain('dashboardPhotoIndex === null ? " is-single" : ""');
    expect(homeSource).toContain('dashboardPhotoIndex === null ? "translate3d(0%, 0, 0)"');
  });

  it("keeps the SM logo visibly enlarged inside its white header box", () => {
    expect(stylesSource).toContain('.collage-header-logo img');
    expect(stylesSource).toContain('transform: scale(2.1)');
  });
});
