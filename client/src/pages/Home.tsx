/* Screenshot-matched collage direction: black trophy-style chrome, centered wordmark, colorful photography, white print frames, and a dense gallery wall. */
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const visiblePhotos = useMemo(() => activeCategory === "All" ? photos : photos.filter((photo) => photo.category === activeCategory), [activeCategory]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedPhoto(null);
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
          <button onClick={() => scrollTo("archive")}>Entries</button>
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
        {menuOpen && <nav className="collage-mobile-nav" aria-label="Mobile navigation"><button onClick={() => scrollTo("top")}>Home</button><button onClick={() => scrollTo("archive")}>Entries</button><button onClick={() => scrollTo("booking")}>Bookings</button></nav>}
      </header>

      <main id="top">
        <section className="collage-intro">
          <div><span className="collage-kicker">SidshotsMedia / Commercial photography</span><h1>Frames with<br /><em>a pulse.</em></h1></div>
          <p>Automotive, architecture, product, portrait, and editorial photography for brands with a point of view.</p>
        </section>

        <section className="collage-wall" id="archive" aria-label="SidshotsMedia photography archive">
          {visiblePhotos.map((photo) => <button className={`collage-tile ${photo.tile}`} key={photo.id} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="collage-tile-image"><img src={photo.image} alt={photo.alt} loading="lazy" /></span><span className="collage-tile-caption"><b>{photo.id}</b><span>{photo.category}</span><ChevronRight size={14} /></span></button>)}
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

      {selectedPhoto && <div className="collage-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} photograph`} onClick={() => setSelectedPhoto(null)}><button aria-label="Close photograph" onClick={() => setSelectedPhoto(null)}><X size={20} /></button><figure onClick={(event) => event.stopPropagation()}><img src={selectedPhoto.image} alt={selectedPhoto.alt} /><figcaption><span>{selectedPhoto.id} / {selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong></figcaption></figure></div>}
    </div>
  );
}
