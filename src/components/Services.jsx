import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiHeart, 
  FiLayers, 
  FiAward, 
  FiCamera, 
  FiUsers, 
  FiCalendar, 
  FiTrendingUp, 
  FiBriefcase 
} from 'react-icons/fi';
import servicesData from '../data/servicesData';

const iconMap = {
  FiHeart: FiHeart,
  FiLayers: FiLayers,
  FiAward: FiAward,
  FiCamera: FiCamera,
  FiUsers: FiUsers,
  FiCalendar: FiCalendar,
  FiTrendingUp: FiTrendingUp,
  FiBriefcase: FiBriefcase
};

const ServiceCard = ({ service, index, listInView }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const IconComponent = iconMap[service.icon] || FiBriefcase;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={listInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden glass-card p-8 h-full hover-lift border border-white/20 flex flex-col justify-between"
    >
      {/* Spotlight highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.15), transparent 80%)`,
        }}
      />

      {/* Gold Accent top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="flex flex-col h-full z-10 relative">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mb-6 group-hover:bg-gold-400/20 transition-all duration-300 group-hover:scale-115">
          <IconComponent className="text-gold-500 text-2xl transition-transform duration-300 group-hover:rotate-6" />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-maroon-600 mb-3 group-hover:text-gold-500 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-maroon-500 text-sm leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* CTA */}
        <div className="mt-6 pt-4 border-t border-ivory-300/60">
          <button
            onClick={() => {
              const element = document.getElementById('booking');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Inquire Now &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div ref={sectionRef} className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">Services</span>
          <h2 className="heading-section mt-4">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-body max-w-2xl mx-auto mt-6">
            Professional modeling services tailored to showcase the beauty of South Indian fashion and traditional elegance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} listInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="w-full max-w-2xl mx-auto block glass-card-dark px-6 md:px-24 py-8 rounded-lg border border-gold-400/25 relative overflow-hidden shadow-luxury">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-gold-400/10 rounded-full blur-xl" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-maroon-600/20 rounded-full blur-xl" />
            
            <p className="text-ivory-200 text-sm mb-3 uppercase tracking-wider relative z-10">
              Looking for something specific?
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-6 relative z-10">
              Let's Discuss Your Vision
            </h3>
            <button
              onClick={() => {
                const element = document.getElementById('booking');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-gold px-6 md:px-10 py-3.5 md:py-4 cursor-pointer relative z-10"
            >
              Book a Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
