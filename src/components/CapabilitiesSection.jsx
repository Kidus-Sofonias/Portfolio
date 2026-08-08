import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Cloud, Brain, Palette } from 'lucide-react';

const capabilities = [
  {
    icon: Palette,
    title: 'Frontend',
    color: 'from-blue-500/20 to-transparent',
    skills: ['React', 'Tailwind CSS', 'Three.js', 'UI Design', 'HTML5', 'CSS3'],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'from-green-500/20 to-transparent',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Uvicorn'],
  },
  {
    icon: Database,
    title: 'Databases',
    color: 'from-purple-500/20 to-transparent',
    skills: ['PostgreSQL', 'MySQL'],
  },
  {
    icon: Cloud,
    title: 'Deployment',
    color: 'from-orange-500/20 to-transparent',
    skills: ['Render', 'Netlify', 'GitHub', 'Firebase', 'Vercel'],
  },
  {
    icon: Brain,
    title: 'ML / AI',
    color: 'from-pink-500/20 to-transparent',
    skills: ['scikit-learn', 'TensorFlow'],
  },
  {
    icon: Code,
    title: 'Languages & Tools',
    color: 'from-cyan-500/20 to-transparent',
    skills: ['JavaScript', 'Python', 'TypeScript', 'Git'],
  },
];

const CapabilitiesSection = () => {
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-navy-600/50 hover:border-gold-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <cap.icon className="w-6 h-6 text-gray-400 group-hover:text-gold-400 transition-colors" />
                </div>

                <h3 className="font-serif text-2xl mb-4 group-hover:text-gold-400 transition-colors">
                  {cap.title}
                </h3>
                {/* Divider line */}
                <div className="h-px bg-navy-600 mb-6 group-hover:bg-gold-500/40 transition-colors" />

                {/* Tech stack — always visible */}
                <div className="flex flex-wrap gap-2">
                  {cap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-mono text-gray-300 bg-navy-900/60 rounded-full border border-navy-600 group-hover:border-gold-500/30 group-hover:text-gold-400/90 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
