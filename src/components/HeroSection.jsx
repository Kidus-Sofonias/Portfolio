import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold-400 font-mono text-sm tracking-[0.3em] mb-6"
        >
          FULL-STACK DEVELOPER · ADDIS ABABA, ETHIOPIA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium mb-8 leading-tight"
        >
          Kidus
          <br />
          <span className="italic">Sofonias</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I build <span className="italic text-white">full-stack web experiences</span> with React
          and Node, from clean responsive UIs to the APIs and databases behind them.
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 border border-gold-500/50 rounded-full text-gold-400 font-mono text-sm tracking-widest hover:bg-gold-500/10 transition-all duration-300"
        >
          BEGIN THE JOURNEY
          <ArrowDown size={16} />
        </motion.a>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 glass py-6"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-serif text-gold-400">5+</p>
              <p className="text-xs text-gray-500 tracking-widest mt-2">LIVE PROJECTS</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif text-gold-400">3+</p>
              <p className="text-xs text-gray-500 tracking-widest mt-2">YEARS EXPERIENCE</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif text-gold-400">10+</p>
              <p className="text-xs text-gray-500 tracking-widest mt-2">PROJECTS SHIPPED</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif text-gold-400">15+</p>
              <p className="text-xs text-gray-500 tracking-widest mt-2">AWARDS & FEATURES</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
