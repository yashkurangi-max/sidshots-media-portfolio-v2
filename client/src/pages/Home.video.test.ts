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

  it("prioritizes the first moving-strip frames without loading every duplicate at once", () => {
    expect(homeSource).toContain('moving-strip-forward');
    expect(homeSource).toContain('moving-strip-reverse');
    expect(homeSource.match(/loading=\{index < 4 \? "eager" : "lazy"\}/g)?.length).toBe(2);
    expect(homeSource.match(/fetchPriority=\{index < 2 \? "high" : "low"\}/g)?.length).toBe(2);
    expect(homeSource).toContain('draggable={false}');
  });

  it("keeps mobile marquee compositing and touch safeguards enabled", () => {
    expect(stylesSource).toContain("transform: translate3d(0, 0, 0)");
    expect(stylesSource).toContain("contain: layout paint");
    expect(stylesSource).toContain("touch-action: pan-y");
    expect(stylesSource).toContain("-webkit-text-size-adjust: 100%");
    expect(stylesSource).toContain("@media (hover: none) and (pointer: coarse)");
  });
});
