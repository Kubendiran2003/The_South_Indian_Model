import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import siteConfig from '../data/siteConfig';
import herobg from '../assets/hero-bride.jpg';
import { useEffect, useState } from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Parallax scroll calculations
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Generate static positions for particles on mount to avoid hydration mismatch
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
    setParticles(generated);
  }, []);

  // Split tagline for cinematic reveal
  const words = siteConfig.tagline.split(' ');

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(8px)',
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] // Custom luxury ease-out
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon-950"
    >
      {/* Parallax Background Image with Overlays */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={herobg}
          alt="Bridal background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/60 via-maroon-950/70 to-maroon-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/50 via-transparent to-maroon-950/50" />
      </motion.div>

      {/* Floating Sparkles/Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold-400/40"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.sin(p.id) * 30, 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Decorative Geometric Wireframes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <motion.div
          initial={{ opacity: 0, rotate: -30, scale: 0.9 }}
          animate={{ opacity: 0.1, rotate: -45, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute -top-20 -right-20 w-[450px] h-[450px] border border-gold-400/30 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 30, scale: 0.9 }}
          animate={{ opacity: 0.08, rotate: 45, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] border border-gold-400/20 rounded-full"
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container-padding text-center mt-16 md:mt-14"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, scale: 1, letterSpacing: '0.2em' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-block px-8 py-2.5 border border-gold-400/30 rounded-full text-gold-300 text-xs font-semibold uppercase tracking-widest bg-maroon-900/40 backdrop-blur-md shadow-gold">
            {siteConfig.title}
          </span>
        </motion.div>

        {/* Cinematic Tagline Word Reveal */}
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-2 leading-tight tracking-wide max-w-5xl mx-auto"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block mr-3 md:mr-5">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="text-ivory-100 text-base md:text-lg mb-14 tracking-widest font-light max-w-2xl mx-auto uppercase leading-relaxed"
        >
          {siteConfig.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="btn-gold min-w-[200px] py-4 cursor-pointer"
          >
            Book Now
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="btn-secondary !text-white !border-white/50 hover:!border-gold-400 hover:!bg-gold-400/10 hover:!text-white min-w-[200px] py-4 backdrop-blur-sm cursor-pointer"
          >
            View Portfolio
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-secondary !text-white !border-white/50 hover:!border-gold-400 hover:!bg-gold-400/10 hover:!text-white min-w-[200px] py-4 backdrop-blur-sm cursor-pointer"
          >
            Contact
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.8 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/80 hover:text-gold-400 transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiChevronDown size={32} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
