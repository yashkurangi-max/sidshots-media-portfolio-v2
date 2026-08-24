/* Screenshot-matched collage direction: black trophy-style chrome, centered wordmark, colorful photography, white print frames, and a dense gallery wall. */
// Design note: Preserve the black editorial archive while giving touch users a direct, native-feeling pointer carousel on photographs.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type TouchEvent } from "react";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
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
  { id: "01", title: "The dining room", category: "Architecture", image: "/assets/architecture-01-dining-room.webp", alt: "Bright dining room with layered tables, curved windows, and pendant lights", tile: "tile-wide" },
  { id: "02", title: "Poolside still life", category: "Product", image: "/assets/architecture-02-poolside-still-life.webp", alt: "Poolside lounge with umbrellas, dark stone, and warm yellow cushions", tile: "tile-tall" },
  { id: "03", title: "Courtyard waterline", category: "Architecture", image: "/assets/architecture-03-courtyard-waterline.webp", alt: "Lush courtyard architecture with a swimming pool and timber balconies", tile: "tile-square" },
  { id: "04", title: "Warm interior", category: "Architecture", image: "/assets/architecture-04-warm-interior.webp", alt: "Inviting interior with timber ceiling, lounge furniture, and sculptural lighting", tile: "tile-wide" },
  { id: "05", title: "The long table", category: "Editorial", image: "/assets/architecture-05-long-table.webp", alt: "Outdoor dining table set beside a tropical pool and garden", tile: "tile-tall" },
  { id: "06", title: "Window light", category: "Architecture", image: "/assets/architecture-06-window-light.webp", alt: "Minimal restaurant interior washed with soft daylight through tall windows", tile: "tile-square" },
  { id: "07", title: "Quiet table", category: "Product", image: "/assets/architecture-07-quiet-table.webp", alt: "Long dining table and chairs framed by translucent curtains", tile: "tile-tall" },
  { id: "08", title: "Mural room", category: "Architecture", image: "/assets/architecture-08-mural-room.webp", alt: "Bright dining room with botanical wall murals and blue chairs", tile: "tile-wide" },
  { id: "09", title: "Terrace study", category: "Product", image: "/assets/architecture-09-terrace-study.webp", alt: "Rooftop terrace with graphic paving, tables, and a distant city view", tile: "tile-wide" },
  { id: "10", title: "Evening facade", category: "Architecture", image: "/assets/architecture-10-evening-facade.webp", alt: "Restaurant facade and terrace arranged for evening service", tile: "tile-tall" },
  { id: "11", title: "Reception geometry", category: "Product", image: "/assets/architecture-11-reception-geometry.webp", alt: "Minimal reception desk with warm wood, stone, and a circular mirror", tile: "tile-square" },
  { id: "12", title: "Material detail", category: "Editorial", image: "/assets/architecture-01-dining-room.webp", alt: "Editorial detail of a bright hospitality interior and layered materials", tile: "tile-tall" },
  { id: "13", title: "Night drive", category: "Automobile", image: "/assets/automobile-vehicle-01-rubicon.webp", alt: "Black sports car photographed on a road at night", tile: "tile-wide" },
  { id: "14", title: "Body line", category: "Automobile", image: "/assets/automobile-vehicle-06-suv-portrait.webp", alt: "Low front view of a polished sports car", tile: "tile-tall" },
  { id: "15", title: "Red signal", category: "Automobile", image: "/assets/automobile-vehicle-07-red-suv-road.webp", alt: "Red performance car captured in directional light", tile: "tile-square" },
  { id: "16", title: "Open road", category: "Automobile", image: "/assets/automobile-vehicle-10-yellow-car-road.webp", alt: "Vehicle moving along an open road in warm light", tile: "tile-wide" },
];

const firstStripPhotos: Photo[] = [
  { id: "F01", title: "Pink product bottles", category: "Editorial", image: "/assets/strip-01-pink-product-bottles.webp", alt: "Pink product bottles arranged as a clean studio still life", tile: "tile-wide" },
  { id: "F02", title: "Green and white sneakers", category: "Editorial", image: "/assets/product-product-09-sneaker-green.webp", alt: "Pair of white and green sneakers photographed against a graphic dark backdrop", tile: "tile-tall" },
  { id: "F03", title: "White handbag", category: "Editorial", image: "/assets/product-product-07-white-handbag.webp", alt: "White handbag styled against folded blush fabric", tile: "tile-square" },
  { id: "F04", title: "Car through water", category: "Editorial", image: "/assets/strip-04-dsc03172.webp", alt: "Car driving through a wet road with water splashing around it", tile: "tile-wide" },
  { id: "F06", title: "Silver sedan on the road", category: "Editorial", image: "/assets/strip-06-dsc05298-recovered.webp", alt: "Silver sedan parked on an open road beneath a softly lit sky", tile: "tile-square" },
  { id: "F07", title: "Watch and phone flatlay", category: "Editorial", image: "/assets/strip-07-12-copy.webp", alt: "Wristwatch, smartphone, pen, and coffee arranged on a wooden desk", tile: "tile-wide" },
  { id: "F09", title: "Off-road vehicle portrait", category: "Editorial", image: "/assets/strip-09-dsc03186.webp", alt: "Rugged off-road vehicle photographed in a grassy field", tile: "tile-square" },
  { id: "F10", title: "Red SUV roadside", category: "Editorial", image: "/assets/strip-10-dsc0761.webp", alt: "Red SUV photographed on a quiet roadside beneath trees", tile: "tile-wide" },
];

