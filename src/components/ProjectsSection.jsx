import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from './SmartImage';

const projects = [
  {
    id: 1,
    title: 'Drive Pulse',
    subtitle: 'DRIVER INTELLIGENCE · FULL-STACK + ML',
    preview: 'A driving-safety platform that scores driver trips with zero extra hardware — just a smartphone.',
    details: 'A production-pilot driving safety platform — smart, safe, and inexpensive — built over a year to tackle Ethiopia\u2019s road accident crisis. Turns a standard smartphone into a professional telematics tool using GPS and IMU sensors. Detects risky driving events in real-time, produces an AI-blended safety score with actionable feedback. Features adaptive rules+ML scoring (1.0 F1 score), WebSocket live alerts, offline-first pipeline, multilingual support (English, Amharic, Afaan Oromoo), and a dual-role app (driver + fleet admin). 50+ real pilot trips captured on Render with Supabase PostgreSQL.',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'React Native', 'Expo', 'scikit-learn', 'WebSocket', 'Supabase', 'Render'],
    image: '/drivepulse.png',
    liveUrl: 'https://driverpulse.onrender.com/',
    codeUrl: 'https://github.com/Kidus-Sofonias/SD-backend-and-model',
  },
  {
    id: 2,
    title: 'Kabba Designs',
    subtitle: 'FULL-STACK E-COMMERCE · CLIENT PROJECT',
    preview: 'A premium e-commerce platform for an Ethiopian fashion brand with a dark, luxury UI.',
    details: 'Full-stack architecture with React (Vite) + Express.js + PostgreSQL (Neon) + Vercel Blob Storage + Chapa Payment Gateway. Features product catalog, shopping cart, order tracking with a visual progress bar, delivery proof, admin dashboard, events management, and a premium African luxury aesthetic with glass-morphism effects.',
    tags: ['React', 'Vite', 'Express', 'PostgreSQL', 'Chapa', 'Vercel', 'Render'],
    image: '/kabba.png',
    liveUrl: 'https://kabba-designs.vercel.app/',
    codeUrl: 'https://github.com/Kidus-Sofonias/Kabba-Designs',
  },
  {
    id: 3,
    title: 'Isomer Explorer',
    subtitle: 'CHEMISTRY · CLIENT-SIDE GRAPH THEORY',
    preview: 'Type any hydrocarbon formula and it instantly enumerates, names, and draws every isomer.',
    details: 'A fully client-side web app that enumerates, names, and draws every constitutional isomer of any hydrocarbon formula. Instead of a database, uses a graph-theory algorithm in pure vanilla JavaScript that treats each molecule as a tree, enumerates every rooted and free tree form, and deduplicates identical structures through canonical labeling. Scales to over a million distinct structures across alkanes, alkenes, alkynes, cycloalkanes, aromatics, haloalkanes, and alcohols — computed on the fly in the browser. Renders as atom-label, zigzag bond-line, aromatic-ring, or interactive Three.js 3D structures. Installable offline PWA with local history.',
    tags: ['Vanilla JavaScript', 'Three.js', 'PWA', 'Graph Theory', 'IUPAC Naming'],
    image: '/isomer-explorer.png',
    liveUrl: 'http://isomer-explorer.netlify.app/',
    codeUrl: 'https://github.com/Kidus-Sofonias/Isomer-Explorer',
  },
  {
    id: 4,
    title: 'GebeyaZeKidus',
    subtitle: 'FULL-STACK E-COMMERCE · PERSONAL PROJECT',
    preview: 'A complete e-commerce platform with product browsing, cart, and secure checkout.',
    details: 'Full stack end-to-end implementation: React storefront, Express API, Firebase for data and auth, and payment integration with order handling. Complete shopping experience with persistent cart and checkout flow.',
    tags: ['React', 'Node.js', 'Express', 'Firebase', 'Stripe'],
    image: '/gebeyazekidus.png',
    liveUrl: 'https://gebeyazekidus.netlify.app/',
    codeUrl: 'https://github.com/Kidus-Sofonias/GebeyaZeKidus-Final',
  },
  {
    id: 5,
    title: 'KiChat',
    subtitle: 'REAL-TIME CHAT · FULL-STACK',
    preview: 'A production-style messaging app with instant messaging, typing indicators, and presence.',
    details: 'Built with React + Vite frontend and Express + Socket.IO backend on PostgreSQL. Features voice notes, file sharing, link previews, emoji reactions, message replies/edits/deletes, push notifications, dark/light theme, and multilingual support (English, Swahili, French). Includes built-in icebreaker trivia with daily question limits and streaks.',
    tags: ['React', 'Vite', 'Express', 'Socket.IO', 'PostgreSQL', 'Supabase', 'JWT'],
    image: '/kichat.png',
    liveUrl: 'https://github.com/Kidus-Sofonias',
    codeUrl: 'https://github.com/Kidus-Sofonias',
  },
  {
    id: 6,
    title: 'Netflix Clone',
    subtitle: 'FRONTEND PROJECT',
    preview: 'A pixel-perfect Netflix clone with movie browsing and streaming features.',
    details: 'Implemented responsive layouts, movie carousels, search functionality, and video player integration. Features a polished UI that mirrors the Netflix experience.',
    tags: ['React', 'TMDB API', 'CSS'],
    image: '/netflix-clone.png',
    liveUrl: 'https://kidus-sofonias.github.io/Netflix-Clone/',
    codeUrl: 'https://github.com/Kidus-Sofonias/Netflix-Clone',
  },
];

