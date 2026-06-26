import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import siteConfig from '../data/siteConfig';

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className={`glass-card p-8 md:p-10 text-center transition-all duration-500 ${
        isActive ? 'shadow-luxury' : 'opacity-50'
      }`}
    >
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FiStar key={i} className="text-gold-400 fill-current" size={20} />
        ))}
      </div>

      {/* Quote */}
      <p className="font-body text-lg md:text-xl text-maroon-600 leading-relaxed mb-8 italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div>
        <h4 className="font-display text-xl text-maroon-600">{testimonial.name}</h4>
        <p className="text-gold-500 text-sm uppercase tracking-wider">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = siteConfig.testimonials;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div ref={sectionRef} className="container-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">Testimonials</span>
          <h2 className="heading-section mt-4">
            What They <span className="text-gradient">Say</span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-ivory-200 hover:bg-gold-400 text-maroon-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-ivory-200 hover:bg-gold-400 text-maroon-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold-400 w-6'
                    : 'bg-ivory-400 hover:bg-gold-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
