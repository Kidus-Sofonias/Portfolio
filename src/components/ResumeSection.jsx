import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const ResumeSection = () => {
  const stats = [
    { value: '3+', label: 'YEARS EXPERIENCE' },
    { value: '10+', label: 'PRODUCTS SHIPPED' },
    { value: '15+', label: 'AWARDS & FEATURES' },
  ];

  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-gold-400 font-mono text-sm tracking-widest mb-6">
          07 — DOSSIER
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
          The full story, on one page.
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12">
          Three years of building products at the edge of engineering and design.
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/Kidus_Sofonias_Resume.pdf"
          download
          className="inline-flex items-center gap-3 px-10 py-5 bg-gold-500 text-navy-900 rounded-full font-mono text-sm tracking-widest font-medium hover:bg-gold-400 transition-colors mb-4"
        >
          <Download size={18} />
          DOWNLOAD RESUME
        </motion.a>
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
