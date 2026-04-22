/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Menu, Linkedin, Instagram, 
  AlertTriangle, Phone, Mail, History,
  Globe, Package, Factory, CheckCircle, Ship, Truck,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// --- DATA: 19 CATALOG ITEMS ---
interface CatalogItem {
  id: string;
  name: string;
  desc: string;
  img: string;
  cat: string;
}

const FULL_CATALOG: CatalogItem[] = [
  { id: 'aprons', name: "Aprons & Napkins", desc: "Materials: 100% Cotton Twill 3x1, PC. Sizes and designs as per requirement.", img: "/website_pictures/apron_napkins.png", cat: "KITCHEN" },
  { id: 'bamboo', name: "Bamboo & Aloe Vera", desc: "Materials: 100% Polyester. Natural fiber treatments for cooling skin contact.", img: "/website_pictures/bamboo_aloe_vera.png", cat: "NATURAL" },
  { id: 'bathrobe', name: "Bathrobe & Bathmat", desc: "Materials: 100% Cotton, PC. High GSM terry fabrics for luxury hotels.", img: "/website_pictures/bathrobe_bathmat.png", cat: "BATH" },
  { id: 'bedsets', name: "Bedsets", desc: "Articles: Dyed, Printed, Cuff Piping. Materials: 100% Cotton, PC, MicroFiber.", img: "/website_pictures/bedsets.png", cat: "BEDDING" },
  { id: 'cushions', name: "Cushion Covers", desc: "Articles: Elastic, Zipper, Frill. Materials: 100% Cotton, PC, MicroFiber.", img: "/website_pictures/cushion_covers.png", cat: "DECOR" },
  { id: 'duvet', name: "Duvet Cover", desc: "Materials: 100% Polyester, PC, 100% Cotton. Standard industrial grade quality.", img: "/website_pictures/duvet_cover.png", cat: "BEDDING" },
  { id: 'fitted-sheet', name: "Fitted Sheet", desc: "Articles: Dyed, Printed, Terry, Laminated, Stripe. Materials: 100% Cotton, PC, MicroFiber.", img: "/website_pictures/fitted_sheets.png", cat: "BEDDING" },
  { id: 'flat-sheets', name: "Flat Sheets", desc: "Articles: Dyed, Printed. Materials: 100% Cotton, PC, MicroFiber.", img: "/website_pictures/flat_sheets.png", cat: "BEDDING" },
  { id: 'fleece', name: "Fleece", desc: "Articles: Polar, Coral, Sherpa, Pile. Materials: 100% Polyester.", img: "/website_pictures/fleece.png", cat: "WINTER" },
  { id: 'iron-stand', name: "Iron Stand Covers", desc: "Materials: 100% Cotton or PC laminated with 100% polyester felt.", img: "/website_pictures/iron_stand_covers.png", cat: "HOME" },
  { id: 'laminated', name: "Laminated Products", desc: "Articles: Mattress Protector. Materials: 100% Polyester/Cotton Terry, Flannel.", img: "/website_pictures/laminated_products.png", cat: "PROTECTION" },
  { id: 'fabric-rolls', name: "Printed Fabric Rolls", desc: "Materials: 100% Cotton, PC, Microfiber, Twill 100% polyester Dyed.", img: "/website_pictures/printed_fabric_rolls.png", cat: "RAW MATERIAL" },
  { id: 'bedspread', name: "Quiltted Bedspread", desc: "Articles: Bed Cover. Materials: 100% Polyester, 100% Cotton, PC.", img: "/website_pictures/quiltted_bedspread.png", cat: "LIVING" },
  { id: 'stripe-pillow', name: "Stripe Pillow & Fitted", desc: "Materials: 100% Cotton, PC, Microfiber Embossed. Satin stripe design.", img: "/website_pictures/stripe_pillow_fitted.png", cat: "HOTEL" },
  { id: 'table-covers', name: "Table Covers", desc: "Articles: Frill, Laminated, Pom Pom Lace, Waterproof Matt, Loneta. Materials: 100% Cotton, PC, MicroFiber.", img: "/website_pictures/tablecovers.png", cat: "DINING" },
  { id: 'terry-beach', name: "Terry & Beach Towels", desc: "Materials: 100% Cotton, PC. Large colorful high-absorption towels.", img: "/website_pictures/terry_beach_towels.png", cat: "BATH" },
  { id: 'terry-fitted', name: "Terry Fitted Sheet", desc: "Articles: Jacquard, Plain. Materials: 100% Polyester, PC.", img: "/website_pictures/terry_fitted_sheet.png", cat: "BEDDING" },
  { id: 'ultrasonic', name: "Ultrasonic Quilted Pillow Covers", desc: "Articles: With Zip, Without Zip. Materials: 100% Polyester.", img: "/website_pictures/ultrasonic_quilted_pillow_covers.png", cat: "TECH" }
];

// --- COMPONENTS ---

const OptimizedImage = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
           <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};

const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    const duration = 1200; // 1.2s total
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
};

