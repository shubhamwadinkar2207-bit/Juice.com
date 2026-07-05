import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const BackgroundAnimation = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <motion.div
        animate={{
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '-10%', '10%', '0%'],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw',
          background: 'var(--accent-color)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15,
        }}
      />
      <motion.div
        animate={{
          x: ['0%', '-10%', '5%', '0%'],
          y: ['0%', '10%', '-10%', '0%'],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw',
          background: '#ffb800', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.12,
        }}
      />
      <motion.div
        animate={{
          x: ['0%', '5%', '-10%', '0%'],
          y: ['0%', '5%', '-10%', '0%'],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', top: '30%', right: '20%', width: '40vw', height: '40vw',
          background: '#4ade80', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.1,
        }}
      />
    </div>
  );
};

// Our product images for the marquee
const MARQUEE_IMAGES = [
  '/images/mango.jpg',
  '/images/strawberry.jpg',
  '/images/blackberry.jpg',
];

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Duplicate images multiple times to ensure a seamless continuous loop
  const duplicatedImages = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section className="section" style={{ minHeight: '100vh', padding: '0', overflow: 'hidden', position: 'relative' }}>
      
      <BackgroundAnimation />

      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100vh', position: 'relative' }}>
        
        {/* Left Content Area */}
        <motion.div 
          style={{ flex: 1, zIndex: 10, y: y1, opacity, paddingRight: '2rem' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', 
              background: 'var(--secondary-bg)', fontSize: '0.8rem', fontWeight: 600,
              marginBottom: '1.5rem', color: 'var(--accent-color)'
            }}
          >
            100% Natural & Organic
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1.5rem' }}>
            Nature in <br/>
            <span style={{ color: 'var(--accent-color)' }}>every drop.</span>
          </h1>
          
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '500px', marginBottom: '2.5rem' }}>
            Zero mislead. Just pure, organic fruits pressed into the most refreshing juices and pulps. Experience the authentic taste of nature.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Shop Juices</button>
            <button className="btn btn-secondary">Explore Pulps</button>
          </div>
        </motion.div>

        {/* Right Area: Animated Image Marquee */}
        <motion.div 
          style={{ 
            flex: 1, height: '100vh', position: 'absolute', right: 0, top: 0, width: '45%', zIndex: 1, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            // Fade out the top and bottom of the marquee for a sleek look
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="hero-marquee-container"
        >
          <div style={{ display: 'flex', gap: '2rem', height: '200%' }}>
            {/* Column 1 - Scrolling Up */}
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '250px' }}
              animate={{
                y: ["0%", "-50%"],
              }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {duplicatedImages.map((src, index) => (
                <div key={`col1-${index}`} style={{ width: '100%', height: '350px', borderRadius: '24px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <img src={src} alt="Juice product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </motion.div>

            {/* Column 2 - Scrolling Down (Offset) */}
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '250px', marginTop: '-150px' }}
              animate={{
                y: ["-50%", "0%"],
              }}
              transition={{
                ease: "linear",
                duration: 30,
                repeat: Infinity,
              }}
            >
              {duplicatedImages.map((src, index) => (
                <div key={`col2-${index}`} style={{ width: '100%', height: '350px', borderRadius: '24px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <img src={src} alt="Juice product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ position: 'absolute', bottom: '2rem', left: '50%', translateX: '-50%', opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={24} color="var(--text-muted)" strokeWidth={1.5} />
        </motion.div>

      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .hero-marquee-container {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
