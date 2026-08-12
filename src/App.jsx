import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProjectsSection from './components/ProjectsSection';
import BlogSection from './components/BlogSection';
import PersonalSection from './components/PersonalSection';
import CredentialsSection from './components/CredentialsSection';
import ResumeSection from './components/ResumeSection';
import Footer from './components/Footer';

/* ───────── Water-flow gradient background ─────────
   A fixed layer of large, blurred color blobs that slowly
   drift on their own (ambient "water" motion) and shift
   position as you scroll — so the gradient is never static.
   Sections above it are transparent, so it shows through
   the entire page. */
const WaterBackground = () => {
  const { scrollYProgress } = useScroll();

  // Scroll-linked movement — each blob drifts differently
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['10%', '-35%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['5%', '-12%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['35%', '-15%']);
  const x3 = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['25%', '50%']);
  const x4 = useTransform(scrollYProgress, [0, 1], ['10%', '-8%']);
  const y5 = useTransform(scrollYProgress, [0, 1], ['55%', '25%']);
  const x5 = useTransform(scrollYProgress, [0, 1], ['-5%', '10%']);

  const blobs = [
    { y: y1, x: x1, color: 'bg-[#1d4ed8]', size: 'w-[60vw] h-[60vw]', pos: 'top-[-18%] left-[-12%]', opacity: 0.45, duration: '16s', delay: '0s' },
    { y: y2, x: x2, color: 'bg-[#6d28d9]', size: 'w-[52vw] h-[52vw]', pos: 'top-[18%] right-[-14%]', opacity: 0.4, duration: '21s', delay: '-4s' },
    { y: y3, x: x3, color: 'bg-[#0e7490]', size: 'w-[46vw] h-[46vw]', pos: 'top-[55%] left-[-10%]', opacity: 0.38, duration: '19s', delay: '-8s' },
    // Heavier blobs hidden on small screens for mobile GPU performance
    { y: y4, x: x4, color: 'bg-[#be185d]', size: 'w-[38vw] h-[38vw]', pos: 'top-[70%] right-[6%]', opacity: 0.3, duration: '24s', delay: '-12s', extra: 'hidden md:block' },
    { y: y5, x: x5, color: 'bg-[#b45309]', size: 'w-[34vw] h-[34vw]', pos: 'top-[40%] left-[38%]', opacity: 0.28, duration: '26s', delay: '-6s', extra: 'hidden lg:block' },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b18] via-[#0b1229] to-[#070b18]" />

      {/* Drifting color blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          style={{ y: blob.y, x: blob.x }}
          className={`absolute ${blob.size} ${blob.pos} ${blob.extra || ''}`}
        >
          <div
            className={`w-full h-full rounded-full ${blob.color} animate-blob-drift water-blob`}
            style={{
              opacity: blob.opacity,
              animationDuration: blob.duration,
              animationDelay: blob.delay,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'capabilities', 'projects', 'blog', 'personal', 'credentials'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WaterBackground />
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <BlogSection />
      <PersonalSection />
      <CredentialsSection />
      <ResumeSection />
      <Footer />
    </div>
  );
}

export default App;
