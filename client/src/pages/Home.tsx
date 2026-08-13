/* Screenshot-matched collage direction: black trophy-style chrome, centered wordmark, colorful photography, white print frames, and a dense gallery wall. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { toast } from "sonner";

type Category = "All" | "Automobile" | "Architecture" | "Product" | "Editorial" | "Portrait";

type Photo = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  alt: string;
  tile: string;
};

const photos: Photo[] = [
  { id: "01", title: "The dining room", category: "Architecture", image: "/manus-storage/01-dining-room_d033637f.jpg", alt: "Bright dining room with layered tables, curved windows, and pendant lights", tile: "tile-wide" },
  { id: "02", title: "Poolside still life", category: "Product", image: "/manus-storage/02-poolside-still-life_43b86f31.jpg", alt: "Poolside lounge with umbrellas, dark stone, and warm yellow cushions", tile: "tile-tall" },
  { id: "03", title: "Courtyard waterline", category: "Architecture", image: "/manus-storage/03-courtyard-waterline_6f4fcd01.jpg", alt: "Lush courtyard architecture with a swimming pool and timber balconies", tile: "tile-square" },
  { id: "04", title: "Warm interior", category: "Architecture", image: "/manus-storage/04-warm-interior_71aa8a86.jpg", alt: "Inviting interior with timber ceiling, lounge furniture, and sculptural lighting", tile: "tile-wide" },
  { id: "05", title: "The long table", category: "Editorial", image: "/manus-storage/05-long-table_c4486230.jpg", alt: "Outdoor dining table set beside a tropical pool and garden", tile: "tile-tall" },
  { id: "06", title: "Window light", category: "Architecture", image: "/manus-storage/06-window-light_9a1cc2b3.jpg", alt: "Minimal restaurant interior washed with soft daylight through tall windows", tile: "tile-square" },
  { id: "07", title: "Quiet table", category: "Product", image: "/manus-storage/07-quiet-table_95f55067.jpg", alt: "Long dining table and chairs framed by translucent curtains", tile: "tile-tall" },
  { id: "08", title: "Mural room", category: "Architecture", image: "/manus-storage/08-mural-room_bf47f2fd.jpg", alt: "Bright dining room with botanical wall murals and blue chairs", tile: "tile-wide" },
  { id: "09", title: "Terrace study", category: "Product", image: "/manus-storage/09-terrace-study_1ac0a757.jpg", alt: "Rooftop terrace with graphic paving, tables, and a distant city view", tile: "tile-wide" },
  { id: "10", title: "Evening facade", category: "Architecture", image: "/manus-storage/10-evening-facade_1a5397e9.jpg", alt: "Restaurant facade and terrace arranged for evening service", tile: "tile-tall" },
  { id: "11", title: "Reception geometry", category: "Product", image: "/manus-storage/11-reception-geometry_e87d1fbd.jpg", alt: "Minimal reception desk with warm wood, stone, and a circular mirror", tile: "tile-square" },
  { id: "12", title: "Material detail", category: "Editorial", image: "/manus-storage/01-dining-room_d033637f.jpg", alt: "Editorial detail of a bright hospitality interior and layered materials", tile: "tile-tall" },
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

const secondStripPhotos: Photo[] = [
  { id: "S01", title: "Concrete rhythm", category: "Architecture", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=88", alt: "Modern white building with strong geometric lines and blue sky", tile: "tile-wide" },
  { id: "S02", title: "Open volume", category: "Architecture", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=88", alt: "Contemporary interior with plants, timber, and open workspaces", tile: "tile-tall" },
  { id: "S03", title: "Glass and shadow", category: "Architecture", image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=88", alt: "Monumental glass architecture viewed from a low angle", tile: "tile-square" },
  { id: "S04", title: "Light on stone", category: "Architecture", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=88", alt: "Warm modern living space with stone, wood, and soft daylight", tile: "tile-wide" },
  { id: "S05", title: "The long table", category: "Editorial", image: photos[4].image, alt: photos[4].alt, tile: "tile-tall" },
  { id: "S06", title: "Poolside still life", category: "Product", image: photos[1].image, alt: photos[1].alt, tile: "tile-square" },
  { id: "S07", title: "Quiet table", category: "Product", image: photos[6].image, alt: photos[6].alt, tile: "tile-wide" },
  { id: "S08", title: "Terrace study", category: "Product", image: photos[8].image, alt: photos[8].alt, tile: "tile-tall" },
  { id: "S09", title: "Reception geometry", category: "Product", image: photos[10].image, alt: photos[10].alt, tile: "tile-square" },
  { id: "S10", title: "Night drive", category: "Automobile", image: photos[12].image, alt: photos[12].alt, tile: "tile-wide" },
  { id: "S11", title: "Body line", category: "Automobile", image: photos[13].image, alt: photos[13].alt, tile: "tile-tall" },
  { id: "S12", title: "Red signal", category: "Automobile", image: photos[14].image, alt: photos[14].alt, tile: "tile-square" },
  { id: "S13", title: "Open road", category: "Automobile", image: photos[15].image, alt: photos[15].alt, tile: "tile-wide" },
  ...movedToSecondStripPhotos,
];

const vehiclePhotos: Photo[] = [
  { id: "V01", title: "Rubicon trail", category: "Automobile", image: "/manus-storage/vehicle-01-rubicon_9ff3b652.jpg", alt: "Rugged four-wheel-drive vehicle photographed on a green trail", tile: "tile-wide" },
  { id: "V02", title: "Chrome and red", category: "Automobile", image: "/manus-storage/vehicle-02-motorcycle-detail_17a61b67.jpg", alt: "Close motorcycle detail with red bodywork and chrome handlebars", tile: "tile-tall" },
  { id: "V03", title: "City motorcycle", category: "Automobile", image: "/manus-storage/vehicle-03-motorcycle-city_b2a152a1.jpg", alt: "Motorcycle photographed against a city street and historic architecture", tile: "tile-square" },
  { id: "V04", title: "Green through rain", category: "Automobile", image: "/manus-storage/vehicle-04-green-car-rain_3eda856d.jpg", alt: "Green vehicle passing through a rain-washed road scene", tile: "tile-wide" },
  { id: "V05", title: "Trail machine", category: "Automobile", image: "/manus-storage/vehicle-05-suv-trail_38fd21a6.jpg", alt: "SUV photographed on a muddy green off-road trail", tile: "tile-tall" },
  { id: "V06", title: "Front profile", category: "Automobile", image: "/manus-storage/vehicle-06-suv-portrait_20209bb4.jpg", alt: "SUV front profile framed against a lush outdoor landscape", tile: "tile-square" },
  { id: "V07", title: "Red on the road", category: "Automobile", image: "/manus-storage/vehicle-07-red-suv-road_61b0e3bc.jpg", alt: "Red SUV positioned on a quiet road beneath an overcast sky", tile: "tile-wide" },
  { id: "V08", title: "The lineup", category: "Automobile", image: "/manus-storage/vehicle-08-suv-lineup_90ff3ae4.jpg", alt: "Lineup of colorful SUVs in an open gravel landscape", tile: "tile-tall" },
  { id: "V09", title: "Station stop", category: "Automobile", image: "/manus-storage/vehicle-09-scooter-station_93bc04c5.jpg", alt: "Scooter parked beside a fuel station in a residential street", tile: "tile-square" },
  { id: "V10", title: "Yellow motion", category: "Automobile", image: "/manus-storage/vehicle-10-yellow-car-road_1e359209.jpg", alt: "Yellow car moving along a palm-lined road", tile: "tile-wide" },
  { id: "V11", title: "Water crossing", category: "Automobile", image: "/manus-storage/vehicle-11-motorcycle-water_e2b29d6c.jpg", alt: "Motorcycle rider crossing a shallow waterway in a tropical landscape", tile: "tile-tall" },
  { id: "V12", title: "Desert rider", category: "Automobile", image: "/manus-storage/vehicle-12-motorcycle-desert_7aeb1be7.jpg", alt: "Motorcycle rider photographed in a bright sandy landscape", tile: "tile-square" },
];

const productPhotos: Photo[] = [
  { id: "P01", title: "Perfume object", category: "Product", image: "/manus-storage/product-01-perfume_0506998b.jpg", alt: "Minimal perfume bottle photographed on a clean white set", tile: "tile-wide" },
  { id: "P02", title: "Graphic package", category: "Product", image: "/manus-storage/product-02-packaging_cedafd4e.jpg", alt: "Black and white cosmetic package arranged as a graphic still life", tile: "tile-tall" },
  { id: "P03", title: "Green jar", category: "Product", image: "/manus-storage/product-03-jar_3e9421bc.jpg", alt: "Small product jar styled against tropical green leaves", tile: "tile-square" },
  { id: "P04", title: "Shoe flatlay", category: "Product", image: "/manus-storage/product-04-shoe-flatlay_21fb08d5.jpg", alt: "White shoe and small objects arranged in a botanical flatlay", tile: "tile-wide" },
  { id: "P05", title: "Pink watch", category: "Product", image: "/manus-storage/product-05-watch-pink_d718b32e.jpg", alt: "Pink watch photographed in a diagonal shaft of light", tile: "tile-tall" },
  { id: "P06", title: "Textile watch", category: "Product", image: "/manus-storage/product-06-watch-textile_c50ff9dd.jpg", alt: "Watch arranged on colorful folded textiles", tile: "tile-square" },
  { id: "P07", title: "White leather", category: "Product", image: "/manus-storage/product-07-white-handbag_251427ba.jpg", alt: "White handbag styled against soft neutral fabric", tile: "tile-wide" },
  { id: "P08", title: "Orange silhouette", category: "Product", image: "/manus-storage/product-08-orange-handbag_3f54a641.jpg", alt: "Orange handbag photographed against bold color blocks", tile: "tile-tall" },
  { id: "P09", title: "Green sneaker", category: "Product", image: "/manus-storage/product-09-sneaker-green_1b5b7141.jpg", alt: "White sneaker floating against a deep green background", tile: "tile-square" },
  { id: "P10", title: "Watch and chess", category: "Product", image: "/manus-storage/product-10-watch-still-life_b2af5168.jpg", alt: "Smartwatch arranged with chess pieces and a small wooden block", tile: "tile-wide" },
  { id: "P11", title: "Perfume detail", category: "Product", image: "/manus-storage/product-01-perfume_0506998b.jpg", alt: "Close product detail of the perfume bottle on a clean white set", tile: "tile-tall" },
  { id: "P12", title: "Watch detail", category: "Product", image: "/manus-storage/product-10-watch-still-life_b2af5168.jpg", alt: "Close product detail of a smartwatch styled with chess pieces", tile: "tile-square" },
];

const categories: Category[] = ["All", "Automobile", "Architecture", "Product", "Editorial", "Portrait"];

const dashboardData = [
  { index: "01", category: "Architecture" as const, title: "Built forms in changing light.", service: "Buildings · Interiors · Hospitality", copy: "Spatial studies, material details, and quiet geometry for places with a point of view.", stats: ["07 locations", "03 days", "24 final frames"], primary: photos[0], secondary: photos[2] },
  { index: "02", category: "Automobile" as const, title: "Motion, held for a second.", service: "Vehicles · Motorcycles · Road stories", copy: "A field-ready automotive board built from the vehicle work in the supplied SidshotsMedia archive.", stats: ["12 vehicle frames", "06 road studies", "18 final frames"], primary: vehiclePhotos[0], secondary: vehiclePhotos[6] },
  { index: "03", category: "Product" as const, title: "Objects with a pulse.", service: "Objects · Beauty · Fashion", copy: "Tactile product stories built from the supplied archive, making useful things feel considered, desirable, and alive.", stats: ["12 supplied frames", "08 set-ups", "32 final frames"], primary: productPhotos[0], secondary: productPhotos[7] },
];

const dashboardPhotoMap: Record<(typeof dashboardData)[number]["category"], Photo[]> = {
  Architecture: [photos[0], photos[2], photos[3], photos[5], photos[7], photos[9], photos[0], photos[2], photos[3], photos[5], photos[7], photos[9]],
  Automobile: vehiclePhotos,
  Product: productPhotos,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
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

  return (
    <div className="collage-site">
      <header className="collage-header">
        <nav className="collage-nav collage-nav-left" aria-label="Main navigation">
          <button onClick={() => scrollTo("top")}>Home</button>
          <button onClick={() => scrollTo("dashboards")}>Dashboards</button>
          <button onClick={() => scrollTo("booking")}>Bookings</button>
        </nav>

        <button className="collage-wordmark" onClick={() => scrollTo("top")} aria-label="Back to the SidshotsMedia home page">
          <span className="collage-mark" aria-hidden="true">✣</span>
          <span>SidshotsMedia</span>
        </button>

        <div className="collage-header-actions">
          <p>The work is in.<br /><em>Meet the frames.</em></p>
          <button className="collage-cta" onClick={() => scrollTo("booking")}>See the work <ArrowUpRight size={15} /></button>
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
          <div className="moving-strip moving-strip-forward"><div className="moving-strip-track">{[...stripOne, ...stripOne].map((photo, index) => <button className="moving-photo" key={`${photo.id}-forward-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="moving-photo-image"><img src={photo.image} alt={photo.alt} loading="lazy" /></span><span className="moving-photo-caption"><b>{photo.id}</b><span>{photo.category}</span><ChevronRight size={13} /></span></button>)}</div></div>
          <div className="moving-strip moving-strip-reverse"><div className="moving-strip-track">{[...stripTwo, ...stripTwo].map((photo, index) => <button className="moving-photo" key={`${photo.id}-reverse-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="moving-photo-image"><img src={photo.image} alt={photo.alt} loading="lazy" /></span><span className="moving-photo-caption"><b>{photo.id}</b><span>{photo.category}</span><ChevronRight size={13} /></span></button>)}</div></div>
        </section>

        <section className="dashboard-suite dashboard-reference" id="dashboards" aria-label="Photography dashboards">
          <div className="dashboard-reference-top"><span className="dashboard-mini-mark" aria-label="SidshotsMedia mark">SM</span><nav className="dashboard-reference-links" aria-label="Dashboard navigation"><button onClick={() => scrollTo("archive")}>Work</button><button onClick={() => scrollTo("dashboards")}>About</button><button onClick={() => scrollTo("booking")}>Services</button><button onClick={() => scrollTo("booking")}>Contact</button></nav></div>
          <div className="dashboard-reference-head"><h2>Three Disciplines. <em>One Craft.</em></h2><p>Explore interactive dashboards tailored for each focus area.</p></div>
          <div className="dashboard-card-grid">{dashboardData.map((dashboard) => <article className="dashboard-card" key={dashboard.category}><button className="dashboard-card-media" onClick={() => setSelectedDashboard(dashboard)} aria-label={`Open ${dashboard.category} dashboard`}><img src={dashboard.primary.image} alt={dashboard.primary.alt} loading="lazy" /><span className="dashboard-card-shade" /><div className="dashboard-card-copy"><h3>{dashboard.category}</h3><p>{dashboard.service}</p><span className="dashboard-card-action">Open dashboard <ArrowUpRight size={14} /></span></div></button></article>)}</div>
        </section>

        <section className="collage-filter-bar" aria-label="Filter photography archive">
          <span>Selected frames / 2026</span>
          <div>{categories.map((category) => <button key={category} className={activeCategory === category ? "is-active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <span>{String(visiblePhotos.length).padStart(2, "0")} photographs</span>
        </section>

        <section className="collage-statement">
          <span className="collage-kicker">A note from behind the camera</span>
          <h2>Photographs that make people<br />stop for <em>one second longer.</em></h2>
          <p>I work with teams who care about the difference between a picture of something and a picture that makes it felt.</p>
        </section>

        <section className="collage-video" id="reel" aria-label="SidshotsMedia video slide">
          <div className="collage-video-head">
            <div><span className="collage-kicker">SidshotsMedia / Motion archive</span><h2>Frames in <em>motion.</em></h2></div>
            <span className="collage-video-count">01 / 01 · Editorial reel</span>
          </div>
          <div className="collage-video-stage">
            <video controls autoPlay loop muted playsInline preload="metadata" src="/manus-storage/sidshots-editorial-reel_815c5da8.mp4" aria-label="SidshotsMedia editorial motion reel" />
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
                <a className="collage-contact-cta" href="mailto:studio@jasperhale.co?subject=Book%20a%20shoot%20with%20SidshotsMedia">Book a Shoot <ArrowUpRight size={16} /></a>
              </div>
              <div className="collage-contact-details" aria-label="SidshotsMedia contact details">
                <div className="collage-contact-detail"><span>Team / Studio</span><strong>SidshotsMedia<em>by Jasper Hale</em></strong></div>
                <div className="collage-contact-detail"><span>Email</span><a href="mailto:studio@jasperhale.co">studio@jasperhale.co <ArrowUpRight size={14} /></a></div>
                <div className="collage-contact-detail"><span>Phone / WhatsApp</span><a href="https://api.whatsapp.com/send?text=Hello%20SidshotsMedia%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noreferrer">Start a WhatsApp chat <ArrowUpRight size={14} /></a><small>Phone details available on request</small></div>
                <div className="collage-contact-detail"><span>Instagram</span><a href="https://www.instagram.com/sidshotsmedia/" target="_blank" rel="noreferrer">@sidshotsmedia <ArrowUpRight size={14} /></a></div>
                <div className="collage-contact-detail"><span>Location</span><strong>India <em>Worldwide commissions</em></strong></div>
              </div>
            </div>
            <div className="collage-contact-note"><span>Commercial photography · Moving image · Visual direction</span><p>For campaigns, products, architecture, automobiles, and portraits with a point of view.</p></div>
          </div>
        </section>
      </main>

      <footer className="collage-footer"><div className="collage-footer-brand"><strong>SidshotsMedia</strong><span>by Jasper Hale</span></div><div className="collage-footer-links"><a href="mailto:studio@jasperhale.co">Email <ArrowUpRight size={13} /></a><a href="https://www.instagram.com/sidshotsmedia/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="#booking">Book a shoot <ArrowUpRight size={13} /></a></div><div className="collage-footer-meta"><span>© 2026 SidshotsMedia</span><span>India · Worldwide commissions</span></div></footer>

      {selectedDashboard && !selectedPhoto && <div className="dashboard-detail" role="dialog" aria-modal="true" aria-label={`${selectedDashboard.category} photography dashboard`}><div className="dashboard-detail-bar"><button className="dashboard-detail-back" onClick={() => setSelectedDashboard(null)}><ArrowLeft size={16} /> Back to dashboards</button><span>{selectedDashboard.index} / {selectedDashboard.category}</span><button className="dashboard-detail-close" onClick={() => setSelectedDashboard(null)} aria-label="Close dashboard"><X size={20} /></button></div><div className="dashboard-detail-intro"><div><span className="collage-kicker">SidshotsMedia / Photo board</span><h2>{selectedDashboard.category}<br /><em>{selectedDashboard.title}</em></h2></div><p>{selectedDashboard.copy}<br /><span>{dashboardPhotoMap[selectedDashboard.category].length} image slots · final tile reserved for additions</span></p></div><div className="dashboard-board-grid">{dashboardPhotoMap[selectedDashboard.category].map((photo, index) => <button className="dashboard-board-tile" key={`${selectedDashboard.category}-${photo.id}-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`Open ${photo.title}`}><img src={photo.image} alt={photo.alt} loading="lazy" /><span className="dashboard-board-index">{String(index + 1).padStart(2, "0")}</span><span className="dashboard-board-title">{photo.title}</span></button>)}<button className="dashboard-add-tile" onClick={() => toast.info(`New ${selectedDashboard.category.toLowerCase()} photo slot ready for a future image.`)}><strong>+</strong><span>Add photo</span><small>Future frame</small></button></div></div>}

      {selectedPhoto && <div className="collage-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} photograph`} onClick={() => setSelectedPhoto(null)}><button aria-label="Close photograph" onClick={() => setSelectedPhoto(null)}><X size={20} /></button><figure onClick={(event) => event.stopPropagation()}><img src={selectedPhoto.image} alt={selectedPhoto.alt} /><figcaption><span>{selectedPhoto.id} / {selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong></figcaption></figure></div>}
    </div>
  );
}