const movedToSecondStripPhotos: Photo[] = [
  { id: "F05", title: "Detoxifying face mask", category: "Editorial", image: "/assets/strip-05-detoxifying-face-mask.webp", alt: "Black detoxifying peel-off face mask tube styled on a warm wood surface", tile: "tile-tall" },
  { id: "F08", title: "Smartwatch on blue textile", category: "Editorial", image: "/assets/product-product-06-watch-textile.webp", alt: "Smartwatch photographed against a textured blue textile background", tile: "tile-tall" },
  { id: "F11", title: "Muddy 4x4 detail", category: "Editorial", image: "/assets/strip-11-dsc04088.webp", alt: "Close detail of a mud-covered four-wheel-drive vehicle", tile: "tile-tall" },
  { id: "F12", title: "White car on a winding road", category: "Editorial", image: "/assets/strip-12-dsc09874.webp", alt: "White car driving along a winding road lined with trees", tile: "tile-square" },
];

const lowerStripSuppliedPhotos: Photo[] = [
  { id: "L04", title: "Graphic mascara", category: "Product", image: "/assets/20.webp", alt: "Minimal black mascara product framed against a high-contrast white and black backdrop", tile: "tile-wide" },
  { id: "L07", title: "Lavender wash", category: "Product", image: "/assets/product-lavender-wash.webp", alt: "Lavender hand wash bottle staged with graphic color blocks and palm leaves", tile: "tile-wide" },
];

const suppliedVehicleStripPhotos: Photo[] = [
  { id: "V13", title: "Quarry scooter", category: "Automobile", image: "/assets/DSC_5690-2.webp", alt: "Scooter photographed against a rocky quarry landscape beneath a pale sky", tile: "tile-wide" },
  { id: "V14", title: "Yellow motion", category: "Automobile", image: "/assets/DSC_1985.webp", alt: "Yellow SUV captured in motion on a palm-lined city road", tile: "tile-tall" },
  { id: "V15", title: "Road rider", category: "Automobile", image: "/assets/DSC_1746.webp", alt: "Motorcycle rider moving along a tree-lined road", tile: "tile-square" },
  { id: "V16", title: "Mud crossing", category: "Automobile", image: "/assets/CopyofDSC04747.webp", alt: "Orange SUV powering through a muddy off-road crossing", tile: "tile-wide" },
  { id: "V17", title: "Rubicon field study", category: "Automobile", image: "/assets/CopyofDSC04628(1).webp", alt: "Mud-covered Rubicon photographed in a green field after an off-road drive", tile: "tile-tall" },
];

