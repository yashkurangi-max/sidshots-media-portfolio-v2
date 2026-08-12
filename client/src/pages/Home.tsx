/* Soft Signal Studio: image-first asymmetry, quiet instrumentation, pastel contrast, tactile depth. */
import { useMemo, useState } from "react";
import { ArrowUpRight, Camera, Check, ChevronRight, CircleArrowOutUpRight, Menu, MoveRight, Play, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

type Filter = "All" | "Corporate" | "Product" | "Editorial";

const galleryImages = [
  {
    id: "01",
    title: "Night drive, soft focus",
    project: "Automobile",
    filter: "Corporate" as Filter,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
    size: "tall",
    note: "Campaign / 2024",
  },
  {
    id: "02",
    title: "Edges of arrival",
    project: "Architecture",
    filter: "Corporate" as Filter,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
    size: "standard",
    note: "Built environment / 2023",
  },
  {
    id: "03",
    title: "A quiet object",
    project: "Product",
    filter: "Product" as Filter,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
    size: "square",
    note: "Still life / 2024",
  },
  {
    id: "04",
    title: "Mara in afternoon light",
    project: "Editorial",
    filter: "Editorial" as Filter,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    size: "wide",
    note: "Portrait / 2024",
  },
];

const dashboardCards = [
  { label: "01", title: "Automobile", description: "Motion, material, and the feeling of getting somewhere.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85", filter: "Corporate" as Filter, metric: "08 frames" },
  { label: "02", title: "Architecture", description: "Quiet geometry for places built to be remembered.", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85", filter: "Corporate" as Filter, metric: "12 studies" },
  { label: "03", title: "Product", description: "Objects with enough light to become a point of view.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85", filter: "Product" as Filter, metric: "06 sets" },
];

const categoryHighlights = [
  { number: "01", title: "Automobile", note: "Motion / material / atmosphere", image: galleryImages[0].image },
  { number: "02", title: "Architecture", note: "Structure / light / rhythm", image: galleryImages[1].image },
  { number: "03", title: "Product", note: "Object / surface / desire", image: galleryImages[2].image },
  { number: "04", title: "Editorial", note: "People / place / presence", image: galleryImages[3].image },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categoryHighlights[0]);
  const filteredImages = useMemo(
    () => activeFilter === "All" ? galleryImages : galleryImages.filter((item) => item.filter === activeFilter),
    [activeFilter],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    requestAnimationFrame(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <nav className="reference-nav-left" aria-label="Section navigation">
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("studio")}>Studio</button>
          <button onClick={() => scrollTo("booking")}>Bookings</button>
        </nav>
        <button className="brand-lockup" onClick={() => scrollTo("top")} aria-label="Back to top">
          <span className="brand-mark"><span className="aperture-mark" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span></span>
          <span className="brand-name">SidshotsMedia</span>
          <span className="brand-role">by Jasper Hale</span>
        </button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <button onClick={() => scrollTo("work")}>Selected work <span>04</span></button>
          <button onClick={() => scrollTo("studio")}>Studio notes</button>
          <button onClick={() => scrollTo("booking")}>See winners <ArrowUpRight size={14} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section section-pad">
          <div className="reference-hero-meta reveal-up"><span>COMMERCIAL PHOTOGRAPHY / 2024</span><span>JASPER HALE / SIDSHOTSMEDIA</span><span>SCROLL TO ENTER THE ARCHIVE ↓</span></div>
          <div className="reference-hero-copy reveal-up">
            <div><span className="eyebrow"><span className="eyebrow-dot" /> The useful made unforgettable</span><h1 className="hero-brand-heading">Sidshots<span>Media</span><sup>™</sup></h1></div>
            <div className="reference-hero-intro"><p>Images for brands with a point of view — automotive, architecture, product, and the people behind the thing.</p><button className="reference-cta" onClick={() => scrollTo("booking")}>Bring the brief <ArrowUpRight size={16} /></button></div>
          </div>
          <div className="hero-contact-sheet reveal-up delay-one" aria-label="Selected SidshotsMedia work">
            {galleryImages.map((item, index) => <figure className={`contact-frame frame-${index + 1}`} key={item.id}><img src={item.image} alt={item.title} /><figcaption><span>{item.id}</span><span>{item.project}</span></figcaption></figure>)}
          </div>
          <div className="reference-hero-foot"><span>01—04 / SELECTED ENTRIES</span><span className="hero-foot-rule" /><span>LIGHT, MATERIAL, MOTION</span></div>
        </section>

        <section className="signal-strip section-pad" aria-label="Studio capabilities">
          <div className="signal-intro"><span className="mono-label">Studio / The short version</span><p>Campaigns, launches, and the in-between moments that give a brand its pulse.</p></div>
          <div className="signal-stat"><strong>14</strong><span>years making<br />images</span></div>
          <div className="signal-stat"><strong>32</strong><span>cities, one<br />camera bag</span></div>
          <div className="signal-stat signal-quote"><Sparkles size={18} /><span>“Bring the brief.<br />I’ll bring the light.”</span></div>
        </section>

        <div className="film-strip" aria-hidden="true"><div className="film-strip-track">{Array.from({ length: 8 }, (_, index) => <span key={index}>SIDSHOTSMEDIA <b>·</b> FRAME {String(index + 1).padStart(2, "0")}</span>)}</div></div>

        <section className="work-section section-pad" id="work">
          <div className="section-heading">
            <div><span className="mono-label">Selected entries / 2023—24</span><h2>A point of view,<br /><em>in four frames.</em></h2></div>
            <p>Choose a lane. Hover the image. Stay for the details.</p>
          </div>

          <div className="dashboard-grid">
            {dashboardCards.map((card) => (
              <button className="dashboard-card" key={card.title} onClick={() => selectFilter(card.filter)}>
                <div className="dashboard-image-wrap"><img src={card.image} alt={`${card.title} photography project`} /><span className="dashboard-index">{card.label}</span><span className="dashboard-open"><Plus size={16} /></span></div>
                <div className="dashboard-card-body"><div><h3>{card.title}</h3><p>{card.description}</p></div><span className="dashboard-metric">{card.metric}<ChevronRight size={15} /></span></div>
              </button>
            ))}
          </div>

          <div className="gallery-toolbar">
            <div className="filter-group" role="group" aria-label="Filter work by category">
              {(["All", "Corporate", "Product", "Editorial"] as Filter[]).map((filter) => (
                <button key={filter} className={activeFilter === filter ? "filter-button is-active" : "filter-button"} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>
              ))}
            </div>
            <span className="gallery-count">Showing {String(filteredImages.length).padStart(2, "0")} frames <span className="count-line" /></span>
          </div>

          <div className="masonry-grid">
            {filteredImages.map((item) => (
              <article className={`gallery-card ${item.size}`} key={item.id}>
                <div className="gallery-image-wrap"><img src={item.image} alt={item.title} loading="lazy" /><span className="gallery-hover"><CircleArrowOutUpRight size={19} /></span></div>
                <div className="gallery-meta"><span><b>{item.id}</b> / {item.project}</span><span>{item.note}</span></div>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="category-wall section-pad" aria-labelledby="category-wall-title">
          <div className="category-wall-head"><span className="mono-label">Archive / Awarded categories</span><span>Hover to preview the lane</span></div>
          <div className="category-wall-grid">
            <div className="category-wall-list">
              <h2 id="category-wall-title">Find the<br /><em>frequency.</em></h2>
              {categoryHighlights.map((category) => <button className={activeCategory.title === category.title ? "category-row is-active" : "category-row"} key={category.title} onMouseEnter={() => setActiveCategory(category)} onFocus={() => setActiveCategory(category)} onClick={() => selectFilter(category.title === "Product" ? "Product" : category.title === "Editorial" ? "Editorial" : "Corporate")}><span>{category.number}</span><strong>{category.title}</strong><small>{category.note}</small><ChevronRight size={16} /></button>)}
            </div>
            <div className="category-preview"><img src={activeCategory.image} alt={`${activeCategory.title} selected preview`} /><div className="category-preview-label"><span>{activeCategory.number} / {activeCategory.title}</span><span>Selected frame ↗</span></div></div>
          </div>
        </section>

        <section className="studio-section section-pad" id="studio">
          <div className="studio-label"><span className="mono-label">02 / Studio notes</span><div className="vertical-rule" /></div>
          <div className="studio-copy"><h2>Good work happens<br />between the <em>brief</em><br />and the blink.</h2><p>I make images that carry a little atmosphere with them. That means a considered frame, a real conversation, and enough room for the unexpected to show up.</p><button className="button-quiet" onClick={() => toast.info("Studio notes are open for conversation.")}>A note from Jasper <ArrowUpRight size={16} /></button></div>
          <div className="studio-points"><div><span>01</span><p>For the launch<br />that needs a pulse.</p></div><div><span>02</span><p>For the team<br />behind the thing.</p></div><div><span>03</span><p>For the object<br />worth noticing.</p></div></div>
        </section>

        <section className="testimonial-section section-pad">
          <div className="testimonial-mark">“</div>
          <div className="testimonial-content"><span className="mono-label">A word from the other side of the lens</span><blockquote>Jasper found the quiet confidence in the product before we knew how to describe it. The images gave the whole launch a point of view.</blockquote><div className="testimonial-credit"><span className="credit-line" /><span>Amelia Roth / Brand Director, Northline</span></div></div>
          <div className="testimonial-foot"><span>Client notes / 01</span><span>More soon <MoveRight size={14} /></span></div>
        </section>

        <section className="booking-section section-pad" id="booking">
          <div className="booking-panel">
            <div className="booking-copy"><span className="mono-label">03 / Booking desk</span><h2>Have a brief<br />in mind?</h2><p>Tell me what you’re making, where it lives, and when the light needs to be right. I’ll be in touch within two working days.</p><div className="booking-details"><span><Camera size={16} /> Corporate events</span><span><Camera size={16} /> Product shoots</span><span><Camera size={16} /> Headshots</span></div></div>
            <form className="booking-form" onSubmit={(event) => { event.preventDefault(); toast.success("Thanks — your booking request is ready for Jasper."); }}>
              <label>Name<input required type="text" placeholder="Your name" /></label>
              <label>Work email<input required type="email" placeholder="you@company.com" /></label>
              <label>What are we making?<textarea required rows={3} placeholder="A launch, a portrait series, a room full of people..." /></label>
              <button className="button-primary button-submit" type="submit">Send the brief <ArrowUpRight size={17} /></button>
              <span className="form-note"><Check size={14} /> No pitch deck required.</span>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad"><div className="footer-brand"><span className="brand-mark"><span className="aperture-mark" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span></span><span className="brand-name">SidshotsMedia</span></div><div className="footer-contact"><span>Available for selected projects / 2024</span><a href="mailto:studio@jasperhale.co">studio@jasperhale.co <ArrowUpRight size={14} /></a></div><div className="footer-social"><a href="#top">Instagram</a><a href="#top">Are.na</a><a href="#top">Back to top ↑</a></div></footer>
    </div>
  );
}
