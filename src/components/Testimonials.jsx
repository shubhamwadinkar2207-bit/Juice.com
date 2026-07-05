import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const testimonialsRow1 = [
  {
    name: "Sarah Jenkins",
    role: "Mother of two",
    text: "I've been looking for a juice without added sugar for my kids and finally found it. The Sun Mango is literally just mango. No weird aftertaste.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80"
  },
  {
    name: "David Chen",
    role: "Fitness Coach",
    text: "A bit pricey compared to supermarket stuff, but you can immediately taste why. The Dark Berry is intense and perfectly tart. Really clean ingredients.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80"
  },
  {
    name: "Emma Roberts",
    role: "Regular Customer",
    text: "Started getting the strawberry one for breakfast. Best part is it actually tastes like real fruit, not candy. You can tell they don't mess with it.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80"
  },
  {
    name: "Marcus Thorne",
    role: "Chef",
    text: "We use their raw pulps for our desserts at the restaurant. It's the closest thing to pressing the fruit yourself without all the labor.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80"
  }
];

const testimonialsRow2 = [
  {
    name: "Lisa V.",
    role: "Verified Buyer",
    text: "Honestly didn't believe the 'zero mislead' thing until I read the label. It's just fruit. Tastes like summer.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80"
  },
  {
    name: "Tom Harrison",
    role: "Weekly Subscriber",
    text: "Delivery is always cold and fresh. The Red Rush Strawberry is my absolute favorite, though you have to shake it well since there's no weird stabilizers.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80"
  },
  {
    name: "Priya Patel",
    role: "Nutritionist",
    text: "I actually recommend these to my clients who crave sweets. The natural sugar from the whole fruit is a much better alternative to processed drinks.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80"
  },
  {
    name: "James Wilson",
    role: "Coffee Shop Owner",
    text: "We stock these in our fridge and they sell out faster than our cold brew. People appreciate transparency these days.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80"
  }
];

const CarouselRow = ({ items, direction = "left", speed = 30 }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', width: '100%', padding: '1rem 0' }}>
      <motion.div
        animate={{
          x: direction === "left" ? [0, -width] : [-width, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ display: 'flex', gap: '2rem', width: 'max-content' }}
      >
        {duplicatedItems.map((testimonial, index) => (
          <div
            key={index}
            style={{
              width: '350px',
              background: 'var(--secondary-bg)',
              borderRadius: '24px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0
            }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--text-color)', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
              "{testimonial.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-color)', marginBottom: '0.2rem' }}>{testimonial.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-color)', overflow: 'hidden', paddingBottom: '8rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>Word of mouth.</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Don't just take our word for it. Here's what real people think about our 100% natural juices.
          </p>
        </Reveal>
      </div>

      {/* Carousels container with fade edges */}
      <Reveal delay={0.2}>
        <div style={{ 
          position: 'relative', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}>
          <CarouselRow items={testimonialsRow1} direction="left" speed={35} />
          <CarouselRow items={testimonialsRow2} direction="right" speed={40} />
        </div>
      </Reveal>
    </section>
  );
};

export default Testimonials;
