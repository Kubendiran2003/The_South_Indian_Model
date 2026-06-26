import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiX, FiZoomIn, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import portfolioData, { categories } from '../data/portfolioData';

// Reusable Portfolio Item component with Local Spotlight tracking
const PortfolioCard = ({ item, index, onOpen }) => {
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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-lg cursor-pointer hover-lift border border-ivory-200 bg-white shadow-sm"
      onClick={() => onOpen(item)}
    >
      {/* Local Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.2), transparent 80%)`,
        }}
      />

      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
        />
      </div>

      {/* Cinematic Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-xl text-white mb-1.5">{item.title}</h3>
          <p className="text-ivory-200 text-sm font-light tracking-wide">{item.description}</p>
        </div>

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
          <div className="w-11 h-11 rounded-full bg-gold-400 flex items-center justify-center shadow-gold">
            <FiZoomIn className="text-maroon-950 text-xl" />
          </div>
        </div>
      </div>

      {/* Gold Border Highlight */}
      <div className="absolute inset-0 border border-transparent group-hover:border-gold-400/40 transition-all duration-500 rounded-lg pointer-events-none z-20" />
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredPortfolio = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === activeCategory);

  const openLightbox = (item) => setSelectedImage(item);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction) => {
    const currentIndex = filteredPortfolio.findIndex(item => item.id === selectedImage.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredPortfolio.length
      : (currentIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length;
    setSelectedImage(filteredPortfolio[newIndex]);
  };

  return (
    <section id="portfolio" className="section-padding bg-ivory-100 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div ref={ref} className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">Portfolio</span>
          <h2 className="heading-section mt-4">
            Captured <span className="text-gradient">Moments</span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Category Filters with layoutId animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16 bg-ivory-100 p-2.5 rounded-full max-w-fit mx-auto border border-ivory-200 shadow-sm"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 z-10 cursor-pointer ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-maroon-600 hover:text-maroon-700'
              }`}
            >
              {activeCategory === category.id && (
                <motion.span
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-gradient-to-r from-maroon-600 to-maroon-700 rounded-full -z-10 shadow-luxury"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onOpen={openLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-950/98 backdrop-blur-lg p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white z-10 cursor-pointer"
            >
              <FiX size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer z-10"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer z-10"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="max-w-4xl max-h-[80vh] relative z-0 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-gold border border-gold-400/20"
              />

              {/* Image Info */}
              <div className="mt-6 text-center text-white">
                <h3 className="font-display text-2xl mb-1.5 text-gold-400">{selectedImage.title}</h3>
                <p className="text-ivory-200 text-sm font-light tracking-wider uppercase">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