const secondStripPhotos: Photo[] = [
  { id: "S04", title: "Light on stone", category: "Architecture", image: "/assets/architecture-04-warm-interior.webp", alt: "Warm modern living space with stone, wood, and soft daylight", tile: "tile-wide" },
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
  { id: "V01", title: "Rubicon trail", category: "Automobile", image: "/assets/automobile-vehicle-01-rubicon.webp", alt: "Rugged four-wheel-drive vehicle photographed on a green trail", tile: "tile-wide" },
  { id: "V02", title: "Chrome and red", category: "Automobile", image: "/assets/automobile-vehicle-02-motorcycle-detail.webp", alt: "Close motorcycle detail with red bodywork and chrome handlebars", tile: "tile-tall" },
  { id: "V03", title: "City motorcycle", category: "Automobile", image: "/assets/automobile-vehicle-03-motorcycle-city.webp", alt: "Motorcycle photographed against a city street and historic architecture", tile: "tile-square" },
  { id: "V04", title: "Green through rain", category: "Automobile", image: "/assets/automobile-vehicle-04-green-car-rain.webp", alt: "Green vehicle passing through a rain-washed road scene", tile: "tile-wide" },
  { id: "V05", title: "Trail machine", category: "Automobile", image: "/assets/automobile-vehicle-05-suv-trail.webp", alt: "SUV photographed on a muddy green off-road trail", tile: "tile-tall" },
  { id: "V06", title: "Front profile", category: "Automobile", image: "/assets/automobile-vehicle-06-suv-portrait.webp", alt: "SUV front profile framed against a lush outdoor landscape", tile: "tile-square" },
  { id: "V07", title: "Red on the road", category: "Automobile", image: "/assets/automobile-vehicle-07-red-suv-road.webp", alt: "Red SUV positioned on a quiet road beneath an overcast sky", tile: "tile-wide" },
  { id: "V08", title: "The lineup", category: "Automobile", image: "/assets/automobile-vehicle-08-suv-lineup.webp", alt: "Lineup of colorful SUVs in an open gravel landscape", tile: "tile-tall" },
  { id: "V09", title: "Station stop", category: "Automobile", image: "/assets/automobile-vehicle-09-scooter-station.webp", alt: "Scooter parked beside a fuel station in a residential street", tile: "tile-square" },
  { id: "V10", title: "Yellow motion", category: "Automobile", image: "/assets/automobile-vehicle-10-yellow-car-road.webp", alt: "Yellow car moving along a palm-lined road", tile: "tile-wide" },
  { id: "V11", title: "Water crossing", category: "Automobile", image: "/assets/automobile-vehicle-11-motorcycle-water.webp", alt: "Motorcycle rider crossing a shallow waterway in a tropical landscape", tile: "tile-tall" },
  { id: "V12", title: "Desert rider", category: "Automobile", image: "/assets/automobile-vehicle-12-motorcycle-desert.webp", alt: "Motorcycle rider photographed in a bright sandy landscape", tile: "tile-square" },
];

const suppliedAutomobilePhotos: Photo[] = [
  { id: "AV13", title: "Rubicon study", category: "Automobile", image: "/assets/rubicon-Copy.jpg", alt: "Jeep Rubicon photographed in an outdoor landscape", tile: "tile-wide" },
  { id: "AV14", title: "Trail profile", category: "Automobile", image: "/assets/DSC03120-Copy-Copy.webp", alt: "Vehicle photographed in a rugged outdoor setting", tile: "tile-tall" },
  { id: "AV15", title: "Wet-road motion", category: "Automobile", image: "/assets/DSC03172(1)-Copy-Copy.webp", alt: "Vehicle captured in motion on a wet road", tile: "tile-square" },
  { id: "AV16", title: "Roadside portrait", category: "Automobile", image: "/assets/DSC05847V2-Copy.webp", alt: "Automobile photographed in a roadside setting", tile: "tile-wide" },
  { id: "AV17", title: "Off-road detail", category: "Automobile", image: "/assets/DSC03104-2-Copy-Copy.webp", alt: "Rugged vehicle detail photographed outdoors", tile: "tile-tall" },
  { id: "AV18", title: "Open-road drive", category: "Automobile", image: "/assets/DSC00080_1-Copy.webp", alt: "Vehicle photographed during an open-road drive", tile: "tile-square" },
  { id: "AV19", title: "Field vehicle", category: "Automobile", image: "/assets/DSC05316-Recovered-Copy-Copy.webp", alt: "Vehicle photographed in a green field", tile: "tile-wide" },
  { id: "AV20", title: "Performance angle", category: "Automobile", image: "/assets/DSC_5700-2-Copy.webp", alt: "Performance vehicle photographed from a dynamic angle", tile: "tile-tall" },
  { id: "AV21", title: "Roadside machine", category: "Automobile", image: "/assets/DSC02416-Copy.webp", alt: "Vehicle photographed beside an open road", tile: "tile-square" },
  { id: "AV22", title: "Rugged trail", category: "Automobile", image: "/assets/DSC03186(1)-Copy-Copy.webp", alt: "Off-road vehicle photographed on a rugged trail", tile: "tile-wide" },
  { id: "AV23", title: "Adventure frame", category: "Automobile", image: "/assets/DSC00453-Copy.webp", alt: "Vehicle photographed as part of an outdoor adventure story", tile: "tile-tall" },
  { id: "AV24", title: "Trail crossing", category: "Automobile", image: "/assets/DSC03032-2-Copy-Copy.webp", alt: "Vehicle photographed crossing an outdoor trail", tile: "tile-square" },
  { id: "AV25", title: "Green-road study", category: "Automobile", image: "/assets/DSC09640-Copy-Copy.webp", alt: "Vehicle photographed against a green landscape", tile: "tile-wide" },
  { id: "AV26", title: "Motion study", category: "Automobile", image: "/assets/DSC_2290.webp", alt: "Automobile photographed in a dynamic motion study", tile: "tile-tall" },
  { id: "AV27", title: "Rubicon field frame", category: "Automobile", image: "/assets/CopyofDSC04751.webp", alt: "Rubicon photographed during an off-road field session", tile: "tile-square" },
];

