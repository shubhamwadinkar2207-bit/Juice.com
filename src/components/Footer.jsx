import React from 'react';
import { Icons } from './icons';
import { Reveal } from './Reveal';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          <Reveal delay={0}>
          <div style={{ gridColumn: 'span 2' }}>
            <a href="#" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.05em', display: 'inline-block', marginBottom: '1.5rem' }}>
              Juicewala<span style={{ color: 'var(--accent-color)' }}>.</span>
            </a>
            <p style={{ maxWidth: '300px', marginBottom: '2rem' }}>
              100% natural fruit juices, pulps, and raw materials. Experience nature in every drop.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ padding: '0.6rem', background: 'var(--secondary-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)' }}>
                <Icons.instagram style={{ width: '20px', height: '20px' }} />
              </a>
              <a href="#" style={{ padding: '0.6rem', background: 'var(--secondary-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)' }}>
                <Icons.twitter style={{ width: '20px', height: '20px' }} />
              </a>
              <a href="#" style={{ padding: '0.6rem', background: 'var(--secondary-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)' }}>
                <Icons.youtube style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>
          </Reveal>

          <Reveal delay={0.1}>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Shop</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Cold Pressed Juices</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>100% Pure Pulps</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Raw Materials</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Gift Cards</a></li>
            </ul>
          </div>
          </Reveal>

          <Reveal delay={0.2}>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Our Story</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Zero Mislead Policy</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Sustainability</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Contact Us</a></li>
            </ul>
          </div>
          </Reveal>

        </div>

        <Reveal delay={0.3}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <p>&copy; {new Date().getFullYear()} Juicewala. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
