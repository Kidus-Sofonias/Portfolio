import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImage from './SmartImage';

const CredentialsSection = () => {
  const [showCert, setShowCert] = useState(false);

  const certification = {
    title: 'Full-Stack MERN Development',
    issuer: 'EVANGADI NETWORKS',
    date: 'COMPLETED 2024',
    description: 'Intensive full-stack program covering MongoDB, Express.js, React, and Node.js — with hands-on practice building production-ready apps, REST APIs, and database design.',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs', 'JWT Auth', 'Git'],
    image: '/evangadi_certificate.jpg',
  };

  return (
    <section id="credentials" className="section-padding">
      <div className="container mx-auto px-6">
        <p className="text-gold-400 font-mono text-sm tracking-widest mb-4">
          06 — CREDENTIALS
        </p>
        <h2 className="font-serif text-4xl md:text-5xl mb-16">Education & Certifications</h2>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-10 flex flex-col lg:flex-row gap-10"
          >
            {/* Left: info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-gold-400" />
                </div>
                <div>
                  <p className="text-gold-400 font-mono text-xs tracking-widest mb-1">CERTIFICATION</p>
                  <p className="text-gray-500 font-mono text-xs tracking-wider">
                    {certification.issuer} · {certification.date}
                  </p>
                </div>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl mb-4">{certification.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{certification.description}</p>

              <div className="pt-8 border-t border-navy-600">
                <p className="text-gold-400 font-mono text-xs tracking-widest mb-4">TECHNOLOGIES MASTERED</p>
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-mono text-gray-300 bg-navy-800 rounded-full border border-navy-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: certificate preview */}
            <div className="lg:w-80 flex-shrink-0">
              <p className="text-gold-400 font-mono text-xs tracking-widest mb-4">CERTIFICATE PREVIEW</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden cursor-pointer border border-navy-600 group"
                onClick={() => setShowCert(true)}
              >
                <SmartImage
                  src={certification.image}
                  alt="Evangadi Certificate"
                  className="h-48 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-gold-400 font-mono text-xs">VIEW FULL SIZE</span>
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <ChevronRight size={14} className="text-gold-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-size certificate modal */}
      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowCert(false)}
          >
            <button
              onClick={() => setShowCert(false)}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={certification.image}
                alt="Evangadi Certificate — Full Size"
                eager
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CredentialsSection;
