import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-navy-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-400 font-mono text-sm tracking-widest mb-6">
              01 — ABOUT
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              I turn ideas into <span className="italic">fast, responsive</span> web apps people love to use.
            </h2>
            
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                I'm a full-stack developer based in Addis Ababa, building React frontends, 
                Node and Express APIs, and database-driven workflows. I care about clean UI 
                and responsive builds that feel right on every screen.
              </p>
              <p>
                From e-commerce platforms with Stripe checkout to polished client websites, 
                I take projects from concept to live deployment — and I love the freelance 
                pace of shipping real things for real people.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="border-t border-gold-500/30 pt-4">
                <h4 className="text-gold-400 font-mono text-xs tracking-widest mb-2">CLEAN UI</h4>
                <p className="text-gray-500 text-sm">Interfaces that stay simple and intuitive.</p>
              </div>
              <div className="border-t border-gold-500/30 pt-4">
                <h4 className="text-gold-400 font-mono text-xs tracking-widest mb-2">RESPONSIVE</h4>
                <p className="text-gray-500 text-sm">Flawless on phone, tablet and desktop.</p>
              </div>
              <div className="border-t border-gold-500/30 pt-4">
                <h4 className="text-gold-400 font-mono text-xs tracking-widest mb-2">FULL-STACK</h4>
                <p className="text-gray-500 text-sm">Frontend, API and database, end to end.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/kidus.png"
                alt="Kidus Sofonias"
                className="w-full h-auto object-cover aspect-[1/2f]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-serif text-2xl">Kidus Sofonias</h3>
                <p className="text-gold-400 font-mono text-xs tracking-widest mt-1">
                  FULL-STACK DEVELOPER · ADDIS ABABA
                </p>
              </div>
            </div>
            
            {/* Navigation arrow */}
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 hover:bg-gold-400 transition-colors">
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
