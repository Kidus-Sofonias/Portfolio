import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, CreditCard, Settings, Smartphone } from 'lucide-react';

const CapabilitiesSection = () => {
  const capabilities = [
    { icon: Layout, title: 'Frontend', percentage: 95, color: 'from-blue-500/20 to-transparent' },
    { icon: Server, title: 'Backend', percentage: 88, color: 'from-green-500/20 to-transparent' },
    { icon: Database, title: 'Databases', percentage: 85, color: 'from-purple-500/20 to-transparent' },
    { icon: CreditCard, title: 'Payments & APIs', percentage: 82, color: 'from-yellow-500/20 to-transparent' },
    { icon: Settings, title: 'Tools & Deploy', percentage: 98, color: 'from-red-500/20 to-transparent' },
    { icon: Smartphone, title: 'Responsive Design', percentage: 92, color: 'from-cyan-500/20 to-transparent' },
  ];

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
            HOVER A DISCIPLINE TO EXPLORE THE STACK UNDERNEATH IT.
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
              className="group relative p-8 rounded-2xl border border-navy-600/50 hover:border-gold-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <cap.icon className="w-6 h-6 text-gray-400 group-hover:text-gold-400 transition-colors" />
                  <span className="text-gold-400 font-mono text-sm">{cap.percentage}%</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-4">{cap.title}</h3>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
