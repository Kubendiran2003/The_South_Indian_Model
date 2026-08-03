import { motion, useScroll, useSpring } from 'framer-motion';
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

  return (
    <div className="min-h-screen bg-white selection:bg-gold-400 selection:text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 origin-left z-[9999]"
        style={{ scaleX }}
      />

      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <About />
        <Portfolio />
        <Reels />
        <Services />
        <BookingForm />
        <Testimonials />
        <Contact />
        <Instagram />
      </main>
      <Footer />
    </div>
  );
}

export default App;
