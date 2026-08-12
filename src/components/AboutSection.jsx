import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Wrench, TrendingUp } from 'lucide-react';
import SmartImage from './SmartImage';

const AboutSection = () => {
  const pillars = [
    {
      icon: Search,
      title: 'DEEP ANALYSIS',
      description: 'I study the problem before I touch the code.',
    },
    {
      icon: Wrench,
      title: 'TAILORED SOLUTIONS',
      description: 'Custom ML, algorithms, and Ethiopian-specific features — built to fit the problem.',
    },
    {
      icon: TrendingUp,
      title: 'TRACTION-DRIVEN UI',
      description: 'Interfaces designed to move users and convert.',
    },
  ];

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
              I dig deep into problems, then engineer solutions that <span className="italic">fit them exactly.</span>
            </h2>

            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                I'm a full-stack developer in Addis Ababa who starts every project by understanding
                the problem deeply — then tailors the stack to fit it, whether that's a custom ML
                model, a graph-theory algorithm, or features global tools simply don't cover.
              </p>
              <p>
                10+ products shipped end to end: Stripe & Chapa payments, PostgreSQL backends, and
                UIs engineered to convert — from a road-safety platform that scores trips with no
                extra hardware to a fashion e-commerce brand for Ethiopian customers.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="border-t border-gold-500/30 pt-4 group">
                  <pillar.icon className="w-5 h-5 text-gold-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-gold-400 font-mono text-xs tracking-widest mb-2">{pillar.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-navy-600/40">
              <SmartImage
                src="/kidus.png"
                alt="Kidus Sofonias"
                eager
                className="aspect-[4/3] md:aspect-[3/4] md:max-h-[520px]"
                imgClassName="object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-serif text-xl md:text-2xl">Kidus Sofonias</h3>
                <p className="text-gold-400 font-mono text-[11px] md:text-xs tracking-widest mt-1">
                  FULL-STACK DEVELOPER · ADDIS ABABA
                </p>
              </div>
            </div>

            {/* Scroll to work */}
            <button
              onClick={scrollToProjects}
              aria-label="See my work"
              className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 hover:bg-gold-400 transition-colors shadow-lg shadow-black/40"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