const GlobalMap = () => {
  const ROUTES = [
    { name: "Europe", coords: { x: 510, y: 160 } },
    { name: "Spain", coords: { x: 470, y: 180 } },
    { name: "USA", coords: { x: 280, y: 180 } },
    { name: "Canada", coords: { x: 250, y: 140 } }
  ];
  return (
    <section className="py-20 md:py-24 bg-white border-y border-slate-100 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center text-slate-900">
        <div className="lg:col-span-7 bg-[#1A1A1A] rounded-2xl p-6 md:p-12 relative shadow-2xl overflow-hidden min-h-[350px] md:min-h-[450px]">
          <div className="relative z-10 mb-8 md:mb-12 text-center md:text-left">
            <h3 className="text-white text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none mb-3">Our partners span <br/> the globe.</h3>
            <p className="text-[#A11E22] text-[10px] font-black uppercase tracking-[0.4em]">Exporting to 21+ Countries</p>
          </div>
          <div className="relative aspect-[16/10] w-full mt-4 bg-black/20 rounded-lg overflow-hidden border border-white/5">
            <OptimizedImage 
              src="/website_pictures/world_map.png" 
              alt="World Map" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/map/1000/600?grayscale";
              }}
            />
          </div>
        </div>
        <div className="lg:col-span-5 text-slate-900">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8 leading-none">Global Network. <br/> <span className="text-[#A11E22]">Verified Delivery.</span></h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 flex items-center justify-center"><Phone size={18} className="text-[#A11E22]"/></div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Call us at</p>
                <div className="flex gap-2">
                  <a href="tel:+92412518216" className="text-sm font-bold hover:text-[#A11E22] transition-colors">+92 41 2518216</a>
                  <span className="text-slate-200">,</span>
                  <a href="https://wa.me/923151118876" target="_blank" rel="noreferrer" className="text-sm font-bold hover:text-[#A11E22] transition-colors">+92 315 1118876</a>
                </div>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 flex items-center justify-center"><Mail size={18} className="text-[#A11E22]"/></div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email us at</p>
                <a href="mailto:info@manzatextilemills.com" className="text-sm font-bold hover:text-[#A11E22] transition-colors">info@manzatextilemills.com</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 mt-8">
              <div><p className="text-3xl font-black text-slate-900 tracking-tighter"><Counter value="2" suffix=" Millions+" /></p><p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Units produced yearly</p></div>
              <div><p className="text-3xl font-black text-slate-900 tracking-tighter"><Counter value="92" suffix="%" /></p><p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Production efficiency</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface NavbarProps {
  setPage: (page: string) => void;
  currentPage: string;
  scrollToForm: () => void;
}

const Navbar = ({ setPage, currentPage, scrollToForm }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (p: string) => {
    setPage(p);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-[100] bg-white/95 border-b border-slate-200 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center text-slate-900">
        <button onClick={() => handleNav('home')} className="flex items-center gap-3 leading-none uppercase italic focus:outline-none group">
          <div className="w-9 h-9 flex items-center justify-center overflow-hidden">
            <img 
              src="/website_pictures/logo.png" 
              alt="Manza Logo" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-8 h-8 bg-[#A11E22] flex items-center justify-center font-black text-white">M</div>';
              }}
            />
          </div>
          <p className="text-base md:text-lg font-black tracking-tighter">Manza Textile Mills</p>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-14 text-[12px] font-black uppercase tracking-widest text-slate-400">
          <button onClick={() => setPage('home')} className={`transition-colors focus:outline-none ${currentPage === 'home' ? 'text-[#A11E22]' : 'hover:text-black'}`}>Home</button>
          <button onClick={() => setPage('about')} className={`transition-colors focus:outline-none ${currentPage === 'about' ? 'text-[#A11E22]' : 'hover:text-black'}`}>About Us</button>
          <button onClick={() => setPage('catalog')} className={`transition-colors focus:outline-none ${currentPage === 'catalog' ? 'text-[#A11E22]' : 'hover:text-black'}`}>Collection</button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={scrollToForm} className="hidden sm:block bg-[#A11E22] text-white px-7 py-3 rounded text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all">Get A Price</button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-slate-900 bg-slate-50 border border-slate-100 rounded focus:outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6 text-[12px] font-black uppercase tracking-widest">
               <button onClick={() => handleNav('home')} className={`text-left ${currentPage === 'home' ? 'text-[#A11E22]' : 'text-slate-400'}`}>Home</button>
               <button onClick={() => handleNav('about')} className={`text-left ${currentPage === 'about' ? 'text-[#A11E22]' : 'text-slate-400'}`}>About Us</button>
               <button onClick={() => handleNav('catalog')} className={`text-left ${currentPage === 'catalog' ? 'text-[#A11E22]' : 'text-slate-400'}`}>Collection</button>
               <button onClick={() => { scrollToForm(); setIsOpen(false); }} className="w-full bg-[#A11E22] text-white py-4 rounded text-[11px] font-black uppercase tracking-widest text-center">Get A Price</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SupplyChainRoad = () => {
  const steps = [
    { 
      icon: <Package size={20} />, 
      title: "Raw Materials", 
      desc: "Direct sourcing of premium quality raw materials" 
    },
    { 
      icon: <Factory size={20} />, 
      title: "Production", 
      desc: "High-volume industrial manufacturing and assembly." 
    },
    { 
      icon: <CheckCircle size={20} />, 
      title: "Quality Control", 
      desc: "Inspection and industrial-grade finishing." 
    },
    { 
      icon: <Ship size={20} />, 
      title: "Global Export", 
      desc: "Direct logistics from Karachi Port to your warehouse." 
    }
  ];

  return (
    <section className="py-32 bg-white px-8 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-[#A11E22] text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Operational Logistics</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">Supply Chain <span className="text-[#A11E22]">Engine.</span></h2>
        </div>

        <div className="relative py-10 md:py-20 flex flex-col md:block gap-24 md:gap-0">
          {/* THE ROAD & WATER PATH - HIDDEN ON MOBILE */}
          <div className="hidden md:flex absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 z-0 items-center">
            <div className="w-2/3 h-full bg-slate-200" />
            <div className="w-1/3 h-[12px] bg-blue-600/10 relative overflow-hidden rounded-full backdrop-blur-[2px] border-y border-blue-200">
               {/* WAVE LAYER 1 */}
               <motion.div 
                 animate={{ x: ["-100%", "0%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wave-cut.png')] opacity-20"
               />
               {/* WAVE LAYER 2 */}
               <motion.div 
                 animate={{ x: ["0%", "-100%"] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wave-cut.png')] opacity-10 scale-y-[-1]"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 z-10" />
            </div>
          </div>
          
          {/* THE MOVING VEHICLE - HIDDEN ON MOBILE */}
          <motion.div 
            className="hidden md:block absolute top-1/2 z-20 -translate-y-1/2"
            animate={{ 
              left: ["0%", "0%", "33.3%", "33.3%", "66.6%", "66.6%", "100%", "100%"]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut",
              times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9]
            }}
          >
            <div className="relative -ml-4 flex items-center justify-center">
              {/* TRUCK ICON (0% TO 66.6%) */}
              <motion.div
                animate={{ 
                  opacity: [1, 1, 1, 1, 1, 1, 0, 0],
                  scale: [1, 1, 1, 1, 1, 1, 0, 0]
                }}
                transition={{ 
                  opacity: { times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9], duration: 20, repeat: Infinity },
                  scale: { times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9], duration: 20, repeat: Infinity }
                }}
              >
                <Truck size={24} className="text-[#A11E22] fill-white" />
              </motion.div>

              {/* SHIP ICON (66.6% TO 100%) */}
              <motion.div
                className="absolute flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0, 0, 0, 0, 1, 1, 1],
                  scale: [0, 0, 0, 0, 0, 1, 1, 1],
                  y: [0, -2, 0, 2, 0], // Nautical Bobbing
                  rotate: [0, -2, 0, 2, 0] // Wave rocking
                }}
                transition={{ 
                  opacity: { times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9], duration: 20, repeat: Infinity },
                  scale: { times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9], duration: 20, repeat: Infinity },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="relative">
                  <Ship size={26} className="text-[#A11E22] fill-[#A11E22]/10" />
                  {/* SHIP WAKE */}
                  <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -left-2 top-1/2 w-4 h-1 bg-white/60 blur-[1px] rounded-full"
                  />
                </div>
              </motion.div>
              
              <div className="absolute -bottom-2 left-1.5 w-5 h-2 bg-[#A11E22]/10 blur-sm rounded-full" />
            </div>
          </motion.div>

          {/* CHECKPOINTS */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                <motion.div 
                   animate={{ 
                     backgroundColor: ["#ffffff", "#A11E22", "#ffffff"],
                     borderColor: ["#e2e8f0", "#A11E22", "#e2e8f0"],
                     scale: [1, 1.2, 1]
                   }}
                   transition={{ 
                     duration: 3, 
                     delay: idx === 0 ? 0 : idx * 5,
                     repeat: Infinity,
                     repeatDelay: 17
                   }}
                   className="w-14 h-14 rounded-full border-2 bg-white flex items-center justify-center relative shadow-sm z-30"
                >
                   <motion.div
                     animate={{ color: ["#94a3b8", "#ffffff", "#94a3b8"] }}
                     transition={{ duration: 3, delay: idx === 0 ? 0 : idx * 5, repeat: Infinity, repeatDelay: 17 }}
                   >
                     {step.icon}
                   </motion.div>
                </motion.div>

                <div className="md:absolute md:top-20 w-full md:w-48 text-center md:pt-4 mt-6 md:mt-0">
                   <motion.div
                     initial={{ opacity: 0.5 }}
                     animate={{ opacity: [0.5, 1, 0.5] }}
                     transition={{ duration: 3, delay: idx === 0 ? 0 : idx * 5, repeat: Infinity, repeatDelay: 17 }}
                   >
                     <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-3 italic">
                       {step.title}
                     </p>
                     <p className="text-[11px] text-slate-700 font-bold uppercase tracking-widest leading-relaxed max-w-[200px] mx-auto">
                       {step.desc}
                     </p>
                   </motion.div>
                </div>
                
                {/* Connector for mobile */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-slate-200 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTS ---

const CertificationCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const certs = [
    { name: "apbuma", label: "APBUMA" },
    { name: "fcci", label: "FCCI" },
    { name: "iso_9001", label: "ISO 9001:2015" },
    { name: "iso_45001", label: "ISO 45001:2018" },
    { name: "ministry_of_commerce", label: "Ministry of Commerce" },
    { name: "oeko_tex", label: "OEKO-TEX Standard 100" },
    { name: "ptea", label: "PTEA" }
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % certs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, certs.length]);

  return (
    <div 
      className="bg-white py-20 overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50">
              <Globe size={18} className="text-[#A11E22] animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 leading-none">Industrial Compliance</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Manufacturing Standards</p>
            </div>
          </div>
          <div className="flex gap-2">
            {certs.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-[#A11E22]' : 'w-2 bg-slate-100'}`}
              />
            ))}
          </div>
        </div>

        <motion.div 
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -((certs.length - 1) * 300) }}
          animate={{ x: -(index * 300) }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
          onDragStart={() => setIsHovered(true)}
        >
          <div className="flex gap-16 md:gap-24 items-center pl-[10%] pr-[50%]">
            {certs.map((cert, idx) => (
              <motion.div 
                key={cert.name} 
                className="flex-shrink-0 flex flex-col items-center select-none"
                animate={{ 
                  scale: index === idx ? 1.2 : 0.9,
                  opacity: index === idx ? 1 : 0.4
                }}
              >
                <div className="h-20 md:h-28 w-40 md:w-56 flex items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500">
                  <OptimizedImage 
                    src={`/website_pictures/${cert.name}.png`} 
                    className="h-full w-auto object-contain" 
                    alt={cert.label} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${cert.name}/400/300`;
                    }}
                  />
                </div>
                <p className={`text-[9px] font-black text-slate-900 uppercase mt-6 tracking-[0.4em] transition-all duration-500 italic ${index === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  {cert.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none transition-opacity">
           <button 
             onClick={() => setIndex((prev) => (prev - 1 + certs.length) % certs.length)}
             className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-2xl border border-slate-100 flex items-center justify-center text-slate-900 hover:text-[#A11E22] pointer-events-auto transition-all hover:scale-110 active:scale-95"
           >
             <ChevronLeft size={24} />
           </button>
           <button 
             onClick={() => setIndex((prev) => (prev + 1) % certs.length)}
             className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-2xl border border-slate-100 flex items-center justify-center text-slate-900 hover:text-[#A11E22] pointer-events-auto transition-all hover:scale-110 active:scale-95"
           >
             <ChevronRight size={24} />
           </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-50">
        <motion.div 
          className="h-full bg-[#A11E22]"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "0%" : "100%" }}
          key={index}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLElement>(null);
  
  const scrollToForm = () => { 
    if (page !== 'home') { 
      setPage('home'); 
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); 
    } else {
      formRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mjgjeqlj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("There was an issue with the submission. Please try again.");
      }
    } catch (error) {
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans text-slate-900 antialiased selection:bg-[#A11E22] selection:text-white overflow-x-hidden">
      <Navbar setPage={setPage} currentPage={page} scrollToForm={scrollToForm} />
      
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div 
            key="home" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO */}
            <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-8 text-center bg-white border-b border-slate-100 overflow-hidden">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center text-slate-900">
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-[0.95] mb-6 md:mb-8 relative inline-block">
                    Manufacturing <br/> 
                    <span className="text-[#A11E22] not-italic underline decoration-slate-200 underline-offset-8">Since 1996.</span>
                  </h1>
                  <p className="text-sm md:text-base text-slate-700 max-w-lg italic font-black uppercase tracking-wider leading-relaxed mb-8 md:mb-10">
                    500+ industrial equipments dedicated to seamless and effective order fulfillment.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setPage('catalog')} className="bg-[#A11E22] text-white px-8 md:px-10 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-lg active:scale-95 w-full sm:w-auto">See Our Items</button>
                    <button onClick={scrollToForm} className="bg-white border border-slate-200 px-8 md:px-10 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all active:scale-95 w-full sm:w-auto">Contact Team</button>
                  </div>
                </div>
                  <div className="relative group mt-12 lg:mt-0">
                    <div className="w-full h-[350px] md:h-[500px] overflow-hidden rounded shadow-2xl border border-slate-100 bg-slate-100">
                      <OptimizedImage 
                        src="/website_pictures/factory_floor.png" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
                        alt="Factory Floor" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://picsum.photos/seed/industrial-factory/1000/800?grayscale";
                        }}
                      />
                    </div>
                  <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white p-6 md:p-8 border border-slate-100 shadow-xl text-left">
                    <p className="text-3xl md:text-4xl font-black text-[#A11E22] italic leading-none">99.8%</p>
                    <p className="text-[7px] md:text-[8px] font-black uppercase text-slate-400 tracking-widest mt-2 leading-none">Quality Precision Rate</p>
                  </div>
                </div>
              </div>
            </section>

            {/* MISSION & VISION */}
            <section className="py-20 md:py-24 px-6 md:px-8 border-b border-slate-100 text-slate-900 bg-white">
               <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
                  <div className="p-8 md:p-10 bg-slate-50 border border-slate-200 rounded">
                    <h3 className="text-[#A11E22] text-[10px] font-black uppercase tracking-[0.4em] mb-6 italic">Our Mission</h3>
                    <p className="text-[13px] md:text-sm text-slate-700 italic uppercase tracking-wider leading-relaxed font-black">We manufacture verified quality textiles for global B2B buyers and ship on time, every time. No shortcuts on construction, no gaps in our process.</p>
                  </div>
                  <div className="p-8 md:p-10 bg-slate-50 border border-slate-200 rounded">
                    <h3 className="text-[#A11E22] text-[10px] font-black uppercase tracking-[0.4em] mb-6 italic">Our Vision</h3>
                    <p className="text-[13px] md:text-sm text-slate-700 italic uppercase tracking-wider leading-relaxed font-black">To become Pakistan's most trusted industrial textile hub. The factory serious buyers find first and stay with the longest.</p>
                  </div>
               </div>
            </section>

            {/* DOUBTS */}
            <section className="py-24 bg-slate-50 text-center px-8 border-b border-slate-100 text-slate-900">
              <div className="max-w-3xl mx-auto mb-16">
                 <div className="flex justify-center items-center gap-3 mb-6">
                   <AlertTriangle size={16} className="text-[#A11E22]"/><span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">The Market Truth</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-6">Stopping Your <span className="text-[#A11E22]">Order Doubts.</span></h2>
                 <p className="text-sm text-slate-800 italic uppercase tracking-widest font-black leading-relaxed">Buyers are tired of quality drops and shipping delays. We replace promises with consistent factory performance.</p>
              </div>
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-white p-10 border border-slate-200 rounded shadow-sm">
                  <h4 className="text-xs font-black uppercase text-[#A11E22] tracking-widest mb-4">Sample Match Guarantee</h4>
                  <p className="text-[11px] text-slate-800 uppercase leading-loose italic tracking-widest font-black">The first shipment is often good but later ones fail. Our floor management makes sure the bulk order matches the sample every time.</p>
                </div>
                <div className="bg-white p-10 border border-slate-200 rounded shadow-sm">
                  <h4 className="text-xs font-black uppercase text-[#A11E22] tracking-widest mb-4">Reliable Fulfillment Standards</h4>
                  <p className="text-[11px] text-slate-800 uppercase leading-loose italic tracking-widest font-black">We use streamlined workflows to keep every order on schedule. Our systematic efficiency prevents delays and ensures a consistent delivery timeline for our global partners.</p>
                </div>
              </div>
            </section>

            <SupplyChainRoad />

            {/* MANUFACTURING QUALITY */}
            <section className="py-32 px-8 bg-white border-b border-slate-100 text-slate-900 relative overflow-hidden">
               <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <OptimizedImage 
                      src="/website_pictures/cotton.png" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt="Raw Cotton Quality" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://picsum.photos/seed/raw-cotton/1200/800?grayscale";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <div>
                        <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-2 font-mono">Status: Active Production</p>
                        <h4 className="text-white text-2xl font-black uppercase italic tracking-tighter leading-none">Bulk Quality <br/> Without Compromise.</h4>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                     <h3 className="text-[9px] font-black text-[#A11E22] uppercase tracking-[0.4em] mb-4 italic flex items-center gap-3">
                        <Globe size={14}/> Operational Excellence
                     </h3>
                     <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">Uncompromising <br/> <span className="text-[#A11E22]">Build Standards.</span></h2>
                     <p className="text-base text-slate-800 italic uppercase tracking-wider font-black leading-relaxed mb-8">We deliver textile excellence through rigorous quality control and modern manufacturing processes. Our commitment to precision ensures that every product meets the highest international standards, from initial weave to final packaging.</p>
                     <div className="grid grid-cols-2 gap-8 py-8 border-t border-slate-100">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 italic">QC Assurance</p>
                          <p className="text-[10px] text-slate-700 font-black uppercase tracking-wider leading-relaxed">Multi-stage inspection protocols ensuring zero-defect delivery across all runs.</p>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 italic">Modern Equipment</p>
                          <p className="text-[10px] text-slate-700 font-black uppercase tracking-wider leading-relaxed">Continuous investment in cutting-edge machinery for superior finish and durability.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <GlobalMap />

            {/* SUPPLY CHAIN INFOGRAPHIC */}
            <section className="py-24 bg-white px-8 border-b border-slate-100">
              <div className="max-w-5xl mx-auto text-center">
                 <div className="mb-12">
                   <p className="text-[#A11E22] text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Industrial Workflow</p>
                   <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">Supply Chain <span className="text-[#A11E22]">Integration.</span></h2>
                 </div>
                 <div className="w-full relative group overflow-hidden rounded-xl shadow-2xl border border-slate-100 bg-slate-50">
                    <OptimizedImage 
                      src="/website_pictures/12_steps_supply_chain.png" 
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]" 
                      alt="12 Steps Supply Chain" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://picsum.photos/seed/workflow/1600/900?grayscale";
                      }}
                    />
                 </div>
              </div>
            </section>

            {/* CERTIFICATIONS SECTION */}
            <div className="w-full bg-[#00843D] py-1 my-16">
               <CertificationCarousel />
            </div>

            {/* FORM */}
            <section ref={formRef} className="py-20 md:py-24 bg-[#1A1A1A] text-white px-6 md:px-8">
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
                  <div className="text-left py-6 lg:pt-10">
                     <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-6">Ready for the <br/><span className="text-[#A11E22]">Next Step?</span></h2>
                     <p className="text-slate-500 text-sm italic uppercase tracking-widest mb-10 md:mb-12">Access our industrial supply chain and integration protocols for your brand's next inventory scale up.</p>
                     <div className="space-y-6">
                        <div className="border-l-2 border-[#A11E22] pl-6"><p className="text-[8px] font-black uppercase text-[#A11E22] tracking-widest mb-1">Direct Help</p><a href="mailto:info@manzatextilemills.com" className="text-xs font-bold text-slate-300 hover:text-[#A11E22] transition-colors tracking-tight">info@manzatextilemills.com</a></div>
                        <div className="border-l-2 border-slate-800 pl-6"><p className="text-[8px] font-black uppercase text-slate-600 tracking-widest mb-1">Global Hub</p><a href="https://maps.google.com/?q=67-Sadhar, 15KM Jhang Road, Faisalabad" target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-300 hover:text-[#A11E22] transition-colors">67-Sadhar, 15KM Jhang Road, Faisalabad</a></div>
                     </div>
                  </div>
                  <div className="bg-white p-8 md:p-12 rounded shadow-2xl text-slate-900">
                    {isSuccess ? (
                      <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-[#A11E22]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                           <CheckCircle size={32} className="text-[#A11E22]" />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Request Received.</h3>
                        <p className="text-sm text-slate-500 uppercase tracking-widest leading-relaxed">Our factory team will contact you within 24 hours.</p>
                      </div>
                    ) : (
                      <form className="grid gap-4 md:gap-6" onSubmit={handleSubmit}>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="full_name" required placeholder="YOUR NAME" className="bg-slate-50 p-4 rounded text-[9px] uppercase font-black tracking-widest border-b-2 border-transparent focus:border-[#A11E22] outline-none transition-colors" />
                            <input name="company" required placeholder="COMPANY" className="bg-slate-50 p-4 rounded text-[9px] uppercase font-black tracking-widest border-b-2 border-transparent focus:border-[#A11E22] outline-none transition-colors" />
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <input type="email" name="email" required placeholder="WORK EMAIL" className="bg-slate-50 p-4 rounded text-[9px] uppercase font-black tracking-widest border-b-2 border-transparent focus:border-[#A11E22] outline-none transition-colors" />
                           <input type="tel" name="phone" required placeholder="PHONE NUMBER" className="bg-slate-50 p-4 rounded text-[9px] uppercase font-black tracking-widest border-b-2 border-transparent focus:border-[#A11E22] outline-none transition-colors" />
                         </div>
                         <textarea name="order_specs" required rows={3} placeholder="ORDER SPECS" className="bg-slate-50 p-4 rounded text-[9px] uppercase font-black tracking-widest border-b-2 border-transparent focus:border-[#A11E22] outline-none transition-colors resize-none" />
                         <button 
                           type="submit" 
                           disabled={isSubmitting}
                           className="bg-[#A11E22] text-white p-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                         >
                            {isSubmitting ? 'Sending...' : 'Get A Price'}
                         </button>
                      </form>
                    )}
                  </div>
               </div>
            </section>
          </motion.div>
        )}

        {page === 'about' && (
          <motion.div 
            key="about" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="pt-40 pb-20 px-8 text-slate-900"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8 md:mb-12 text-slate-900">Building a <br/><span className="text-[#A11E22]">Sustainable Canvas.</span></h1>
              
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24 items-start">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl font-bold uppercase italic tracking-tight text-slate-900 leading-tight">Manza Textile Mills (MTM) is an ultimate textile brand well-established since a decade.</p>
                  <p className="text-sm text-slate-500 uppercase font-medium italic tracking-wider leading-relaxed">With over a decade of experience in delivering premium, innovative, and sustainable fabric solutions, we are renowned for our modern and stylish interpretations. We believe fabric is more than just stitched material—it's a statement of comfort, craftsmanship, and creativity.</p>
                </div>
                <div className="space-y-6">
                   <p className="text-sm text-slate-500 uppercase font-medium italic tracking-wider leading-relaxed">Our collections reflect our passion for textile artistry and dedication to offering both timeless and contemporary designs. We operate as a leading manufacturer, importer, and exporter of a wide variety of home linen and textile products to global markets.</p>
                   <div className="pt-6 border-t border-slate-100 flex gap-8">
                      <div><p className="text-2xl font-black text-[#A11E22] italic leading-none">25+</p><p className="text-[8px] font-black uppercase text-slate-400 mt-1">Years of Craft</p></div>
                      <div><p className="text-2xl font-black text-[#A11E22] italic leading-none">21+</p><p className="text-[8px] font-black uppercase text-slate-400 mt-1">Global Markets</p></div>
                   </div>
                </div>
              </div>

              {/* STRATEGIC ADVANTAGE SECTION */}
              <div className="mb-16 md:mb-24">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end mb-12">
                   <div className="flex-1">
                      <p className="text-[#A11E22] text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Strategic Market Data</p>
                      <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-slate-900">Reach across <br/> the Globe.</h2>
                   </div>
                   <div className="flex-1 pb-2">
                      <p className="text-sm text-slate-500 uppercase font-medium italic tracking-wider leading-relaxed">Our active supply chain reaches major international markets, ensuring we meet the highest global standards for high-density weaves and industrial fulfillment.</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 grid-bg">
                   <div className="p-8 md:p-10 bg-[#1A1A1A] text-white">
                      <p className="text-5xl md:text-6xl font-black italic tracking-tighter mb-2 text-[#A11E22]">25+</p>
                      <h5 className="text-[10px] font-black uppercase tracking-widest mb-4">Years of Export Authority</h5>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-relaxed">Since 1996, the majority of our production has been dedicated to the international market. We utilize decades of industrial expertise to manage seamless supply chains for our global partners.</p>
                   </div>
                   <div className="p-8 md:p-10 bg-slate-900 text-white">
                      <p className="text-5xl md:text-6xl font-black italic tracking-tighter mb-2 text-[#A11E22]">2M+</p>
                      <h5 className="text-[10px] font-black uppercase tracking-widest mb-4">Industrial Annual Capacity</h5>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-relaxed">Our 500+ equipments maintain a consistent yearly output of over 2 millions textile units.</p>
                   </div>
                   <div className="p-8 md:p-10 bg-[#A11E22] text-white">
                      <p className="text-5xl md:text-6xl font-black italic tracking-tighter mb-2 text-white/20">21+</p>
                      <h5 className="text-[10px] font-black uppercase tracking-widest mb-4">Direct Carrier Markets</h5>
                      <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest leading-relaxed">Seamlessly reaching 21+ countries with optimized logistics from Faisalabad to the world's major ports.</p>
                   </div>
                </div>
              </div>

              {/* CORE VALUES GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                {[
                  { title: "Reliability", desc: "Shipping on time, every time." },
                  { title: "Experience", desc: "Expertise since 1996." },
                  { title: "Logistics", desc: "End to end control" },
                  { title: "Quality", desc: "Verified technical specs." }
                ].map((val, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded">
                    <h4 className="text-[10px] font-black uppercase text-[#A11E22] tracking-widest mb-2 italic">{val.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-snug">{val.desc}</p>
                  </div>
                ))}
              </div>
              
              <section className="py-24 border-t border-slate-200">
                <div className="text-left mb-16">
                   <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-2 text-slate-900">A Legacy Stitched <br/> Through Time.</h2>
                   
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-slate-900">
                   <div className="p-8 bg-white border border-slate-200 rounded flex flex-col justify-between h-80 group hover:border-[#A11E22] transition-colors shadow-sm">
                      <div><p className="text-6xl font-black text-slate-100 mb-6 tracking-tighter group-hover:text-[#A11E22]/10 transition-colors leading-none">1996</p><h4 className="text-xs font-black uppercase italic text-slate-900 mb-3 tracking-widest">The First Stitching Unit</h4><p className="text-[11px] text-slate-800 uppercase font-black italic tracking-wider leading-relaxed">Manza family started with a single stitching unit. We focused on material quality in the center of Faisalabad.</p></div>
                      <p className="text-[8px] font-black uppercase text-[#A11E22] tracking-widest flex items-center gap-2 italic"><History size={10}/> Origin Story</p>
                   </div>
                   <div className="p-8 bg-slate-50 border border-slate-100 rounded flex flex-col justify-between h-80 shadow-sm">
                      <div><p className="text-6xl font-black text-slate-200 mb-6 tracking-tighter leading-none">2005</p><h4 className="text-xs font-black uppercase italic text-slate-900 mb-3 tracking-widest">Global Expansion</h4><p className="text-[11px] text-slate-800 uppercase font-black italic tracking-wider leading-relaxed">Expanded capacity to 300 machines. First direct entry into high end European luxury bedding markets.</p></div>
                   </div>
                   <div className="p-8 bg-white border border-slate-200 rounded flex flex-col justify-between h-80 group hover:border-[#A11E22] transition-colors shadow-sm">
                      <div><p className="text-6xl font-black text-slate-100 mb-6 tracking-tighter group-hover:text-[#A11E22]/10 transition-colors leading-none">2018</p><h4 className="text-xs font-black uppercase italic text-slate-900 mb-3 tracking-widest">Vertical Integration</h4><p className="text-[11px] text-slate-800 uppercase font-black italic tracking-wider leading-relaxed">Optimized our supply chain by integrating advanced processing and finishing units to ensure 100% in-house quality control.</p></div>
                   </div>
                </div>
                <div className="relative w-full h-[450px] overflow-hidden rounded group shadow-2xl border border-slate-100 bg-black">
                   <OptimizedImage 
                    src="/website_pictures/factory_floor.png" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-all duration-1000" 
                    alt="Smart Mill" 
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                   <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white">
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#A11E22] mb-3">Present Day</p>
                      <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-4 text-white">The Smart Mill.</h3>
                      <p className="text-[13px] md:text-sm text-slate-200 max-w-lg italic uppercase tracking-wider font-bold">Today we leverage industrial precision to define the future of high-density textile orders for global markets.</p>
                    </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {page === 'catalog' && (
          <motion.div 
            key="catalog" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pt-40 pb-20 px-8 text-slate-900"
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2 text-slate-900">Product Catalog.</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-16 italic">High volume B2B export portfolio since 1996.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {FULL_CATALOG.map((p, i) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-slate-100 shadow-sm hover:border-[#A11E22] transition-all group overflow-hidden flex flex-col h-full rounded-sm"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                       <OptimizedImage 
                         src={p.img} 
                         alt={p.name} 
                         className="w-full h-full object-cover transition-all duration-500" 
                         referrerPolicy="no-referrer" 
                       />
                       <span className="absolute top-4 left-4 text-[7px] font-black bg-white/90 backdrop-blur px-2 py-1 text-[#A11E22] uppercase tracking-[0.2em]">{p.cat}</span>
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 mb-6 group-hover:text-[#A11E22] transition-colors grow">{p.name}</h4>
                      <button className="text-[9px] font-black uppercase text-[#A11E22] border-b border-[#A11E22] self-start pb-0.5 hover:text-black hover:border-black transition-all focus:outline-none">Order Info</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 bg-white border-t border-slate-100 px-8 text-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
           <div>
              <button 
                onClick={() => setPage('home')} 
                className="flex items-center gap-3 mb-6 leading-none focus:outline-none hover:opacity-80 transition-opacity group"
              >
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/website_pictures/logo.png" 
                    alt="Manza Logo" 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-8 h-8 bg-[#A11E22] flex items-center justify-center font-black text-white shadow-sm italic text-xs">M</div>';
                    }}
                  />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">Manza Textile Mills</span>
              </button>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest max-w-xs leading-loose italic">Pakistan's premier B2B manufacturing hub. Serving Globally since 1996.</p>
           </div>
           <div>
              <h6 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em] mb-6 italic border-b border-slate-100 pb-2 inline-block">Direct Help</h6>
              <div className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed">
                <a href="tel:+92412518216" className="flex items-center gap-2 leading-none hover:text-[#A11E22] transition-colors focus:outline-none tracking-tight"><Phone size={12} className="text-[#A11E22]"/> +92 41 2518216</a>
                <a href="https://wa.me/923151118876" target="_blank" rel="noreferrer" className="flex items-center gap-2 leading-none hover:text-[#A11E22] transition-colors focus:outline-none"><Phone size={12} className="text-[#A11E22]"/> +92 315 1118876</a>
                <a href="mailto:info@manzatextilemills.com" className="flex items-center gap-2 leading-none hover:text-[#A11E22] transition-colors focus:outline-none"><Mail size={12} className="text-[#A11E22]"/> info@manzatextilemills.com</a>
                <a href="mailto:manzadocs@gmail.com" className="flex items-center gap-2 leading-none hover:text-[#A11E22] transition-colors focus:outline-none"><Mail size={12} className="text-[#A11E22]"/> manzadocs@gmail.com</a>
              </div>
           </div>
           <div>
              <h6 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em] mb-6 italic border-b border-slate-100 pb-2 inline-block">Office</h6>
              <div className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest italic leading-snug">
                  <p><span className="text-[#A11E22] block mb-0.5 uppercase">Faisalabad:</span> 67-Sadhar, 15KM Jhang Road</p>
              </div>
           </div>
           <div className="md:text-right flex flex-col md:items-end">
              <div className="flex gap-4 mb-6">
                <a href="https://www.linkedin.com/company/manza-textile-mills/" target="_blank" rel="noreferrer" className="focus:outline-none hover:scale-110 transition-transform">
                  <Linkedin size={18} className="text-slate-300 hover:text-[#A11E22] transition-colors" />
                </a>
                <a href="https://www.instagram.com/manzatm82" target="_blank" rel="noreferrer" className="focus:outline-none hover:scale-110 transition-transform">
                  <Instagram size={18} className="text-slate-300 hover:text-[#A11E22] transition-colors" />
                </a>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-300 leading-none">© 2026 MANZA TEXTILE MILLS</p>
              <p className="text-[8px] font-bold uppercase tracking-widest mt-2 text-slate-300 leading-none">Industrial Design Engineered for Permanence</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
