import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Database, Cloud, Brain, Palette, X } from 'lucide-react';

const capabilities = [
  {
    icon: Palette,
    title: 'Frontend',
    percentage: 95,
    color: 'from-blue-500/20 to-transparent',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Three.js', level: 80 },
      { name: 'UI Design', level: 88 },
      { name: 'HTML5', level: 98 },
      { name: 'CSS3', level: 95 },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    percentage: 88,
    color: 'from-green-500/20 to-transparent',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 92 },
      { name: 'FastAPI', level: 85 },
      { name: 'Uvicorn', level: 82 },
    ],
  },
  {
    icon: Database,
    title: 'Databases',
    percentage: 85,
    color: 'from-purple-500/20 to-transparent',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    icon: Cloud,
    title: 'Deployment',
    percentage: 92,
    color: 'from-orange-500/20 to-transparent',
    skills: [
      { name: 'Render', level: 90 },
      { name: 'Netlify', level: 88 },
      { name: 'GitHub', level: 95 },
      { name: 'Firebase', level: 82 },
    ],
  },
  {
    icon: Brain,
    title: 'ML / AI',
    percentage: 78,
    color: 'from-pink-500/20 to-transparent',
    skills: [
      { name: 'scikit-learn', level: 82 },
      { name: 'TensorFlow', level: 75 },
    ],
  },
  {
    icon: Code,
    title: 'Languages & Tools',
    percentage: 90,
    color: 'from-cyan-500/20 to-transparent',
    skills: [
      { name: 'JavaScript', level: 92 },
      { name: 'Python', level: 88 },
      { name: 'TypeScript', level: 80 },
      { name: 'Git', level: 95 },
    ],
  },
];

const SkillTooltip = ({ cap, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 10 }}
    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 z-30"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="bg-navy-900 border border-navy-600 rounded-xl p-5 shadow-2xl shadow-black/50">
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-navy-900 border-r border-b border-navy-600 rotate-45 -mt-1.5" />

      <div className="flex items-center justify-between mb-4">
        <h4 className="text-gold-400 font-mono text-xs tracking-widest">{cap.title}</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {cap.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-300 text-sm">{skill.name}</span>
              <span className="text-gold-400 font-mono text-xs">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CapabilitiesSection = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <section id="capabilities" className="section-padding bg-navy-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">
              02 — CAPABILITIES
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-3xl">
              A full-stack toolkit for shipping real products.
            </h2>
          </div>
          <p className="text-gray-500 text-sm font-mono tracking-wider mt-6 md:mt-0 max-w-xs text-right">
            HOVER OR CLICK TO EXPLORE THE STACK.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-navy-600/50 hover:border-gold-500/30 transition-all duration-500 overflow-visible cursor-pointer"
              onMouseEnter={() => setActiveTooltip(cap.title)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === cap.title ? null : cap.title)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <cap.icon className="w-6 h-6 text-gray-400 group-hover:text-gold-400 transition-colors" />
                  <span className="text-gold-400 font-mono text-sm">{cap.percentage}%</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-4 group-hover:text-gold-400 transition-colors">{cap.title}</h3>
                  <div className="h-px bg-navy-600 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cap.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-y-0 left-0 bg-gold-400"
                    />
                  </div>
                </div>
              </div>

              {/* Skill tooltip — hover on desktop, click on mobile */}
              <AnimatePresence>
                {activeTooltip === cap.title && (
                  <SkillTooltip cap={cap} onClose={() => setActiveTooltip(null)} />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
