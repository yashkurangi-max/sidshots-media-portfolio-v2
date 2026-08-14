/* Screenshot-matched collage direction: black trophy-style chrome, centered wordmark, colorful photography, white print frames, and a dense gallery wall. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { toast } from "sonner";

type Category = "All" | "Automobile" | "Architecture" | "Product" | "Editorial" | "Portrait";
type FilterCategory = "All" | "Automobile" | "Architecture" | "Product";

type Photo = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  alt: string;
  tile: string;
};

const photos: Photo[] = [
  { id: "01", title: "The dining room", category: "Architecture", image: "/manus-storage/architecture-01-dining-room_80865014.webp", alt: "Bright dining room with layered tables, curved windows, and pendant lights", tile: "tile-wide" },
  { id: "02", title: "Poolside still life", category: "Product", image: "/manus-storage/architecture-02-poolside-still-life_f4503011.webp", alt: "Poolside lounge with umbrellas, dark stone, and warm yellow cushions", tile: "tile-tall" },
  { id: "03", title: "Courtyard waterline", category: "Architecture", image: "/manus-storage/architecture-03-courtyard-waterline_4805140a.webp", alt: "Lush courtyard architecture with a swimming pool and timber balconies", tile: "tile-square" },
  { id: "04", title: "Warm interior", category: "Architecture", image: "/manus-storage/architecture-04-warm-interior_a88a9879.webp", alt: "Inviting interior with timber ceiling, lounge furniture, and sculptural lighting", tile: "tile-wide" },
  { id: "05", title: "The long table", category: "Editorial", image: "/manus-storage/architecture-05-long-table_e11fab15.webp", alt: "Outdoor dining table set beside a tropical pool and garden", tile: "tile-tall" },
  { id: "06", title: "Window light", category: "Architecture", image: "/manus-storage/architecture-06-window-light_5105dc67.webp", alt: "Minimal restaurant interior washed with soft daylight through tall windows", tile: "tile-square" },
  { id: "07", title: "Quiet table", category: "Product", image: "/manus-storage/architecture-07-quiet-table_c1282688.webp", alt: "Long dining table and chairs framed by translucent curtains", tile: "tile-tall" },
  { id: "08", title: "Mural room", category: "Architecture", image: "/manus-storage/architecture-08-mural-room_ab0a85fd.webp", alt: "Bright dining room with botanical wall murals and blue chairs", tile: "tile-wide" },
  { id: "09", title: "Terrace study", category: "Product", image: "/manus-storage/architecture-09-terrace-study_2850ad67.webp", alt: "Rooftop terrace with graphic paving, tables, and a distant city view", tile: "tile-wide" },
  { id: "10", title: "Evening facade", category: "Architecture", image: "/manus-storage/architecture-10-evening-facade_d55cf7a5.webp", alt: "Restaurant facade and terrace arranged for evening service", tile: "tile-tall" },
  { id: "11", title: "Reception geometry", category: "Product", image: "/manus-storage/architecture-11-reception-geometry_0a35b0cf.webp", alt: "Minimal reception desk with warm wood, stone, and a circular mirror", tile: "tile-square" },
  { id: "12", title: "Material detail", category: "Editorial", image: "/manus-storage/architecture-01-dining-room_80865014.webp", alt: "Editorial detail of a bright hospitality interior and layered materials", tile: "tile-tall" },
  { id: "13", title: "Night drive", category: "Automobile", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=88", alt: "Black sports car photographed on a road at night", tile: "tile-wide" },
  { id: "14", title: "Body line", category: "Automobile", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=88", alt: "Low front view of a polished sports car", tile: "tile-tall" },
  { id: "15", title: "Red signal", category: "Automobile", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=88", alt: "Red performance car captured in directional light", tile: "tile-square" },
  { id: "16", title: "Open road", category: "Automobile", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=88", alt: "Vehicle moving along an open road in warm light", tile: "tile-wide" },
];

const firstStripPhotos: Photo[] = [
  { id: "F01", title: "Copy of 15", category: "Editorial", image: "/manus-storage/strip-01-copy-of-15_5c37011b.webp", alt: "SidshotsMedia editorial frame from the newly uploaded photo set", tile: "tile-wide" },
  { id: "F02", title: "Frame 11", category: "Editorial", image: "/manus-storage/strip-02-11_146f60dc.webp", alt: "SidshotsMedia editorial frame 11 from the newly uploaded photo set", tile: "tile-tall" },
  { id: "F03", title: "Frame 7", category: "Editorial", image: "/manus-storage/strip-03-7-2_ce2c88a0.webp", alt: "SidshotsMedia editorial frame 7 from the newly uploaded photo set", tile: "tile-square" },
  { id: "F04", title: "DSC03172", category: "Editorial", image: "/manus-storage/strip-04-dsc03172_e1da8e6c.webp", alt: "SidshotsMedia editorial frame DSC03172 from the newly uploaded photo set", tile: "tile-wide" },
  { id: "F06", title: "DSC05298", category: "Editorial", image: "/manus-storage/strip-06-dsc05298-recovered_7e57ace5.webp", alt: "SidshotsMedia editorial frame DSC05298 from the newly uploaded photo set", tile: "tile-square" },
  { id: "F07", title: "Frame 12", category: "Editorial", image: "/manus-storage/strip-07-12-copy_f438de90.webp", alt: "SidshotsMedia editorial frame 12 from the newly uploaded photo set", tile: "tile-wide" },
  { id: "F09", title: "DSC03186", category: "Editorial", image: "/manus-storage/strip-09-dsc03186_127b5855.webp", alt: "SidshotsMedia editorial frame DSC03186 from the newly uploaded photo set", tile: "tile-square" },
  { id: "F10", title: "DSC0761", category: "Editorial", image: "/manus-storage/strip-10-dsc0761_4d243182.webp", alt: "SidshotsMedia editorial frame DSC0761 from the newly uploaded photo set", tile: "tile-wide" },
];

const movedToSecondStripPhotos: Photo[] = [
  { id: "F05", title: "Copy of 22", category: "Editorial", image: "/manus-storage/strip-05-copy-of-22_b8594586.webp", alt: "SidshotsMedia editorial frame from the newly uploaded photo set", tile: "tile-tall" },
  { id: "F08", title: "DSC04009", category: "Editorial", image: "/manus-storage/strip-08-dsc04009_e725ef77.webp", alt: "SidshotsMedia editorial frame DSC04009 from the newly uploaded photo set", tile: "tile-tall" },
  { id: "F11", title: "DSC04088", category: "Editorial", image: "/manus-storage/strip-11-dsc04088_5ef9a449.webp", alt: "SidshotsMedia editorial frame DSC04088 from the newly uploaded photo set", tile: "tile-tall" },
  { id: "F12", title: "DSC09874", category: "Editorial", image: "/manus-storage/strip-12-dsc09874_b473fb9e.webp", alt: "SidshotsMedia editorial frame DSC09874 from the newly uploaded photo set", tile: "tile-square" },
];

const lowerStripSuppliedPhotos: Photo[] = [
  { id: "L04", title: "Graphic mascara", category: "Product", image: "/manus-storage/lower-strip-04-mascara_0918d297.webp", alt: "Minimal black mascara product framed against a high-contrast white and black backdrop", tile: "tile-wide" },
  { id: "L07", title: "Lavender wash", category: "Product", image: "/manus-storage/lower-strip-07-handwash_f48b01ad.webp", alt: "Lavender hand wash bottle staged with graphic color blocks and palm leaves", tile: "tile-wide" },
];

const suppliedVehicleStripPhotos: Photo[] = [
  { id: "V13", title: "Quarry scooter", category: "Automobile", image: "/manus-storage/DSC_5690-2_25291e7d.webp", alt: "Scooter photographed against a rocky quarry landscape beneath a pale sky", tile: "tile-wide" },
  { id: "V14", title: "Yellow motion", category: "Automobile", image: "/manus-storage/DSC_1985_aa3ac355.webp", alt: "Yellow SUV captured in motion on a palm-lined city road", tile: "tile-tall" },
  { id: "V15", title: "Road rider", category: "Automobile", image: "/manus-storage/DSC_1746_75ddcfc2.webp", alt: "Motorcycle rider moving along a tree-lined road", tile: "tile-square" },
  { id: "V16", title: "Mud crossing", category: "Automobile", image: "/manus-storage/CopyofDSC04747_9cc90f10.webp", alt: "Orange SUV powering through a muddy off-road crossing", tile: "tile-wide" },
  { id: "V17", title: "Rubicon field study", category: "Automobile", image: "/manus-storage/CopyofDSC04628(1)_f18b9039.webp", alt: "Mud-covered Rubicon photographed in a green field after an off-road drive", tile: "tile-tall" },
];

const secondStripPhotos: Photo[] = [
  { id: "S04", title: "Light on stone", category: "Architecture", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=88", alt: "Warm modern living space with stone, wood, and soft daylight", tile: "tile-wide" },
  { id: "S05", title: "The long table", category: "Editorial", image: photos[4].image, alt: photos[4].alt, tile: "tile-tall" },
  { id: "S06", title: "Poolside still life", category: "Product", image: photos[1].image, alt: photos[1].alt, tile: "tile-square" },
  { id: "S07", title: "Quiet table", category: "Product", image: photos[6].image, alt: photos[6].alt, tile: "tile-wide" },
  { id: "S08", title: "Terrace study", category: "Product", image: photos[8].image, alt: photos[8].alt, tile: "tile-tall" },
  { id: "S09", title: "Reception geometry", category: "Product", image: photos[10].image, alt: photos[10].alt, tile: "tile-square" },
  ...movedToSecondStripPhotos,
  ...lowerStripSuppliedPhotos,
  ...suppliedVehicleStripPhotos,
];

const vehiclePhotos: Photo[] = [
  { id: "V01", title: "Rubicon trail", category: "Automobile", image: "/manus-storage/automobile-vehicle-01-rubicon_9bd9d6f9.webp", alt: "Rugged four-wheel-drive vehicle photographed on a green trail", tile: "tile-wide" },
  { id: "V02", title: "Chrome and red", category: "Automobile", image: "/manus-storage/automobile-vehicle-02-motorcycle-detail_6b205116.webp", alt: "Close motorcycle detail with red bodywork and chrome handlebars", tile: "tile-tall" },
  { id: "V03", title: "City motorcycle", category: "Automobile", image: "/manus-storage/automobile-vehicle-03-motorcycle-city_a613c6bd.webp", alt: "Motorcycle photographed against a city street and historic architecture", tile: "tile-square" },
  { id: "V04", title: "Green through rain", category: "Automobile", image: "/manus-storage/automobile-vehicle-04-green-car-rain_75658e59.webp", alt: "Green vehicle passing through a rain-washed road scene", tile: "tile-wide" },
  { id: "V05", title: "Trail machine", category: "Automobile", image: "/manus-storage/automobile-vehicle-05-suv-trail_24b958bd.webp", alt: "SUV photographed on a muddy green off-road trail", tile: "tile-tall" },
  { id: "V06", title: "Front profile", category: "Automobile", image: "/manus-storage/automobile-vehicle-06-suv-portrait_cc563d65.webp", alt: "SUV front profile framed against a lush outdoor landscape", tile: "tile-square" },
  { id: "V07", title: "Red on the road", category: "Automobile", image: "/manus-storage/automobile-vehicle-07-red-suv-road_edf9259a.webp", alt: "Red SUV positioned on a quiet road beneath an overcast sky", tile: "tile-wide" },
  { id: "V08", title: "The lineup", category: "Automobile", image: "/manus-storage/automobile-vehicle-08-suv-lineup_638762dd.webp", alt: "Lineup of colorful SUVs in an open gravel landscape", tile: "tile-tall" },
  { id: "V09", title: "Station stop", category: "Automobile", image: "/manus-storage/automobile-vehicle-09-scooter-station_87abbb0f.webp", alt: "Scooter parked beside a fuel station in a residential street", tile: "tile-square" },
  { id: "V10", title: "Yellow motion", category: "Automobile", image: "/manus-storage/automobile-vehicle-10-yellow-car-road_7c86673a.webp", alt: "Yellow car moving along a palm-lined road", tile: "tile-wide" },
  { id: "V11", title: "Water crossing", category: "Automobile", image: "/manus-storage/automobile-vehicle-11-motorcycle-water_babe6156.webp", alt: "Motorcycle rider crossing a shallow waterway in a tropical landscape", tile: "tile-tall" },
  { id: "V12", title: "Desert rider", category: "Automobile", image: "/manus-storage/automobile-vehicle-12-motorcycle-desert_161af8f2.webp", alt: "Motorcycle rider photographed in a bright sandy landscape", tile: "tile-square" },
];

const productPhotos: Photo[] = [
  { id: "P01", title: "Perfume object", category: "Product", image: "/manus-storage/product-product-01-perfume_64e4bd7a.webp", alt: "Minimal perfume bottle photographed on a clean white set", tile: "tile-wide" },
  { id: "P02", title: "Graphic package", category: "Product", image: "/manus-storage/product-product-02-packaging_d6f13ffb.webp", alt: "Black and white cosmetic package arranged as a graphic still life", tile: "tile-tall" },
  { id: "P03", title: "Green jar", category: "Product", image: "/manus-storage/product-product-03-jar_4b69e98a.webp", alt: "Small product jar styled against tropical green leaves", tile: "tile-square" },
  { id: "P04", title: "Shoe flatlay", category: "Product", image: "/manus-storage/product-product-04-shoe-flatlay_83c5e814.webp", alt: "White shoe and small objects arranged in a botanical flatlay", tile: "tile-wide" },
  { id: "P05", title: "Pink watch", category: "Product", image: "/manus-storage/product-product-05-watch-pink_8d57c488.webp", alt: "Pink watch photographed in a diagonal shaft of light", tile: "tile-tall" },
  { id: "P06", title: "Textile watch", category: "Product", image: "/manus-storage/product-product-06-watch-textile_59145f0c.webp", alt: "Watch arranged on colorful folded textiles", tile: "tile-square" },
  { id: "P07", title: "White leather", category: "Product", image: "/manus-storage/product-product-07-white-handbag_f479563d.webp", alt: "White handbag styled against soft neutral fabric", tile: "tile-wide" },
  { id: "P08", title: "Orange silhouette", category: "Product", image: "/manus-storage/product-product-08-orange-handbag_a4175427.webp", alt: "Orange handbag photographed against bold color blocks", tile: "tile-tall" },
  { id: "P09", title: "Green sneaker", category: "Product", image: "/manus-storage/product-product-09-sneaker-green_85eb8ea2.webp", alt: "White sneaker floating against a deep green background", tile: "tile-square" },
  { id: "P10", title: "Graphic mascara", category: "Product", image: lowerStripSuppliedPhotos[0].image, alt: lowerStripSuppliedPhotos[0].alt, tile: "tile-wide" },
  { id: "P11", title: "Lavender wash", category: "Product", image: lowerStripSuppliedPhotos[1].image, alt: lowerStripSuppliedPhotos[1].alt, tile: "tile-tall" },
  { id: "P12", title: "Watch detail", category: "Product", image: "/manus-storage/product-product-10-watch-still-life_465a1303.webp", alt: "Close product detail of a smartwatch styled with chess pieces", tile: "tile-square" },
];

const categories: FilterCategory[] = ["All", "Automobile", "Architecture", "Product"];

const dashboardData = [
  { index: "01", category: "Architecture" as const, title: "Built forms in changing light.", service: "Buildings · Interiors · Hospitality", copy: "Spatial studies, material details, and quiet geometry for places with a point of view.", stats: ["07 locations", "03 days", "24 final frames"], primary: photos[0], secondary: photos[2] },
  { index: "02", category: "Automobile" as const, title: "Motion, held for a second.", service: "Vehicles · Motorcycles · Road stories", copy: "A field-ready automotive board built from the vehicle work in the supplied SidshotsMedia archive.", stats: ["12 vehicle frames", "06 road studies", "18 final frames"], primary: vehiclePhotos[5], secondary: vehiclePhotos[6] },
  { index: "03", category: "Product" as const, title: "Objects with a pulse.", service: "Objects · Beauty · Fashion", copy: "Tactile product stories built from the supplied archive, making useful things feel considered, desirable, and alive.", stats: ["12 supplied frames", "08 set-ups", "32 final frames"], primary: productPhotos[0], secondary: productPhotos[7] },
];

const dashboardPhotoMap: Record<(typeof dashboardData)[number]["category"], Photo[]> = {
  Architecture: [photos[0], photos[2], photos[3], photos[5], photos[7], photos[9], photos[0], photos[2], photos[3], photos[5], photos[7], photos[9]],
  Automobile: vehiclePhotos,
  Product: productPhotos,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<(typeof dashboardData)[number] | null>(null);
  const visiblePhotos = useMemo(() => activeCategory === "All" ? photos : photos.filter((photo) => photo.category === activeCategory), [activeCategory]);
  const visibleSecondStripPhotos = useMemo(() => activeCategory === "All" ? secondStripPhotos : secondStripPhotos.filter((photo) => photo.category === activeCategory), [activeCategory]);
  const stripOne = firstStripPhotos;
  const stripTwo = visibleSecondStripPhotos;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSelectedPhoto(null);
      setSelectedDashboard(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleCategorySelect = (category: FilterCategory) => {
    setActiveCategory(category);
    setSelectedPhoto(null);

    if (category === "All") {
      setSelectedDashboard(null);
      scrollTo("archive");
      return;
    }

    const dashboard = dashboardData.find((item) => item.category === category) ?? null;
    setSelectedDashboard(dashboard);
    scrollTo("dashboards");
    if (dashboard) {
      toast.success(`${dashboard.category} dashboard selected — this is the correct dashboard for your selection.`);
    }
  };

  return (
    <div className="collage-site">
      <header className="collage-header">
        <nav className="collage-nav collage-nav-left" aria-label="Main navigation">
          <span className="collage-header-logo" aria-label="Sidshots Media logo"><img src="/manus-storage/sidshots-card-mark_835ab97c.png" alt="Sidshots Media logo mark" decoding="async" /></span>
          <button onClick={() => scrollTo("top")}>Home</button>
          <button onClick={() => scrollTo("dashboards")}>Dashboards</button>
          <button onClick={() => scrollTo("booking")}>Bookings</button>
        </nav>

        <button className="collage-wordmark" onClick={() => scrollTo("top")} aria-label="Back to the SidshotsMedia home page">
          <span className="collage-wordmark-text"><strong>SIDSHOTS</strong> <span>MEDIA</span></span>
        </button>

        <div className="collage-header-actions">
          <p>The work is in.<br /><em>Meet the frames.</em></p>
          <button className="collage-cta" onClick={() => scrollTo("dashboards")}>See the work <ArrowUpRight size={15} /></button>
        </div>
        <button className="collage-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        {menuOpen && <nav className="collage-mobile-nav" aria-label="Mobile navigation"><button onClick={() => scrollTo("top")}>Home</button><button onClick={() => scrollTo("dashboards")}>Dashboards</button><button onClick={() => scrollTo("booking")}>Bookings</button></nav>}
      </header>

      <main id="top">
        <section className="collage-intro">
          <div><span className="collage-kicker">SidshotsMedia / Commercial photography</span><h1>Frames with<br /><em>a pulse.</em></h1></div>
          <p>Automotive, architecture, product, portrait, and editorial photography for brands with a point of view.</p>
        </section>

        <section className="moving-gallery" id="archive" aria-label="SidshotsMedia moving photography archive">
          <div className="moving-strip moving-strip-forward"><div className="moving-strip-track">{[...stripOne, ...stripOne].map((photo, index) => <button className="moving-photo" key={`${photo.id}-forward-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="moving-photo-image"><img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" /></span><span className="moving-photo-caption"><b>{photo.id}</b><span>{photo.category}</span><ChevronRight size={13} /></span></button>)}</div></div>
          <div className="moving-strip moving-strip-reverse"><div className="moving-strip-track">{[...stripTwo, ...stripTwo].map((photo, index) => <button className="moving-photo" key={`${photo.id}-reverse-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="moving-photo-image"><img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" /></span><span className="moving-photo-caption"><b>{photo.id}</b><span>{photo.category}</span><ChevronRight size={13} /></span></button>)}</div></div>
        </section>

        <section className="dashboard-suite dashboard-reference" id="dashboards" aria-label="Photography dashboards">
          <div className="dashboard-reference-top"><span className="dashboard-reference-spacer" aria-hidden="true" /><nav className="dashboard-reference-links" aria-label="Dashboard navigation"><button onClick={() => scrollTo("archive")}>Work</button><button onClick={() => scrollTo("about")}>About</button><button onClick={() => scrollTo("reel")}>Services</button><button onClick={() => scrollTo("booking")}>Contact</button></nav></div>
          <div className="dashboard-reference-head"><h2>Three Disciplines. <em>One Craft.</em></h2><p>Explore interactive dashboards tailored for each focus area.</p></div>
          <div className="dashboard-card-grid">{dashboardData.map((dashboard) => <article className="dashboard-card" key={dashboard.category}><button className="dashboard-card-media" onClick={() => setSelectedDashboard(dashboard)} aria-label={`Open ${dashboard.category} dashboard`}><img src={dashboard.primary.image} alt={dashboard.primary.alt} loading="lazy" decoding="async" /><span className="dashboard-card-shade" /><div className="dashboard-card-copy"><h3>{dashboard.category}</h3><p>{dashboard.service}</p><span className="dashboard-card-action">Open dashboard <ArrowUpRight size={14} /></span></div></button></article>)}</div>
        </section>

        <section className="collage-filter-bar" aria-label="Filter photography archive">
          <span>Selected frames / 2026</span>
          <div>{categories.map((category) => <button key={category} className={activeCategory === category ? "is-active" : ""} onClick={() => handleCategorySelect(category)}>{category}</button>)}</div>
          <span>{String(visiblePhotos.length).padStart(2, "0")} photographs</span>
        </section>

        <section className="collage-statement collage-about" id="about" aria-label="About Siddharth Dadhe">
          <div className="collage-about-label"><span className="collage-kicker">SidshotsMedia / About</span><span>03 — 05</span></div>
          <div className="collage-about-content">
            <h2>Behind<br /><em>the frame.</em></h2>
            <p>I’m Siddharth Dadhe, a photographer with over 7 years of experience in the industry. Over the years, I’ve had the opportunity to work with different brands and automotive magazines, along with projects in automotive, interiors, architecture, products, and commercial photography. Working across different industries has helped me understand that every brand has its own personality. My job is to find that personality and bring it out through the camera. After spending years working in the industry, I decided to take the next step and build something of my own. That’s when I started SIDSHOTS MEDIA. Today, I work with brands to create photography and films that feel real, look good, and most importantly, represent who they are. I’m here to create, experiment, and keep getting better with every frame.</p>
          </div>
        </section>

        <section className="collage-video" id="reel" aria-label="SidshotsMedia video slide">
          <div className="collage-video-head">
            <div><span className="collage-kicker">SidshotsMedia / Motion archive</span><h2>Frames in <em>motion.</em></h2></div>
            <span className="collage-video-count">01 / 01 · Editorial reel</span>
          </div>
          <div className="collage-video-stage">
            <video controls autoPlay loop muted playsInline preload="metadata" src="/manus-storage/final-slide_ba62d737.mp4" aria-label="SidshotsMedia FinalSlide motion reel" />
            <div className="collage-video-overlay" aria-hidden="true"><span>SidshotsMedia / Moving image</span><span>Play the reel ↗</span></div>
          </div>
          <div className="collage-video-footer">
            <p>A moving-image study for campaigns, launches, and visual worlds that need more than a single frame.</p>
            <button onClick={() => scrollTo("booking")}>Book a motion brief <ArrowUpRight size={15} /></button>
          </div>
        </section>

        <section className="collage-contact" id="booking" aria-label="Contact SidshotsMedia">
          <div className="collage-contact-backdrop" aria-hidden="true" />
          <div className="collage-contact-inner">
            <div className="collage-contact-topline"><span className="collage-kicker">SidshotsMedia / Contact</span><span>01 — 05</span></div>
            <div className="collage-contact-grid">
              <div className="collage-contact-copy">
                <span className="collage-contact-availability">Available for select commissions</span>
                <h2>Let’s Create<br /><em>Together.</em></h2>
                <p>Bring the brief, the feeling, or just the first idea. We’ll shape the next frame from there.</p>
                <a className="collage-contact-cta" href="https://wa.me/919699592029?text=Hello%20SIDSHOTS%20MEDIA%2C%20I%27d%20like%20to%20book%20a%20shoot." target="_blank" rel="noreferrer">Book a Shoot <ArrowUpRight size={16} /></a>
              </div>
              <div className="collage-contact-details" aria-label="SidshotsMedia contact details">
                <div className="collage-contact-detail"><span>Team</span><strong>SIDSHOTS MEDIA</strong></div>
                <div className="collage-contact-detail"><span>Email</span><a href="mailto:info@sidshotsmedia.in">info@sidshotsmedia.in <ArrowUpRight size={14} /></a></div>
                <div className="collage-contact-detail"><span>Phone / WhatsApp</span><div className="collage-contact-phone-links"><a href="tel:+919699592029">+91 9699592029 <ArrowUpRight size={14} /></a><a href="tel:+918815888623">+91 8815888623 <ArrowUpRight size={14} /></a><a href="https://wa.me/919699592029?text=Hello%20SIDSHOTS%20MEDIA%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noreferrer">Start a WhatsApp chat <ArrowUpRight size={14} /></a></div></div>
                <div className="collage-contact-detail"><span>Instagram</span><a href="https://www.instagram.com/sidshots_media/" target="_blank" rel="noreferrer">@sidshots_media <ArrowUpRight size={14} /></a></div>
                <div className="collage-contact-detail"><span>Location</span><strong>Pune, Maharashtra</strong></div>
              </div>
            </div>
            <div className="collage-contact-note"><span>Commercial photography · Moving image · Visual direction</span><p>For campaigns, products, architecture, automobiles, and portraits with a point of view.</p></div>
          </div>
        </section>
      </main>

      <footer className="collage-footer"><div className="collage-footer-brand"><strong>SIDSHOTS MEDIA</strong><span>Photography · Cinematography</span></div><div className="collage-footer-links"><a href="mailto:info@sidshotsmedia.in">Email <ArrowUpRight size={13} /></a><a href="https://www.instagram.com/sidshots_media/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://wa.me/919699592029?text=Hello%20SIDSHOTS%20MEDIA%2C%20I%27d%20like%20to%20book%20a%20shoot." target="_blank" rel="noreferrer">Book a shoot <ArrowUpRight size={13} /></a></div><div className="collage-footer-meta"><span>© 2026 SIDSHOTS MEDIA</span><span>Pune, Maharashtra</span></div></footer>

      {selectedDashboard && !selectedPhoto && <div className="dashboard-detail" role="dialog" aria-modal="true" aria-label={`${selectedDashboard.category} photography dashboard`}><div className="dashboard-detail-bar"><button className="dashboard-detail-back" onClick={() => setSelectedDashboard(null)}><ArrowLeft size={16} /> Back to dashboards</button><span>{selectedDashboard.index} / {selectedDashboard.category}</span><button className="dashboard-detail-close" onClick={() => setSelectedDashboard(null)} aria-label="Close dashboard"><X size={20} /></button></div><div className="dashboard-detail-intro"><div><span className="collage-kicker">SidshotsMedia / Photo board</span><span className="dashboard-detail-match" aria-live="polite">Correct dashboard selected · {selectedDashboard.category}</span><h2>{selectedDashboard.category}<br /><em>{selectedDashboard.title}</em></h2></div><p>{selectedDashboard.copy}<br /><span>{dashboardPhotoMap[selectedDashboard.category].length} image slots · final tile reserved for additions</span></p></div><div className="dashboard-board-grid">{dashboardPhotoMap[selectedDashboard.category].map((photo, index) => <button className="dashboard-board-tile" key={`${selectedDashboard.category}-${photo.id}-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`Open ${photo.title}`}><img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" /><span className="dashboard-board-index">{String(index + 1).padStart(2, "0")}</span><span className="dashboard-board-title">{photo.title}</span></button>)}<button className="dashboard-add-tile" onClick={() => toast.info(`New ${selectedDashboard.category.toLowerCase()} photo slot ready for a future image.`)}><strong>+</strong><span>Add photo</span><small>Future frame</small></button></div></div>}

      {selectedPhoto && <div className="collage-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} photograph`} onClick={() => setSelectedPhoto(null)}><button aria-label="Close photograph" onClick={() => setSelectedPhoto(null)}><X size={20} /></button><figure onClick={(event) => event.stopPropagation()}><img src={selectedPhoto.image} alt={selectedPhoto.alt} decoding="async" fetchPriority="high" /><figcaption><span>{selectedPhoto.id} / {selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong></figcaption></figure></div>}
    </div>
  );
}
