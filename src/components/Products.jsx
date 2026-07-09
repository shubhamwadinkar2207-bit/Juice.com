import React, { useRef } from 'react';
import { Reveal } from './Reveal';
import { useCart } from '../context/CartContext';

const products = [
  { 
    id: 1, 
    name: 'Sun Mango', 
    tagline: 'The one people keep coming back for.', 
    description: "Thick, sweet, and tastes like a mango you'd buy from a street cart in July. We use Alphonso mangoes when they're in season and switch to Kesar the rest of the year. You'll notice the difference. In a good way.",
    price: '₹89',
    period: 'per bottle',
    color: '#ff8a00',
    image: '/images/mango.jpg'
  },
  { 
    id: 2, 
    name: 'Red Rush Strawberry', 
    tagline: 'Tart first. Sweet second.', 
    description: "A lot of strawberry drinks are basically pink sugar water. This one actually tastes like strawberries — a little sharp, a little sweet, and properly red. Good cold, great over ice.",
    price: '₹85',
    period: 'per bottle',
    color: '#ff4d4d',
    image: '/images/strawberry.jpg'
  },
  { 
    id: 3, 
    name: 'Dark Berry', 
    tagline: "Not for everyone. But if it's for you, you'll know.", 
    description: "Deep, slightly tangy, and nothing like the blackberry flavour you've had in sweets. This one divides opinion — some people love it immediately, others take a bottle or two. Either way, there's no artificial colour in it. That dark purple is just the fruit.",
    price: '₹92',
    period: 'per bottle',
    color: '#8b5cf6',
    image: '/images/blackberry.jpg'
  },
];

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price-row">
          <span className="product-price">{product.price}</span>
          <span className="product-period"> {product.period}</span>
        </p>
        
        <button onClick={() => addToCart(product)} className="btn btn-secondary product-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const containerRef = useRef(null);

  return (
    <section id="products" ref={containerRef} className="section" style={{ background: 'var(--bg-color)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-subtitle">OUR JUICES</span>
            <h2 className="section-title">Freshly Made</h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="products-slider">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-subtitle {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: var(--text-color);
          letter-spacing: -0.02em;
        }
        
        .products-slider {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 2rem;
          /* Hide scrollbar */
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
        .products-slider::-webkit-scrollbar {
          display: none;
        }

        .product-card {
          flex: 0 0 calc(33.333% - 1.33rem);
          min-width: 280px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease;
        }

        @media (max-width: 900px) {
          .product-card {
            flex: 0 0 calc(50% - 1rem);
          }
        }
        
        @media (max-width: 600px) {
          .product-card {
            flex: 0 0 85%;
          }
        }

        .product-image-container {
          width: 100%;
          aspect-ratio: 1 / 1.1;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
          background: var(--secondary-bg);
        }
        
        @media (prefers-color-scheme: dark) {
          .product-image-container {
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          }
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-info {
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .product-name {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-color);
        }

        .product-price-row {
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .product-price {
          font-weight: 700;
          color: var(--text-color);
        }

        .product-period {
          color: var(--text-muted);
          font-weight: 400;
        }

        .product-btn {
          width: 100%;
          max-width: 260px;
          padding: 0.9rem 1.5rem;
          border-radius: 100px;
          font-weight: 600;
          border: none;
          background: #ff8a00;
          color: white;
          transition: all 0.3s ease;
        }
        
        .product-btn:hover {
          background: #e67a00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 138, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Products;