const productPhotos: Photo[] = [
  { id: "P01", title: "Perfume object", category: "Product", image: "/assets/product-product-01-perfume.webp", alt: "Minimal perfume bottle photographed on a clean white set", tile: "tile-wide" },
  { id: "P02", title: "Graphic package", category: "Product", image: "/assets/product-product-02-packaging.webp", alt: "Black and white cosmetic package arranged as a graphic still life", tile: "tile-tall" },
  { id: "P03", title: "Green jar", category: "Product", image: "/assets/product-product-03-jar.webp", alt: "Small product jar styled against tropical green leaves", tile: "tile-square" },
  { id: "P04", title: "Shoe flatlay", category: "Product", image: "/assets/product-product-04-shoe-flatlay.webp", alt: "White shoe and small objects arranged in a botanical flatlay", tile: "tile-wide" },
  { id: "P05", title: "Pink watch", category: "Product", image: "/assets/product-product-05-watch-pink.webp", alt: "Pink watch photographed in a diagonal shaft of light", tile: "tile-tall" },
  { id: "P06", title: "Textile watch", category: "Product", image: "/assets/product-product-06-watch-textile.webp", alt: "Watch arranged on colorful folded textiles", tile: "tile-square" },
  { id: "P07", title: "White leather", category: "Product", image: "/assets/product-product-07-white-handbag.webp", alt: "White handbag styled against soft neutral fabric", tile: "tile-wide" },
  { id: "P08", title: "Orange silhouette", category: "Product", image: "/assets/product-product-08-orange-handbag.webp", alt: "Orange handbag photographed against bold color blocks", tile: "tile-tall" },
  { id: "P09", title: "Green sneaker", category: "Product", image: "/assets/product-product-09-sneaker-green.webp", alt: "White sneaker floating against a deep green background", tile: "tile-square" },
  { id: "P10", title: "Graphic mascara", category: "Product", image: lowerStripSuppliedPhotos[0].image, alt: lowerStripSuppliedPhotos[0].alt, tile: "tile-wide" },
  { id: "P11", title: "Lavender wash", category: "Product", image: lowerStripSuppliedPhotos[1].image, alt: lowerStripSuppliedPhotos[1].alt, tile: "tile-tall" },
  { id: "P12", title: "Watch detail", category: "Product", image: "/assets/product-product-10-watch-still-life.webp", alt: "Close product detail of a smartwatch styled with chess pieces", tile: "tile-square" },
  { id: "P13", title: "Bold lipliner study", category: "Product", image: "/assets/14.webp", alt: "Red and brown lipliner pencils arranged as a graphic beauty still life", tile: "tile-wide" },
  { id: "P14", title: "Pink nail lacquer", category: "Product", image: "/assets/15(2).webp", alt: "Pink nail lacquer bottles arranged against a soft pink studio background", tile: "tile-tall" },
  { id: "P16", title: "Graphic mascara", category: "Product", image: "/assets/19.webp", alt: "Black mascara tube and wand arranged against pink and coral color blocks", tile: "tile-wide" },
  { id: "P17", title: "Blue hour watch", category: "Product", image: "/assets/13.webp", alt: "Metal chronograph watch styled on deep blue satin fabric", tile: "tile-tall" },
  { id: "P18", title: "Floral lip gloss", category: "Product", image: "/assets/17.webp", alt: "Small lip gloss bottle framed by tropical leaves and flowers on a pink set", tile: "tile-square" },
];

const categories: FilterCategory[] = ["All", "Automobile", "Architecture", "Product"];

const dashboardData = [
  { index: "01", category: "Architecture" as const, title: "Built forms in changing light.", service: "Buildings · Interiors · Hospitality", copy: "Spatial studies, material details, and quiet geometry for places with a point of view.", stats: ["07 locations", "03 days", "24 final frames"], primary: photos[0], secondary: photos[2] },
  { index: "02", category: "Automobile" as const, title: "Motion, held for a second.", service: "Vehicles · Motorcycles · Road stories", copy: "A field-ready automotive board built from the vehicle work in the supplied SidshotsMedia archive.", stats: ["Expandable archive", "06 road studies", "18 final frames"], primary: vehiclePhotos[5], secondary: vehiclePhotos[6] },
  { index: "03", category: "Product" as const, title: "Objects with a pulse.", service: "Objects · Beauty · Fashion", copy: "Tactile product stories built from the supplied archive, making useful things feel considered, desirable, and alive.", stats: ["Expandable archive", "08 set-ups", "32 final frames"], primary: productPhotos[0], secondary: productPhotos[7] },
];

