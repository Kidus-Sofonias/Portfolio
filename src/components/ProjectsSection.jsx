import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Play } from 'lucide-react';

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Drive Pulse',
      subtitle: 'DRIVER INTELLIGENCE · FULL-STACK + ML · 1 YEAR BUILD',
      description: 'A production-pilot driving safety platform — smart, safe, and inexpensive solution to Ethiopias road accident crisis.',
      details: 'Took a year to build. The goal: improve road safety in Ethiopia by monitoring and scoring driver trips with zero additional hardware. Turns a standard smartphone into a professional telematics tool using GPS and IMU sensors. Detects risky driving events in real-time, produces an AI-blended safety score with actionable feedback. Features adaptive rules+ML scoring (1.0 F1 score), WebSocket live alerts, offline-first pipeline, multilingual support (English, Amharic, Afaan Oromoo), and dual-role app (driver + fleet admin). 50+ real pilot trips captured on Render with Supabase PostgreSQL.',
      tags: ['FastAPI', 'Python', 'PostgreSQL', 'React Native', 'Expo', 'scikit-learn', 'WebSocket', 'Supabase', 'Render'],
      image: '/drivepulse.png',
      liveUrl: 'https://driverpulse.onrender.com/',
      codeUrl: 'https://github.com/Kidus-Sofonias/SD-backend-and-model',
    },
    {
      id: 2,
      title: 'Kabba Designs',
      subtitle: 'FULL-STACK E-COMMERCE · CLIENT PROJECT',
      description: 'A premium e-commerce platform for an Ethiopian fashion brand with dark-themed luxury UI.',
      details: 'Full-stack architecture with React (Vite) + Express.js + PostgreSQL (Neon) + Vercel Blob Storage + Chapa Payment Gateway. Features product catalog, shopping cart, order tracking with visual progress bar, delivery proof, admin dashboard, events management, and premium African luxury aesthetic with glass-morphism effects.',
      tags: ['React', 'Vite', 'Express', 'PostgreSQL', 'Chapa', 'Vercel', 'Render'],
      image: '/kabba.png',
      liveUrl: 'https://kabba-designs.vercel.app/',
      codeUrl: 'https://github.com/Kidus-Sofonias/Kabba-Designs',
    },
    {
      id: 3,
      title: 'Isomer Explorer',
      subtitle: 'CHEMISTRY · CLIENT-SIDE GRAPH THEORY',
      description: 'A fully client-side web app that enumerates, names, and draws every constitutional isomer of any hydrocarbon formula.',
      details: 'Instead of a database, uses a graph-theory algorithm in pure vanilla JavaScript that treats each molecule as a tree, enumerates every rooted and free tree form, and deduplicates identical structures through canonical labeling. Scales to over a million distinct hydrocarbon structures across alkanes, alkenes, alkynes, cycloalkanes, aromatics, haloalkanes, and alcohols — computed on the fly in the browser. Renders as atom-label, zigzag bond-line, aromatic-ring, or interactive Three.js 3D structures. Installable offline PWA with local history.',
      tags: ['Vanilla JavaScript', 'Three.js', 'PWA', 'Graph Theory', 'IUPAC Naming'],
      image: '/isomer-explorer.png',
      liveUrl: 'http://isomer-explorer.netlify.app/',
      codeUrl: 'https://github.com/Kidus-Sofonias/Isomer-Explorer',
    },
    {
      id: 4,
      title: 'GebeyaZeKidus',
      subtitle: 'FULL-STACK E-COMMERCE · PERSONAL PROJECT',
      description: 'A complete e-commerce platform with product browsing, cart, and secure checkout.',
      details: 'Full stack end-to-end implementation: React storefront, Express API, Firebase for data and auth, and payment integration with order handling. Complete shopping experience with persistent cart and checkout flow.',
      tags: ['React', 'Node.js', 'Express', 'Firebase', 'Stripe'],
      image: '/gebeyazekidus.png',
      liveUrl: 'https://gebeyazekidus.netlify.app/',
      codeUrl: 'https://github.com/Kidus-Sofonias/GebeyaZeKidus-Final',
    },
    {
      id: 5,
      title: 'KiChat',
      subtitle: 'REAL-TIME CHAT APPLICATION · FULL-STACK',
      description: 'A production-style messaging platform with instant messaging, typing indicators, and live presence.',
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
      description: 'A pixel-perfect Netflix clone with movie browsing and streaming features.',
      details: 'Implemented responsive layouts, movie carousels, search functionality, and video player integration. Features a polished UI that mirrors the Netflix experience.',
      tags: ['React', 'TMDB API', 'CSS'],
      image: '/kidus.png',
      liveUrl: 'https://kidus-sofonias.github.io/Netflix-Clone/',
      codeUrl: 'https://github.com/Kidus-Sofonias/Netflix-Clone',
    },
  ];

  return (
    <section id="projects" className="section-padding bg-navy-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">
              03 — SELECTED WORK
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-12">Featured Projects</h2>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveProject(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeProject === index
                      ? 'bg-navy-700 border-l-2 border-gold-400'
                      : 'hover:bg-navy-800 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gold-400 font-mono text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-serif text-2xl transition-colors ${
                        activeProject === index ? 'text-white' : 'text-gray-400'
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-gold-400/70 font-mono text-xs tracking-wider mt-1">
                        {project.subtitle}
                      </p>
                    </div>
                    <ExternalLink className={`w-5 h-5 transition-colors ${
                      activeProject === index ? 'text-gold-400' : 'text-gray-600'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-navy-900/80 rounded-full">
                    <span className="text-gold-400 font-mono text-xs">
                      LIVE · {projects[activeProject].liveUrl}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl mb-4">
                    {projects[activeProject].description}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {projects[activeProject].details}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {projects[activeProject].tags.map((tag) => (
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
                      href={projects[activeProject].codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-navy-600 rounded-full text-sm hover:border-gold-400 hover:text-gold-400 transition-colors"
                    >
                      <Code size={16} />
                      CODE
                    </a>
                    <a
                      href={projects[activeProject].liveUrl}
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
            </AnimatePresence>

            {/* Project counter */}
            <div className="absolute -bottom-8 right-0 text-gray-500 font-mono text-sm">
              {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
