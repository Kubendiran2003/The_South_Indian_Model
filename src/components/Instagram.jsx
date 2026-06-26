import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import siteConfig from '../data/siteConfig';

import imgBridalElegance from '../assets/portfolio-bridal-elegance.png';
import imgGoldenSaree from '../assets/portfolio-golden-saree.png';
import imgTempleJewelry from '../assets/portfolio-temple-jewelry.png';
import imgClassicTraditional from '../assets/portfolio-classic-traditional.png';
import imgModernFusion from '../assets/portfolio-modern-fusion.png';
import imgRoyalBridal from '../assets/portfolio-royal-bridal.png';

const instagramPosts = [
  {
    id: 1,
    image: imgBridalElegance,
    likes: "2.4k"
  },
  {
    id: 2,
    image: imgGoldenSaree,
    likes: "1.8k"
  },
  {
    id: 3,
    image: imgTempleJewelry,
    likes: "3.2k"
  },
  {
    id: 4,
    image: imgClassicTraditional,
    likes: "2.1k"
  },
  {
    id: 5,
    image: imgModernFusion,
    likes: "4.5k"
  },
  {
    id: 6,
    image: imgRoyalBridal,
    likes: "3.8k"
  }
];


const Instagram = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-ivory-100">
      <div ref={sectionRef} className="container-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-label">Instagram</span>
          <h2 className="heading-section mt-4">
            Follow My <span className="text-gradient">Journey</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-body mt-6">
            {siteConfig.contact.instagramHandle}
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg aspect-square hover-lift"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-maroon-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <FiInstagram className="text-white text-3xl mb-2 mx-auto" />
                  <span className="text-white text-sm">{post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-10"
        >
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3"
          >
            <FiInstagram />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Instagram;
