import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Wrench, TrendingUp } from 'lucide-react';
import SmartImage from './SmartImage';

const AboutSection = () => {
  const pillars = [
    {
      icon: Search,
      title: 'DEEP ANALYSIS',
      description: 'I study the problem before I touch the code — why it exists, who it hurts, and what "solved" really looks like.',
    },
    {
      icon: Wrench,
      title: 'TAILORED SOLUTIONS',
      description: 'Custom ML models, algorithms, or Ethiopian-specific features — engineered to fit the problem, not forced onto it.',
    },
    {
      icon: TrendingUp,
      title: 'TRACTION-DRIVEN UI',
      description: 'Not just clean interfaces — interfaces designed to move users, earn trust, and convert.',
    },
  ];

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
              I dig deep into problems, then engineer solutions that <span className="italic">fit them exactly.</span>
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                I'm a full-stack developer based in Addis Ababa who starts every project the same way: by
                understanding the problem deeply. Whether that means training a custom ML model, writing
                a graph-theory algorithm where a database would be overkill, or building Ethiopian-specific
                features that global tools simply don't cover — I tailor the solution to the problem, not
                the other way around.
              </p>
              <p>
                I've built and shipped 10+ live products end to end — integrating both Stripe and Chapa
                payment flows, architecting PostgreSQL backends, and designing frontends that don't just
                look clean but are engineered to generate real user traction. From a road-safety platform
                that scores driver trips with zero extra hardware, to a fashion e-commerce brand serving
                Ethiopian customers, I take products from a messy problem to a live, working solution.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
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
            <div className="relative rounded-2xl overflow-hidden">
              <SmartImage
                src="/kidus.png"
                alt="Kidus Sofonias"
                eager
                className="aspect-[4/7]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-serif text-2xl">Kidus Sofonias</h3>
                <p className="text-gold-400 font-mono text-xs tracking-widest mt-1">
                  FULL-STACK DEVELOPER · ADDIS ABABA · PROBLEM-SOLVER
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
