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
  { id: "01", title: "Night drive", category: "Automobile", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=88", alt: "Black sports car photographed on a road", tile: "tile-wide" },
  { id: "02", title: "Concrete horizon", category: "Architecture", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=88", alt: "Modern white architecture against the sky", tile: "tile-tall" },
  { id: "03", title: "A quiet object", category: "Product", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=88", alt: "Minimal skincare product photographed in soft light", tile: "tile-square" },
  { id: "04", title: "Mara in afternoon light", category: "Editorial", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=88", alt: "Editorial portrait in warm daylight", tile: "tile-wide" },
  { id: "05", title: "Blue hour study", category: "Editorial", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=88", alt: "Person walking through an open landscape", tile: "tile-tall" },
  { id: "06", title: "Quiet summit", category: "Architecture", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=88", alt: "Snowy mountain peak under a dark sky", tile: "tile-square" },
  { id: "07", title: "Green room", category: "Editorial", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=88", alt: "Green leaves layered in close-up", tile: "tile-tall" },
  { id: "08", title: "Road to nowhere", category: "Automobile", image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=88", alt: "Winding road through a green landscape", tile: "tile-wide" },
  { id: "09", title: "Salt water", category: "Editorial", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=88", alt: "Blue sea meeting a pale beach", tile: "tile-wide" },
  { id: "10", title: "The long way home", category: "Automobile", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=88", alt: "Mountain road through a wide valley", tile: "tile-tall" },
  { id: "11", title: "Forest frequency", category: "Architecture", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=88", alt: "Sunlight filtering through a dense forest", tile: "tile-square" },
  { id: "12", title: "Surface study", category: "Product", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=88", alt: "Minimal chair and table in a bright interior", tile: "tile-tall" },
];

const categories: Category[] = ["All", "Automobile", "Architecture", "Product", "Editorial", "Portrait"];

const dashboardData = [
  { index: "01", category: "Architecture" as const, title: "Built forms in changing light.", service: "Buildings · Interiors · 3D renders", copy: "Spatial studies, material details, and quiet geometry for places with a point of view.", stats: ["07 locations", "03 days", "24 final frames"], primary: photos[1], secondary: photos[10] },
  { index: "02", category: "Automobile" as const, title: "Motion, held for a second.", service: "Car designs · Vehicle concepts", copy: "Campaign-ready automotive frames with pace, atmosphere, and a precise sense of place.", stats: ["05 locations", "02 cars", "18 final frames"], primary: photos[0], secondary: photos[7] },
  { index: "03", category: "Product" as const, title: "Objects with a pulse.", service: "Prototypes · Branding · UI", copy: "Tactile product stories that make the useful feel considered, desirable, and alive.", stats: ["04 sets", "11 surfaces", "32 final frames"], primary: photos[2], secondary: photos[11] },
];

const dashboardPhotoMap: Record<(typeof dashboardData)[number]["category"], Photo[]> = {
  Architecture: [photos[1], photos[5], photos[10], photos[11], photos[6], photos[4], photos[8], photos[9], photos[2], photos[3], photos[7], photos[0]],
  Automobile: [photos[0], photos[7], photos[9], photos[4], photos[8], photos[1], photos[10], photos[5], photos[3], photos[6], photos[2], photos[11]],
  Product: [photos[2], photos[11], photos[3], photos[6], photos[1], photos[10], photos[4], photos[8], photos[0], photos[7], photos[5], photos[9]],
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

      {selectedDashboard && <div className="dashboard-detail" role="dialog" aria-modal="true" aria-label={`${selectedDashboard.category} photography dashboard`}><div className="dashboard-detail-bar"><button className="dashboard-detail-back" onClick={() => setSelectedDashboard(null)}><ArrowLeft size={16} /> Back to dashboards</button><span>{selectedDashboard.index} / {selectedDashboard.category}</span><button className="dashboard-detail-close" onClick={() => setSelectedDashboard(null)} aria-label="Close dashboard"><X size={20} /></button></div><div className="dashboard-detail-intro"><div><span className="collage-kicker">SidshotsMedia / Photo board</span><h2>{selectedDashboard.category}<br /><em>{selectedDashboard.title}</em></h2></div><p>{selectedDashboard.copy}<br /><span>{dashboardPhotoMap[selectedDashboard.category].length} image slots · final tile reserved for additions</span></p></div><div className="dashboard-board-grid">{dashboardPhotoMap[selectedDashboard.category].map((photo, index) => <button className="dashboard-board-tile" key={`${selectedDashboard.category}-${photo.id}-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`Open ${photo.title}`}><img src={photo.image} alt={photo.alt} loading="lazy" /><span className="dashboard-board-index">{String(index + 1).padStart(2, "0")}</span><span className="dashboard-board-title">{photo.title}</span></button>)}<button className="dashboard-add-tile" onClick={() => toast.info(`New ${selectedDashboard.category.toLowerCase()} photo slot ready for a future image.`)}><strong>+</strong><span>Add photo</span><small>Future frame</small></button></div></div>}

      {selectedPhoto && <div className="collage-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} photograph`} onClick={() => setSelectedPhoto(null)}><button aria-label="Close photograph" onClick={() => setSelectedPhoto(null)}><X size={20} /></button><figure onClick={(event) => event.stopPropagation()}><img src={selectedPhoto.image} alt={selectedPhoto.alt} /><figcaption><span>{selectedPhoto.id} / {selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong></figcaption></figure></div>}
    </div>
  );
}
