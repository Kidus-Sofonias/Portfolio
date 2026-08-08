import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-navy-900">
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
