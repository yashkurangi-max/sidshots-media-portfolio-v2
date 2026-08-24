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

  it("loads every unique moving-strip frame while keeping duplicate marquee copies low-priority", () => {
    expect(homeSource).toContain('moving-strip-forward');
    expect(homeSource).toContain('moving-strip-reverse');
    expect(homeSource).toContain('loading={index < stripOne.length ? "eager" : "lazy"}');
    expect(homeSource).toContain('loading={index < stripTwo.length ? "eager" : "lazy"}');
    expect(homeSource.match(/fetchPriority=\{index < 2 \? "high" : "low"\}/g)?.length).toBe(2);
    expect(homeSource).toContain('draggable={false}');
  });

  it("eagerly loads photos when a dashboard is opened", () => {
    expect(homeSource).toContain('loading="eager" decoding="async"');
    expect(homeSource).toContain('dashboardPhotos.map');
  });

  it("keeps mobile marquee compositing and touch safeguards enabled", () => {
    expect(stylesSource).toContain("transform: translate3d(0, 0, 0)");
    expect(stylesSource).toContain("contain: layout paint");
    expect(stylesSource).toContain("touch-action: pan-y");
    expect(stylesSource).toContain("-webkit-text-size-adjust: 100%");
    expect(stylesSource).toContain("@media (hover: none) and (pointer: coarse)");
  });
});

describe("Dashboard category assignments", () => {
  it("keeps the screenshot-matched lipliner photo in Product only", () => {
    expect(homeSource).toContain('id: "P13", title: "Bold lipliner study", category: "Product", image: "/assets/14.webp"');
    expect(homeSource).toContain('Architecture: [photos[0], photos[2], photos[3], photos[5], photos[7], photos[9], architectureSuppliedPhotos[0], architectureSuppliedPhotos[1], photos[6], photos[8], photos[10], architectureSuppliedPhotos[2], architectureSuppliedPhotos[4]]');
    expect(homeSource).not.toContain('architectureSuppliedPhotos[3]');
  });
});


describe("Product dashboard duplicate prevention", () => {
  it("keeps the monochrome mascara asset as a single Product entry", () => {
    const mascaraAsset = '/assets/20.webp';
    expect(homeSource.match(new RegExp(mascaraAsset.replace('.', '\\.'), 'g'))?.length).toBe(1);
    expect(homeSource).toContain('id: "L04", title: "Graphic mascara"');
    expect(homeSource).not.toContain('title: "Monochrome mascara"');
  });
});


describe("Dashboard add-photo tile removal", () => {
  it("does not render the add-photo tile or hidden file picker", () => {
    expect(homeSource).not.toContain("dashboard-add-tile");
    expect(homeSource).not.toContain("dashboardFileInputRef");
    expect(homeSource).not.toContain("openDashboardFilePicker");
    expect(homeSource).not.toContain("handleDashboardFilesSelected");
    expect(homeSource).toContain("{dashboardPhotos.map");
  });
});
