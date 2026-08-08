import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const ResumeSection = () => {
  const stats = [
    { value: '9+', label: 'YEARS EXPERIENCE' },
    { value: '40+', label: 'PRODUCTS SHIPPED' },
    { value: '12', label: 'AWARDS & FEATURES' },
  ];

  return (
    <section id="resume" className="section-padding bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 constellation-bg opacity-30" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-gold-400 font-mono text-sm tracking-widest mb-6">
          06 — DOSSIER
        </p>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8">
          The full story, on one page.
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          A distilled record of nine years building products at the edge of engineering and design. 
          Download the complete resume as a PDF.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-gold-500 text-navy-900 rounded-full font-mono text-sm tracking-widest font-medium hover:bg-gold-400 transition-colors mb-4"
        >
          <Download size={18} />
          DOWNLOAD RESUME
        </motion.button>
        <p className="text-gray-500 font-mono text-xs tracking-wider mb-16">
          PDF · GENERATED LIVE · ~80KB
        </p>

        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass rounded-xl p-6"
            >
              <p className="text-3xl md:text-4xl font-serif text-gold-400 mb-2">{stat.value}</p>
              <p className="text-gray-500 font-mono text-xs tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
