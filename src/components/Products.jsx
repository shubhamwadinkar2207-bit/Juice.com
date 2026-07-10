import React, { useRef, useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const products = [
  { 
    id: 1, 
    name: 'Sun Mango', 
    tagline: 'The one people keep coming back for.', 
    description: "Thick, sweet, and tastes like a mango you'd buy from a street cart in July. We use Alphonso mangoes when they're in season and switch to Kesar the rest of the year. You'll notice the difference. In a good way.",
    price: '₹89',
    period: 'per bottle',
    color: '#ff8a00',
    image: '/images/mango.jpg',
    whatsInside: "Alphonso mango pulp, filtered water, a splash of lemon. No added sugar, no preservatives.",
    whySpecial: "Made from mangoes picked at peak ripeness, pressed within 24 hours. Tastes like the fruit, not a syrup version of it."
  },
  { 
    id: 2, 
    name: 'Red Rush Strawberry', 
    tagline: 'Tart first. Sweet second.', 
    description: "A lot of strawberry drinks are basically pink sugar water. This one actually tastes like strawberries — a little sharp, a little sweet, and properly red. Good cold, great over ice.",
    price: '₹85',
    period: 'per bottle',
    color: '#ff4d4d',
    image: '/images/strawberry.jpg',
    whatsInside: "Cold-pressed strawberries, a hint of lime, filtered water.",
    whySpecial: "No red dye needed — the color comes entirely from the fruit. Tart, cold, and gone in about four sips."
  },
  { 
    id: 3, 
    name: 'Dark Berry', 
    tagline: "Not for everyone. But if it's for you, you'll know.", 
    description: "Deep, slightly tangy, and nothing like the blackberry flavour you've had in sweets. This one divides opinion — some people love it immediately, others take a bottle or two. Either way, there's no artificial colour in it. That dark purple is just the fruit.",
    price: '₹92',
    period: 'per bottle',
    color: '#8b5cf6',
    image: '/images/blackberry.jpg',
    whatsInside: "Blackberry and blueberry blend, a touch of mint, filtered water.",
    whySpecial: "The most antioxidant-dense bottle in the lineup. Deep flavor, not overly sweet — built for people who don't want their juice to taste like candy."
  },
];

const ProductCard = ({ product, index, onOpen }) => {
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
        <button 
          className="product-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onOpen(product);
          }}
        >
          Click here to buy
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const containerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, setIsCheckout } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    
    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  return (
    <section id="products" ref={containerRef} className="section" style={{ background: 'var(--bg-color)', paddingTop: '8rem', paddingBottom: '8rem', position: 'relative' }}>
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
              <ProductCard key={product.id} product={product} index={index} onOpen={setSelectedProduct} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProduct(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-grid">
                <div className="modal-image-col">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
                
                <div className="modal-text-col">
                  <h2 className="modal-title">{selectedProduct.name}</h2>
                  <p className="modal-price-large">{selectedProduct.price}</p>
                  
                  <div className="modal-section">
                    <h4>What's inside</h4>
                    <p>{selectedProduct.whatsInside}</p>
                  </div>
                  
                  <div className="modal-section">
                    <h4>Why it's special</h4>
                    <p>{selectedProduct.whySpecial}</p>
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      className="btn btn-primary modal-btn-buy"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                        setIsCheckout(true);
                      }}
                    >
                      Buy Now
                    </button>
                    <button 
                      className="btn btn-secondary modal-btn-add" 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Existing Products styles */
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

        /* Modal CSS */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-content {
          background: var(--bg-color);
          border-radius: 24px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Hide scrollbar for modal content */
        .modal-content::-webkit-scrollbar {
          display: none;
        }
        .modal-content {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0,0,0,0.05);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-color);
          z-index: 10;
          transition: background 0.2s;
        }
        
        .modal-close:hover {
          background: rgba(0,0,0,0.1);
        }
        
        @media (prefers-color-scheme: dark) {
          .modal-close {
            background: rgba(255,255,255,0.1);
          }
          .modal-close:hover {
            background: rgba(255,255,255,0.2);
          }
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 500px;
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
        }

        .modal-image-col {
          width: 100%;
          height: 100%;
          background: var(--secondary-bg);
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 0;
        }
        
        @media (max-width: 768px) {
          .modal-image-col {
            padding: 0;
            min-height: 300px;
          }
        }

        .modal-image-col img {
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          border-radius: 24px 0 0 24px;
          box-shadow: none;
        }
        
        @media (max-width: 768px) {
          .modal-image-col img {
            border-radius: 24px 24px 0 0;
          }
        }

        .modal-text-col {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .modal-text-col {
            padding: 2rem;
          }
        }

        .modal-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          letter-spacing: -0.02em;
        }

        .modal-price-large {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .modal-section {
          margin-bottom: 2rem;
        }

        .modal-section h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-color);
        }

        .modal-section p {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 1rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 500px) {
          .modal-actions {
            flex-direction: column;
          }
        }

        .modal-btn-buy, .modal-btn-add {
          flex: 1;
          padding: 1rem 1.5rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .modal-btn-buy {
          background: var(--accent-color);
          color: white;
        }

        .modal-btn-buy:hover {
          filter: brightness(0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 138, 0, 0.3);
        }

        .modal-btn-add {
          background: transparent;
          border: 2px solid var(--border-color, #e5e7eb);
          color: var(--text-color);
        }
        
        @media (prefers-color-scheme: dark) {
          .modal-btn-add {
            border-color: #374151;
          }
        }

        .modal-btn-add:hover {
          border-color: var(--text-muted);
          background: var(--secondary-bg);
        }
      `}</style>
    </section>
  );
};

export default Products;


