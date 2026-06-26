import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiX } from 'react-icons/fi';
import videoData from '../data/videoData';

// Reusable Reel Card with Local Spotlight and Magnetic Play Button
const ReelCard = ({ video, index, isInView, onOpen }) => {
  const cardRef = useRef(null);
  const playBtnRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [btnHovered, setBtnHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    if (playBtnRef.current && btnHovered) {
      const btnRect = playBtnRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      // Calculate pull vector (pull intensity: 35%)
      setBtnOffset({
        x: (e.clientX - btnCenterX) * 0.35,
        y: (e.clientY - btnCenterY) * 0.35
      });
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setBtnHovered(false);
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-lg cursor-pointer hover-lift border border-ivory-200 bg-white"
      onClick={() => onOpen(video)}
    >
      {/* Spotlight glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.2), transparent 80%)`,
        }}
      />

      {/* Thumbnail */}
      <div className="aspect-[9/16] sm:aspect-[3/4] relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />

        {/* Magnetic Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            ref={playBtnRef}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnOffset({ x: 0, y: 0 }); }}
            animate={{ x: btnOffset.x, y: btnOffset.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.8 }}
            className="w-16 h-16 rounded-full bg-gold-400 flex items-center justify-center shadow-gold transition-all duration-300 group-hover:scale-110"
          >
            <FiPlay className="text-maroon-950 text-2xl ml-1 transition-transform duration-300 group-hover:scale-110" />
          </motion.div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-maroon-900/80 rounded-full border border-gold-400/20 z-20">
          <span className="text-white text-xs font-semibold tracking-wider">{video.duration}</span>
        </div>

        {/* Video Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-xl text-white mb-1.5">{video.title}</h3>
          <p className="text-ivory-200 text-sm font-light leading-relaxed line-clamp-2">{video.description}</p>
        </div>
      </div>

      {/* Gold Border Highlight */}
      <div className="absolute inset-0 border border-transparent group-hover:border-gold-400/40 transition-all duration-500 rounded-lg pointer-events-none z-20" />
    </motion.div>
  );
};

const Reels = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const openVideo = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="reels" className="section-padding bg-ivory-100 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div ref={sectionRef} className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">Reels & Videos</span>
          <h2 className="heading-section mt-4">
            Behind The <span className="text-gradient">Scenes</span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoData.map((video, index) => (
            <ReelCard 
              key={video.id} 
              video={video} 
              index={index} 
              isInView={isInView} 
              onOpen={openVideo}
            />
          ))}
        </div>
      </div>

      {/* Video Modal Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-950/98 backdrop-blur-lg p-4"
            onClick={closeVideo}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer z-10"
            >
              <FiX size={24} />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="max-w-3xl w-full relative z-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[9/16] sm:aspect-video bg-maroon-900 rounded-lg overflow-hidden relative shadow-gold border border-gold-400/20">
                <video
                  ref={videoRef}
                  src={selectedVideo.video}
                  poster={selectedVideo.thumbnail}
                  className="w-full h-full object-cover"
                  playsInline
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Play/Pause Overlay */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
                    onClick={togglePlay}
                  >
                    <div className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center shadow-gold transition-transform duration-350 hover:scale-110">
                      <FiPlay className="text-maroon-950 text-3xl ml-1" />
                    </div>
                  </div>
                )}

                {/* Video Info Overlay */}
                {!isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 to-transparent pointer-events-none z-10">
                    <h3 className="font-display text-2xl text-white mb-1.5">{selectedVideo.title}</h3>
                    <p className="text-ivory-200 text-sm font-light">{selectedVideo.description}</p>
                  </div>
                )}
              </div>

              <p className="text-center text-ivory-300 mt-4 text-xs font-light uppercase tracking-widest">
                Click Video or Play Button to play/pause.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reels;
