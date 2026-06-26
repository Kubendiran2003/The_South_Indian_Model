import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPhone, FiMail, FiHeart } from 'react-icons/fi';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import siteConfig from '../data/siteConfig';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Reels', href: '#reels' },
  { label: 'Services', href: '#services' },
  { label: 'Booking', href: '#booking' },
  { label: 'Contact', href: '#contact' }
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const scrollToSection = (href) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={ref} className="bg-maroon-600 text-white">
      <div className="container-padding max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl text-white mb-2">{siteConfig.name}</h3>
            <p className="text-gold-300 text-sm uppercase tracking-wider mb-6">{siteConfig.title}</p>
            <p className="text-ivory-200 text-sm leading-relaxed">
              {siteConfig.tagline}. Creating timeless bridal moments across South India.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-lg text-gold-400 mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-ivory-200 hover:text-gold-400 transition-colors text-sm text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg text-gold-400 mb-6">Contact</h4>
            <div className="space-y-4">
              <a
                href={`tel:${siteConfig.contact.mobile}`}
                className="flex items-center gap-3 text-ivory-200 hover:text-gold-400 transition-colors text-sm"
              >
                <FiPhone size={16} />
                {siteConfig.contact.mobile}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-ivory-200 hover:text-gold-400 transition-colors text-sm"
              >
                <FiMail size={16} />
                {siteConfig.contact.email}
              </a>
              <p className="text-ivory-200 text-sm">Available for bookings worldwide</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display text-lg text-gold-400 mb-6">Follow Me</h4>
            <div className="flex gap-4 mb-6">
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400 text-white hover:text-maroon-600 flex items-center justify-center transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={siteConfig.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400 text-white hover:text-maroon-600 flex items-center justify-center transition-all duration-300"
              >
                <FaYoutube size={18} />
              </a>
            </div>
            <p className="text-ivory-200 text-sm">
              {siteConfig.contact.instagramHandle}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gold-400/20 my-10" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-ivory-300 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-ivory-300 text-sm flex items-center gap-2">
            Made with <FiHeart className="text-gold-400" /> for bridal elegance
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
