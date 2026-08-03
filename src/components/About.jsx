import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FiCamera, FiVideo, FiUsers, FiHeart } from 'react-icons/fi';
import siteConfig from '../data/siteConfig';
import fullimage from '../assets/hero-bride1.jpg';

const stats = [
  { label: 'Photoshoots', value: siteConfig.stats.photoshoots, icon: FiCamera },
  { label: 'Reels', value: siteConfig.stats.reels, icon: FiVideo },
  { label: 'Collaborations', value: siteConfig.stats.collaborations, icon: FiUsers },
  { label: 'Happy Clients', value: siteConfig.stats.clients, icon: FiHeart }
];

const AnimatedNumber = ({ value, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span>{count}+</span>;
};

// Reusable Spotlight Card Component
const StatCard = ({ stat, index, statsInView }) => {
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={statsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden glass-card p-8 text-center hover-lift border border-white/20 z-10"
    >
      {/* Spotlight highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.15), transparent 80%)`,
        }}
      />
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-400/10 mb-4 z-10 relative">
        <stat.icon className="text-gold-500 text-2xl" />
      </div>
      <div className="font-display text-4xl md:text-5xl text-maroon-600 font-semibold mb-2 z-10 relative">
        <AnimatedNumber value={stat.value} inView={statsInView} />
      </div>
      <div className="text-sm font-sans uppercase tracking-wider text-maroon-500 z-10 relative font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

  // Parallax calculations for the About Image
  const imageContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" className="section-padding bg-ivory-100 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div ref={ref} className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">About Me</span>
          <h2 className="heading-section mt-4">
            Elegance Rooted in <span className="text-gradient">Tradition</span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Component with Parallax Scroll */}
          <div ref={imageContainerRef} className="relative h-[500px]">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <motion.img
                src={fullimage}
                alt="About"
                style={{ y: imgY, scale: 1.15 }}
                className="w-full h-[600px] object-cover object-top rounded-lg shadow-luxury"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute inset-0 border-2 border-gold-400/40 rounded-lg pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-full h-full border-2 border-gold-400 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-32 h-32 bg-gold-400/10 rounded-lg -z-10" />
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl text-maroon-600 leading-snug">
              {siteConfig.biography.intro}
            </h3>

            <p className="text-body text-lg leading-relaxed">
              {siteConfig.biography.journey}
            </p>

            <p className="text-body text-lg leading-relaxed">
              {siteConfig.biography.passion}
            </p>

            <p className="text-body text-lg italic border-l-4 border-gold-400 pl-4 py-3 bg-white/40 rounded-r-md">
              {siteConfig.biography.mission}
            </p>

            {/* Gold Accent Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-0.5 bg-gradient-to-r from-gold-400 to-gold-300 mt-8" 
            />
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              statsInView={statsInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
