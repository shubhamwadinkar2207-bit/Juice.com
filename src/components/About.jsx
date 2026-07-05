import React from 'react';
import { Reveal } from './Reveal';

const About = () => {
  return (
    <section id="about" className="section" style={{ background: 'var(--secondary-bg)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <Reveal>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem' }}>
              Our Story.<br/>
              <span style={{ color: 'var(--accent-color)' }}>No shortcuts.</span>
            </h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-color)', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', opacity: 0.9 }}>
              <p>
                We started selling juice at a local weekend market in 2021. Just a cooler box, six flavours, and a handwritten sign. We sold out the first day and came back the next weekend with twice as much.
              </p>
              <p>
                That's basically still how we operate — small batches, proper fruit, no cutting corners on the process. We don't use concentrates or added sugar. The flavour you taste is just the fruit.
              </p>
              <p>
                We're a small team. The same two people who were at that first market still run most of the production. We've gotten more organised, but the actual recipe hasn't changed.
              </p>
              <p>
                We ship across India now. Orders placed before 2 PM go out the same day. Cold chain packaging on every order because warm juice is a disappointment we'd rather not be responsible for.
              </p>
              <p>
                If something's wrong with your order, just message us. We'll sort it.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: '40px',
              background: 'var(--bg-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <video 
                src="/Mango_juice_bottle_with_swirl_video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default About;