const architectureSuppliedPhotos: Photo[] = [
  { id: "A13", title: "Warm timber lounge", category: "Architecture", image: "/assets/15(1).webp", alt: "Warm interior lounge with timber ceiling, white walls, and blue and yellow seating", tile: "tile-wide" },
  { id: "A14", title: "Quiet reading corner", category: "Architecture", image: "/assets/12(1).webp", alt: "Bright interior corner with a woven lounge chair, wood table, and framed artwork", tile: "tile-tall" },
  { id: "A15", title: "Chandelier dining room", category: "Architecture", image: "/assets/architecture-01-dining-room.webp", alt: "Bright restaurant interior with blue seating, tall windows, and sculptural chandeliers", tile: "tile-wide" },
  { id: "A16", title: "Poolside dining terrace", category: "Architecture", image: "/assets/14.webp", alt: "Open-air dining terrace beside a resort pool with tropical landscaping", tile: "tile-wide" },
  { id: "A17", title: "Resort cabana terrace", category: "Architecture", image: "/assets/10.webp", alt: "Resort terrace with umbrellas, daybeds, tropical foliage, and a timber-roofed building", tile: "tile-tall" },
];

const dashboardPhotoMap: Record<(typeof dashboardData)[number]["category"], Photo[]> = {
  Architecture: [photos[0], photos[2], photos[3], photos[5], photos[7], photos[9], architectureSuppliedPhotos[0], architectureSuppliedPhotos[1], photos[6], photos[8], photos[10], architectureSuppliedPhotos[2], architectureSuppliedPhotos[4]],
  Automobile: [...vehiclePhotos, ...suppliedAutomobilePhotos],
  Product: productPhotos,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<(typeof dashboardData)[number] | null>(null);
  const [dashboardPhotoIndex, setDashboardPhotoIndex] = useState<number | null>(null);
  const [isDashboardClosing, setIsDashboardClosing] = useState(false);
  const [dashboardDragY, setDashboardDragY] = useState(0);
  const [isDashboardDragging, setIsDashboardDragging] = useState(false);
  const [lightboxDrag, setLightboxDrag] = useState({ x: 0, y: 0 });
  const [isLightboxDragging, setIsLightboxDragging] = useState(false);
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);
  const [carouselExitDirection, setCarouselExitDirection] = useState<-1 | 0 | 1>(0);
  const [isCarouselResetting, setIsCarouselResetting] = useState(false);
  const dashboardTouchStart = useRef<{ x: number; y: number } | null>(null);
  const lightboxPointerStart = useRef<{ x: number; y: number; pointerId: number; axis: "none" | "horizontal" | "vertical" } | null>(null);
  const lightboxFigureRef = useRef<HTMLElement>(null);
  const [lightboxGutters, setLightboxGutters] = useState({ left: 0, right: 0 });
  const visiblePhotos = useMemo(() => activeCategory === "All" ? photos : photos.filter((photo) => photo.category === activeCategory), [activeCategory]);
  const visibleSecondStripPhotos = useMemo(() => activeCategory === "All" ? secondStripPhotos : secondStripPhotos.filter((photo) => photo.category === activeCategory), [activeCategory]);
  const stripOne = firstStripPhotos;
  const stripTwo = visibleSecondStripPhotos;
  const dashboardPhotos = selectedDashboard ? dashboardPhotoMap[selectedDashboard.category] : [];
  const previousDashboardPhoto = dashboardPhotoIndex !== null && dashboardPhotos.length > 1 ? dashboardPhotos[(dashboardPhotoIndex - 1 + dashboardPhotos.length) % dashboardPhotos.length] : null;
  const nextDashboardPhoto = dashboardPhotoIndex !== null && dashboardPhotos.length > 1 ? dashboardPhotos[(dashboardPhotoIndex + 1) % dashboardPhotos.length] : null;

  useLayoutEffect(() => {
    if (!selectedPhoto) {
      setLightboxGutters({ left: 0, right: 0 });
      return;
    }

    const measure = () => {
      const frame = lightboxFigureRef.current;
      if (!frame) return;
      const bounds = frame.getBoundingClientRect();
      setLightboxGutters({
        left: Math.max(0, bounds.left) / 2,
        right: Math.max(0, window.innerWidth - bounds.right) / 2,
      });
    };

    measure();
    const frame = lightboxFigureRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [selectedPhoto]);

  function closeLightbox() {
    setSelectedPhoto(null);
    setDashboardPhotoIndex(null);
    setLightboxDrag({ x: 0, y: 0 });
    setIsLightboxDragging(false);
    setIsLightboxClosing(false);
    setCarouselExitDirection(0);
    setIsCarouselResetting(false);
  }

  function dismissLightbox() {
    if (!selectedPhoto || isLightboxClosing) return;
    setIsLightboxClosing(true);
    window.setTimeout(closeLightbox, 220);
  }

  function closeDashboard() {
    if (!selectedDashboard || isDashboardClosing) return;
    setIsDashboardClosing(true);
    window.setTimeout(() => {
      closeLightbox();
      setSelectedDashboard(null);
      setIsDashboardClosing(false);
    }, 280);
  }

  function openDashboardPhoto(photo: Photo, index: number) {
    setDashboardPhotoIndex(index);
    setSelectedPhoto(photo);
  }

  function navigateDashboardPhoto(direction: number) {
    if (!selectedDashboard || dashboardPhotoIndex === null || dashboardPhotos.length === 0) return;
    const nextIndex = (dashboardPhotoIndex + direction + dashboardPhotos.length) % dashboardPhotos.length;
    setLightboxDrag({ x: 0, y: 0 });
    setDashboardPhotoIndex(nextIndex);
    setSelectedPhoto(dashboardPhotos[nextIndex]);
  }

  function completeLightboxSwipe(direction: -1 | 1) {
    if (!selectedDashboard || dashboardPhotoIndex === null || dashboardPhotos.length < 2 || carouselExitDirection !== 0) return;
    setIsLightboxDragging(false);
    setCarouselExitDirection(direction);
    window.setTimeout(() => {
      const nextIndex = (dashboardPhotoIndex + direction + dashboardPhotos.length) % dashboardPhotos.length;
      setIsCarouselResetting(true);
      setLightboxDrag({ x: 0, y: 0 });
      setDashboardPhotoIndex(nextIndex);
      setSelectedPhoto(dashboardPhotos[nextIndex]);
      setCarouselExitDirection(0);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setIsCarouselResetting(false)));
    }, 300);
  }

  function handleDashboardTouchStart(event: TouchEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const isInteractive = target.closest("button, a, input, textarea, video, .dashboard-board-grid, [data-no-dashboard-swipe]");
    if (event.currentTarget.scrollTop > 8 || isInteractive) {
      dashboardTouchStart.current = null;
      return;
    }
    const touch = event.touches[0];
    dashboardTouchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleDashboardTouchMove(event: TouchEvent<HTMLDivElement>) {
    const start = dashboardTouchStart.current;
    if (!start) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (deltaY <= 0 || Math.abs(deltaY) <= Math.abs(deltaX)) {
      setDashboardDragY(0);
      setIsDashboardDragging(false);
      return;
    }
    setIsDashboardDragging(true);
    setDashboardDragY(Math.min(deltaY * 0.72, 190));
  }

  function handleDashboardTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = dashboardTouchStart.current;
    dashboardTouchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    setDashboardDragY(0);
    setIsDashboardDragging(false);
    if (deltaY > 92 && Math.abs(deltaY) > Math.abs(deltaX) * 1.25) closeDashboard();
  }

  function handleLightboxPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || carouselExitDirection !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    lightboxPointerStart.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, axis: "none" };
  }

  function handleLightboxPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = lightboxPointerStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (start.axis === "none") {
      if (Math.hypot(deltaX, deltaY) < 7) return;
      start.axis = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : deltaY > 0 ? "vertical" : "none";
    }
    if (start.axis === "horizontal") {
      event.preventDefault();
      const maxDrag = Math.max(window.innerWidth * 0.82, 260);
      setLightboxDrag({ x: Math.max(-maxDrag, Math.min(maxDrag, deltaX)), y: 0 });
      setIsLightboxDragging(true);
    } else if (start.axis === "vertical") {
      event.preventDefault();
      setLightboxDrag({ x: 0, y: Math.min(180, Math.max(0, deltaY) * 0.78) });
      setIsLightboxDragging(true);
    }
  }

  function finishLightboxPointerDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const start = lightboxPointerStart.current;
    lightboxPointerStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!start || start.pointerId !== event.pointerId || dashboardPhotoIndex === null) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    setIsLightboxDragging(false);
    if (start.axis === "vertical" && deltaY > 94 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2) {
      dismissLightbox();
      return;
    }
    if (start.axis === "horizontal" && Math.abs(deltaX) > 62 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      completeLightboxSwipe(deltaX < 0 ? 1 : -1);
      return;
    }
    setLightboxDrag({ x: 0, y: 0 });
  }

  function cancelLightboxPointerDrag() {
    lightboxPointerStart.current = null;
    setIsLightboxDragging(false);
    setLightboxDrag({ x: 0, y: 0 });
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedPhoto) dismissLightbox();
        else closeDashboard();
      }
      if (selectedPhoto && dashboardPhotoIndex !== null && event.key === "ArrowRight") navigateDashboardPhoto(1);
      if (selectedPhoto && dashboardPhotoIndex !== null && event.key === "ArrowLeft") navigateDashboardPhoto(-1);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPhoto, selectedDashboard, dashboardPhotoIndex, dashboardPhotos.length, isDashboardClosing]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleCategorySelect = (category: FilterCategory) => {
    setActiveCategory(category);
    closeLightbox();

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
          <span className="collage-header-logo" aria-label="Sidshots Media logo"><img src="/assets/sidshots-logo.png" alt="Sidshots Media logo mark" decoding="async" /></span>
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
          <div className="moving-strip moving-strip-forward"><div className="moving-strip-track">{[...stripOne, ...stripOne].map((photo, index) => <button className="moving-photo" key={`${photo.id}-forward-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="moving-photo-image"><img src={photo.image} alt={photo.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" fetchPriority={index < 2 ? "high" : "low"} draggable={false} /></span><span className="moving-photo-caption"><b>{photo.title}</b><ChevronRight size={13} /></span></button>)}</div></div>
          <div className="moving-strip moving-strip-reverse"><div className="moving-strip-track">{[...stripTwo, ...stripTwo].map((photo, index) => <button className="moving-photo" key={`${photo.id}-reverse-${index}`} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}, ${photo.category}`}><span className="moving-photo-image"><img src={photo.image} alt={photo.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" fetchPriority={index < 2 ? "high" : "low"} draggable={false} /></span><span className="moving-photo-caption"><b>{photo.title}</b><ChevronRight size={13} /></span></button>)}</div></div>
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
          <div className="collage-about-label"><span className="collage-kicker">SidshotsMedia / About</span><span>03 — 06</span></div>
          <div className="collage-about-content">
            <h2>Behind<br /><em>the frame.</em></h2>
            <p>I’m Siddharth Dadhe, a photographer with over 7 years of experience in the industry. Over the years, I’ve had the opportunity to work with different brands and automotive magazines, along with projects in automotive, interiors, architecture, products, and commercial photography. Working across different industries has helped me understand that every brand has its own personality. My job is to find that personality and bring it out through the camera. After spending years working in the industry, I decided to take the next step and build something of my own. That’s when I started SIDSHOTS MEDIA. Today, I work with brands to create photography and films that feel real, look good, and most importantly, represent who they are. I’m here to create, experiment, and keep getting better with every frame.</p>
          </div>
        </section>

        <section className="collage-team" id="team" aria-label="Our team">
          <div className="collage-team-label"><span className="collage-kicker">SidshotsMedia / Our team</span><span>04 — 06</span></div>
          <div className="collage-team-heading">
            <h2>OUR <em>TEAM</em></h2>
            <p>The people behind Sidshots Media</p>
          </div>
          <div className="collage-team-grid">
            <article className="collage-team-member"><span>SENIOR PHOTOGRAPHER</span><strong>Siddharth Dadhe</strong></article>
            <article className="collage-team-member"><span>SENIOR CINEMATOGRAPHER</span><strong>Dilan Pemmaiah</strong></article>
            <article className="collage-team-member"><span>WEB DEVELOPER</span><strong>Apurwa Kurangi</strong></article>
            <article className="collage-team-member"><span>SOCIAL MEDIA MANAGER</span><strong>Chaithra Paadi</strong></article>
            <article className="collage-team-member"><span>CONTENT WRITER</span><strong>Aastha Dadhe</strong></article>
            <article className="collage-team-member"><span>MANAGER</span><strong>Akash Brahmane</strong></article>
          </div>
          <p className="collage-team-note">A multidisciplinary team bringing photography, cinematography, content, technology and project management together to create impactful visual experiences.</p>
        </section>

        <section className="collage-video" id="reel" aria-label="SidshotsMedia video slide">
          <div className="collage-video-head">
            <div><span className="collage-kicker">SidshotsMedia / Motion archive</span><h2>Frames in <em>motion.</em></h2></div>
            <span className="collage-video-count">05 / 06 · Editorial reel</span>
          </div>
          <div className="collage-video-stage">
            <video controls autoPlay loop muted playsInline preload="metadata" src="/assets/FinalSlide-web.mp4" aria-label="SidshotsMedia FinalSlide motion reel" />
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
            <div className="collage-contact-topline"><span className="collage-kicker">SidshotsMedia / Contact</span><span>06 — 06</span></div>
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

      {selectedDashboard && <div className={`dashboard-detail${isDashboardClosing ? " is-closing" : ""}${isDashboardDragging ? " is-dragging" : ""}`} role="dialog" aria-modal="true" aria-label={`${selectedDashboard.category} photography dashboard`} onTouchStart={handleDashboardTouchStart} onTouchMove={handleDashboardTouchMove} onTouchEnd={handleDashboardTouchEnd} style={dashboardDragY > 0 ? { transform: `translate3d(0, ${dashboardDragY}px, 0)` } : undefined}>
        <div className="dashboard-detail-bar">
          <button className="dashboard-detail-back" onClick={closeDashboard}><ArrowLeft size={16} /> Back to dashboards</button>
          <span>{selectedDashboard.index} / {selectedDashboard.category}</span>
          <button className="dashboard-detail-close" onClick={closeDashboard} aria-label="Close dashboard"><X size={17} /> <span>Close</span></button>
        </div>
          <div className="dashboard-detail-intro">

          <div>
            <span className="collage-kicker">SidshotsMedia / Photo board</span>
            <span className="dashboard-detail-match" aria-live="polite">Correct dashboard selected · {selectedDashboard.category}</span>
            <h2>{selectedDashboard.category}<br /><em>{selectedDashboard.title}</em></h2>
          </div>
          <p>{selectedDashboard.copy}<br /><span>{dashboardPhotos.length} photographs · expandable archive</span><small className="dashboard-swipe-hint">On touch devices, pull down from this header to close.</small></p>
        </div>
        <div className="dashboard-board-grid">
          {dashboardPhotos.map((photo, index) => <button className="dashboard-board-tile" key={`${selectedDashboard.category}-${photo.id}-${index}`} onClick={() => openDashboardPhoto(photo, index)} aria-label={`Open ${photo.title}`}><img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" /><span className="dashboard-board-index">{String(index + 1).padStart(2, "0")}</span><span className="dashboard-board-title">{photo.title}</span></button>)}
        </div>
      </div>}

      {selectedPhoto && <div className={`collage-lightbox${isLightboxDragging ? " is-dragging" : ""}${isLightboxClosing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} photograph`} style={{ ...(isLightboxDragging ? { background: `rgba(0,0,0,${Math.max(0.68, 0.93 - lightboxDrag.y / 620)})` } : {}), "--lightbox-left-gutter": `${lightboxGutters.left}px`, "--lightbox-right-gutter": `${lightboxGutters.right}px` } as React.CSSProperties}>
        <button className="collage-lightbox-close" aria-label="Close photograph" onClick={dismissLightbox}><X size={20} /> <span>Close</span></button>
        <figure ref={lightboxFigureRef} style={isLightboxDragging && lightboxDrag.y > 0 ? { transform: `translate3d(0, ${lightboxDrag.y}px, 0)` } : undefined}>
          {dashboardPhotoIndex !== null && <button type="button" className="collage-lightbox-arrow collage-lightbox-arrow-prev" aria-label="Previous photograph" onClick={() => navigateDashboardPhoto(-1)}><ChevronLeft size={24} strokeWidth={1.8} /></button>}
          <div className="collage-lightbox-viewport" aria-live="polite" onPointerDown={handleLightboxPointerDown} onPointerMove={handleLightboxPointerMove} onPointerUp={finishLightboxPointerDrag} onPointerCancel={cancelLightboxPointerDrag}>
            <div className={`collage-lightbox-track${isCarouselResetting ? " is-resetting" : ""}${dashboardPhotoIndex === null ? " is-single" : ""}`} style={{ transform: dashboardPhotoIndex === null ? "translate3d(0%, 0, 0)" : carouselExitDirection === 1 ? "translate3d(-66.666666%, 0, 0)" : carouselExitDirection === -1 ? "translate3d(0%, 0, 0)" : `translate3d(calc(-33.333333% + ${lightboxDrag.x}px), 0, 0)` }}>
              {previousDashboardPhoto && <div className="collage-lightbox-slide" aria-hidden="true"><img src={previousDashboardPhoto.image} alt="" decoding="async" /></div>}
              <div className="collage-lightbox-slide collage-lightbox-slide-current"><img className="collage-lightbox-image" src={selectedPhoto.image} alt={selectedPhoto.alt} decoding="async" fetchPriority="high" /></div>
              {nextDashboardPhoto && <div className="collage-lightbox-slide" aria-hidden="true"><img src={nextDashboardPhoto.image} alt="" decoding="async" /></div>}
            </div>
          </div>
          {dashboardPhotoIndex !== null && <button type="button" className="collage-lightbox-arrow collage-lightbox-arrow-next" aria-label="Next photograph" onClick={() => navigateDashboardPhoto(1)}><ChevronRight size={24} strokeWidth={1.8} /></button>}
          <figcaption><span>{dashboardPhotoIndex !== null ? `${String(dashboardPhotoIndex + 1).padStart(2, "0")} / ${String(dashboardPhotos.length).padStart(2, "0")} · ` : ""}{selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong></figcaption>
        </figure>
      </div>}
    </div>
  );
}
