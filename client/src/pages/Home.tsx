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

const categories: Category[] = ["All", "Automobile", "Architecture", "Product", "Editorial", "Portrait"];

const dashboardData = [
  { index: "01", category: "Architecture" as const, title: "Built forms in changing light.", service: "Buildings · Interiors · Hospitality", copy: "Spatial studies, material details, and quiet geometry for places with a point of view.", stats: ["07 locations", "03 days", "24 final frames"], primary: photos[0], secondary: photos[2] },
  { index: "02", category: "Automobile" as const, title: "Motion, held for a second.", service: "Vehicles · Motorcycles · Road stories", copy: "A field-ready automotive board built from the vehicle work in the supplied SidshotsMedia archive.", stats: ["12 vehicle frames", "06 road studies", "18 final frames"], primary: vehiclePhotos[0], secondary: vehiclePhotos[6] },
  { index: "03", category: "Product" as const, title: "Objects with a pulse.", service: "Objects · Interiors · Details", copy: "Tactile product stories that make the useful feel considered, desirable, and alive.", stats: ["04 sets", "11 surfaces", "32 final frames"], primary: photos[1], secondary: photos[6] },
];

const dashboardPhotoMap: Record<(typeof dashboardData)[number]["category"], Photo[]> = {
  Architecture: [photos[0], photos[2], photos[3], photos[5], photos[7], photos[9], photos[0], photos[2], photos[3], photos[5], photos[7], photos[9]],
  Automobile: vehiclePhotos,
  Product: [photos[1], photos[6], photos[8], photos[10], photos[4], photos[11], photos[1], photos[6], photos[8], photos[10], photos[4], photos[11]],
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<(typeof dashboardData)[number] | null>(null);
  const visiblePhotos = useMemo(() => activeCategory === "All" ? photos : photos.filter((photo) => photo.category === activeCategory), [activeCategory]);
  const stripOne = visiblePhotos.filter((_, index) => index % 2 === 0);
  const stripTwo = visiblePhotos.filter((_, index) => index % 2 !== 0);

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

        <section className="collage-booking" id="booking">
          <div><span className="collage-kicker">The next frame</span><h2>Have a brief<br /><em>in mind?</em></h2><p>Tell me what you’re making, where it lives, and when the light needs to be right.</p></div>
          <form onSubmit={(event) => { event.preventDefault(); toast.success("Thanks — your photography brief is ready for Jasper."); }}>
            <label>Your name<input required placeholder="Name" /></label>
            <label>Work email<input required type="email" placeholder="you@company.com" /></label>
            <label>What are we photographing?<textarea required rows={3} placeholder="A campaign, a product, a portrait series..." /></label>
            <button type="submit">Send the brief <ArrowUpRight size={16} /></button>
          </form>
        </section>
      </main>

      <footer className="collage-footer"><span>SidshotsMedia / Jasper Hale</span><span>Automotive · Architecture · Product · Editorial</span><a href="mailto:studio@jasperhale.co">studio@jasperhale.co <ArrowUpRight size={14} /></a></footer>

      {selectedDashboard && !selectedPhoto && <div className="dashboard-detail" role="dialog" aria-modal="true" aria-label={`${selectedDashboard.category} photography dashboard`}><div className="dashboard-detail-bar"><button className="dashboard-detail-back" onClick={() => setSelectedDashboard(null)}><ArrowLeft size={16} /> Back to dashboards</button><span>{selectedDashboard.index} / {selectedDashboard.category}</span><button className="dashboard-detail-close" onClick={() => setSelectedDashboard(null)} aria-label="Close dashboard"><X size={20} /></button></div><div className="dashboard-detail-intro"><div><span className="collage-kicker">SidshotsMedia / Photo board</span><h2>{selectedDashboard.category}<br /><em>{selectedDashboard.title}</em></h2></div><p>{selectedDashboard.copy}<br /><span>{dashboardPhotoMap[selectedDashboard.category].length} image slots · final tile reserved for additions</span></p></div><div className="dashboard-board-grid">{dashboardPhotoMap[selectedDashboard.category].map((photo, index) => <button className="dashboard-board-tile" key={`${selectedDashboard.category}-${photo.id}-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`Open ${photo.title}`}><img src={photo.image} alt={photo.alt} loading="lazy" /><span className="dashboard-board-index">{String(index + 1).padStart(2, "0")}</span><span className="dashboard-board-title">{photo.title}</span></button>)}<button className="dashboard-add-tile" onClick={() => toast.info(`New ${selectedDashboard.category.toLowerCase()} photo slot ready for a future image.`)}><strong>+</strong><span>Add photo</span><small>Future frame</small></button></div></div>}

      {selectedPhoto && <div className="collage-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} photograph`} onClick={() => setSelectedPhoto(null)}><button aria-label="Close photograph" onClick={() => setSelectedPhoto(null)}><X size={20} /></button><figure onClick={(event) => event.stopPropagation()}><img src={selectedPhoto.image} alt={selectedPhoto.alt} /><figcaption><span>{selectedPhoto.id} / {selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong></figcaption></figure></div>}
    </div>
  );
}
