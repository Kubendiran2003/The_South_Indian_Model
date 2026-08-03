import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import siteConfig from '../data/siteConfig';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reels', label: 'Reels' },
  { id: 'services', label: 'Services' },
  { id: 'booking', label: 'Booking' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.id);
      const current = sections.find(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-maroon-950/75 backdrop-blur-md shadow-lg py-3 border-b border-gold-400/10'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex flex-col items-start"
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-display text-xl md:text-2xl font-semibold text-white transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-xs tracking-widest uppercase text-gold-400 transition-colors">
              {siteConfig.title}
            </span>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-gold-400'
                    : 'text-white/90 hover:text-gold-400'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gold-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors text-white cursor-pointer"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-maroon-950/95 backdrop-blur-md border-t border-gold-400/20"
          >
            <div className="container-padding py-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 font-medium transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'text-gold-400'
                      : 'text-white/80 hover:text-gold-400'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
