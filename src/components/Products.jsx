import React, { useRef } from 'react';
import { Reveal } from './Reveal';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
  { 
    id: 1, 
    name: 'Sun Mango', 
    tagline: 'The one people keep coming back for.', 
    description: "Thick, sweet, and tastes like a mango you'd buy from a street cart in July. We use Alphonso mangoes when they're in season and switch to Kesar the rest of the year. You'll notice the difference. In a good way.",
    price: '₹89 / bottle',
    color: '#ff8a00',
    image: '/images/mango.jpg'
  },
  { 
    id: 2, 
    name: 'Red Rush Strawberry', 
    tagline: 'Tart first. Sweet second.', 
    description: "A lot of strawberry drinks are basically pink sugar water. This one actually tastes like strawberries — a little sharp, a little sweet, and properly red. Good cold, great over ice.",
    price: '₹85 / bottle',
    color: '#ff4d4d',
    image: '/images/strawberry.jpg'
  },
  { 
    id: 3, 
    name: 'Dark Berry', 
    tagline: "Not for everyone. But if it's for you, you'll know.", 
    description: "Deep, slightly tangy, and nothing like the blackberry flavour you've had in sweets. This one divides opinion — some people love it immediately, others take a bottle or two. Either way, there's no artificial colour in it. That dark purple is just the fruit.",
    price: '₹92 / bottle',
    color: '#8b5cf6',
    image: '/images/blackberry.jpg'
  },
];

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  
  return (
    <Reveal
      delay={index * 0.1}
      style={{
        background: 'var(--secondary-bg)',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      className="product-card"
    >
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '200px', height: '200px', background: product.color, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.1 }} />
      
      <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          className="product-image"
        />
      </div>

      <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1, zIndex: 2 }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: product.color, marginBottom: '0.5rem' }}>
          {product.tagline}
        </p>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-color)' }}>{product.name}</h3>
        
        <p style={{ fontSize: '1rem', marginBottom: '2rem', flex: 1, color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {product.description}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{product.price}</span>
          <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', gap: '0.5rem' }}>
            <ShoppingBag size={18} /> Add to Cart
          </button>
        </div>
      </div>

      <style>{`
        .product-card { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid transparent; }
        .product-card:hover { transform: translateY(-10px); border-color: var(--border-color); }
        .product-card:hover .product-image { transform: scale(1.05); }
      `}</style>
    </Reveal>
  );
};

const Products = () => {
  const containerRef = useRef(null);

  return (
    <section id="products" ref={containerRef} className="section" style={{ background: 'var(--bg-color)', paddingTop: '8rem' }}>
      <div className="container">
        <Reveal
          style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>Pure selections.</h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '400px' }}>Discover our range of 100% natural juices, concentrated pulps, and organic raw materials.</p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