/* ───────── Full-detail modal ───────── */
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="relative w-full md:max-w-2xl bg-navy-900 rounded-t-2xl md:rounded-2xl overflow-y-auto shadow-2xl max-h-[92vh] md:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-white" />
            </button>

            <div className="relative">
              <SmartImage
                src={project.image}
                alt={project.title}
                eager
                className="h-56 md:h-72"
                imgClassName="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-gold-400 font-mono text-xs tracking-widest mb-2">{project.subtitle}</p>
                <h3 className="font-serif text-3xl md:text-4xl">{project.title}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8 pt-4">
              <p className="text-gray-300 leading-relaxed mb-6">{project.details}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono text-gray-300 bg-navy-800 rounded-full border border-navy-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-navy-600 rounded-full text-sm hover:border-gold-400 hover:text-gold-400 transition-colors"
                >
                  <Code size={16} />
                  CODE
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 rounded-full text-sm font-medium hover:bg-gold-400 transition-colors"
                >
                  <Play size={16} />
                  LIVE DEMO
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────── Projects section ───────── */
const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);

  const scrollTo = useCallback((index) => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return;
    const target = Math.max(0, Math.min(index, el.children.length - 1));
    const card = el.children[target];
    el.scrollTo({
      left: card.offsetLeft - (el.offsetWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
    setActiveIndex(target);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return;
    const idx = Math.round(
      el.scrollLeft / (el.children[0].offsetWidth + 24)
    );
    setActiveIndex(Math.max(0, Math.min(idx, el.children.length - 1)));
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">
              03 — SELECTED WORK
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Featured Projects</h2>
          </div>
          <p className="text-gray-500 font-mono text-xs mt-4 md:mt-0">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · TAP A CARD
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-6 pb-4"
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="snap-center shrink-0 w-[86%] sm:w-[380px] lg:w-[400px] text-left group focus:outline-none"
                aria-label={`View ${project.title}`}
              >
                <div className="relative rounded-2xl overflow-hidden bg-navy-800 border border-navy-600/50 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/30">
                  <div className="relative h-48 overflow-hidden">
                    <SmartImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full"
                      imgClassName="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
                    <span className="absolute top-4 left-4 text-gold-400 font-mono text-xs px-3 py-1 bg-black/60 rounded-full backdrop-blur">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-gold-400/80 font-mono text-[11px] tracking-wider mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="font-serif text-2xl mb-2 group-hover:text-gold-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {project.preview}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[11px] font-mono text-gray-300 bg-navy-900/70 rounded-full border border-navy-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-0.5 text-[11px] font-mono text-gray-500 rounded-full border border-navy-600">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest mt-5 group-hover:gap-3 transition-all">
                      VIEW FULL CASE STUDY
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Arrows (desktop) */}
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            aria-label="Previous project"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy-800/90 backdrop-blur border border-navy-600/60 hover:border-gold-500/40 hover:bg-navy-700 items-center justify-center transition-colors z-10 shadow-lg shadow-black/40"
          >
            <ChevronLeft size={20} className="text-gray-300" />
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            aria-label="Next project"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy-800/90 backdrop-blur border border-navy-600/60 hover:border-gold-500/40 hover:bg-navy-700 items-center justify-center transition-colors z-10 shadow-lg shadow-black/40"
          >
            <ChevronRight size={20} className="text-gray-300" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-gold-400' : 'w-2 bg-navy-600 hover:bg-navy-500'
              }`}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default ProjectsSection;
