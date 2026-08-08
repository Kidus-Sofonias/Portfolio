import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-navy-900 border-t border-navy-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="font-serif text-2xl">Kidus <span className="italic">Sofonias</span></p>
            <p className="text-gray-500 text-sm mt-1">Full-Stack Developer · Addis Ababa, Ethiopia</p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/Kidus-Sofonias" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">GitHub</a>
            <a href="https://www.linkedin.com/in/kidus-sofonias-149750375/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">LinkedIn</a>
            <a href="mailto:sofoniaskidus@gmail.com" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">Email</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-navy-700 text-center">
          <p className="text-gray-600 text-sm font-mono">
            © 2026 Kidus Sofonias. Crafted with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
