import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Reels from './components/Reels';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Instagram from './components/Instagram';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom Cursor state
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // 3 trailing star springs for stagger lag effect
  const star1X = useSpring(mouseX, { stiffness: 850, damping: 45 });
  const star1Y = useSpring(mouseY, { stiffness: 850, damping: 45 });
  
  const star2X = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const star2Y = useSpring(mouseY, { stiffness: 220, damping: 24 });
  
  const star3X = useSpring(mouseX, { stiffness: 110, damping: 18 });
  const star3Y = useSpring(mouseY, { stiffness: 110, damping: 18 });

  useEffect(() => {
    // Detect mobile touch pointer
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!window.matchMedia('(pointer: coarse)').matches) {
      window.addEventListener('mousemove', moveMouse);
      window.addEventListener('mouseover', handleHover);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-white selection:bg-gold-400 selection:text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Cinematic Custom Cursor Trail */}
      {!isMobile && (
        <>
          {/* Star 1 - Leading Sparkle */}
          <motion.div
            className="fixed pointer-events-none z-[9999] text-gold-400 mix-blend-screen"
            style={{
              x: star1X,
              y: star1Y,
              translateX: '-50%',
              translateY: '-50%',
              scale: isHovering ? 1.5 : 1,
              filter: 'drop-shadow(0 0 6px #D4AF37) drop-shadow(0 0 10px #D4AF37)'
            }}
            animate={isHovering ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"/>
            </svg>
          </motion.div>

          {/* Star 2 - Middle Sparkle */}
          <motion.div
            className="fixed pointer-events-none z-[9998] text-gold-400/70 mix-blend-screen"
            style={{
              x: star2X,
              y: star2Y,
              translateX: '-50%',
              translateY: '-50%',
              scale: isHovering ? 1.4 : 1,
              filter: 'drop-shadow(0 0 4px #D4AF37) drop-shadow(0 0 8px #D4AF37)'
            }}
            animate={{ rotate: 180 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"/>
            </svg>
          </motion.div>

          {/* Star 3 - Trailing Sparkle */}
          <motion.div
            className="fixed pointer-events-none z-[9997] text-gold-400/45 mix-blend-screen"
            style={{
              x: star3X,
              y: star3Y,
              translateX: '-50%',
              translateY: '-50%',
              scale: isHovering ? 1.3 : 1,
              filter: 'blur(0.5px) drop-shadow(0 0 3px rgba(212, 175, 55, 0.4))'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"/>
            </svg>
          </motion.div>
        </>
      )}

      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <About />
        <Portfolio />
        <Reels />
        <Services />
        <BookingForm />
        <Testimonials />
        <Instagram />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
