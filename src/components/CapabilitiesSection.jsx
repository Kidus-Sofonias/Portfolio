import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Database, Cloud, Brain, Palette, ArrowRight } from 'lucide-react';

const capabilities = [
  {
    icon: Palette,
    title: 'Frontend',
    accent: 'text-pink-400',
    glow: 'from-pink-500/25',
    skills: ['React', 'Tailwind CSS', 'Three.js', 'UI Design', 'HTML5', 'CSS3'],
  },
  {
    icon: Server,
    title: 'Backend',
    accent: 'text-emerald-400',
    glow: 'from-emerald-500/25',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Uvicorn'],
  },
  {
    icon: Database,
    title: 'Databases',
    accent: 'text-violet-400',
    glow: 'from-violet-500/25',
    skills: ['PostgreSQL', 'MySQL'],
  },
  {
    icon: Cloud,
    title: 'Deployment',
    accent: 'text-orange-400',
    glow: 'from-orange-500/25',
    skills: ['Render', 'Netlify', 'GitHub', 'Firebase', 'Vercel'],
  },
  {
    icon: Brain,
    title: 'ML / AI',
    accent: 'text-cyan-400',
    glow: 'from-cyan-500/25',
    skills: ['scikit-learn', 'TensorFlow'],
  },
  {
    icon: Code,
    title: 'Languages & Tools',
    accent: 'text-sky-400',
    glow: 'from-sky-500/25',
    skills: ['JavaScript', 'Python', 'TypeScript', 'Git'],
  },
];

const CapabilitiesSection = () => {
  const [active, setActive] = useState(0);
  const current = capabilities[active];

  return (
    <section id="capabilities" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">
            02 — CAPABILITIES
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-3xl">
            A full-stack toolkit for shipping real products.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Category selector */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 lg:pb-0 pb-2">
            {capabilities.map((cap, i) => {
              const isActive = active === i;
              return (
                <button
                  key={cap.title}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300 text-left shrink-0 ${
                    isActive
                      ? 'bg-navy-800/80 border-gold-500/40 shadow-lg shadow-black/30'
                      : 'border-navy-600/50 hover:border-navy-500 hover:bg-navy-800/40'
                  }`}
                >
                  <cap.icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? cap.accent : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  />
                  <span
                    className={`font-mono text-sm whitespace-nowrap transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {cap.title}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="capability-indicator"
                      className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-gold-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Skill panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl border border-navy-600/50 bg-navy-800/40 backdrop-blur p-8 md:p-10 overflow-hidden"
              >
                {/* Category-colored glow */}
                <div
                  className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${current.glow} to-transparent blur-2xl opacity-60`}
                />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                      <current.icon className={`w-6 h-6 ${current.accent}`} />
                    </div>
                    <p className="text-gray-500 font-mono text-xs tracking-widest">
                      {String(active + 1).padStart(2, '0')} / {String(capabilities.length).padStart(2, '0')}
                    </p>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl mb-8">{current.title}</h3>

                  <div className="flex flex-wrap gap-3">
                    {current.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.08 * i, duration: 0.25 }}
                        className="px-4 py-2 text-sm font-mono text-gray-200 bg-navy-900/70 border border-navy-600/80 rounded-full flex items-center gap-2 group/skill"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-gray-500 text-sm">
                    <ArrowRight size={14} className="text-gold-400" />
                    <span className="font-mono text-xs">
                      {current.skills.length} TECHNOLOGIES · {current.title.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
