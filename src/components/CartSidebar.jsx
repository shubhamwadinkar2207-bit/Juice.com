import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ onCheckout }) => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

  // Extract the numeric value from price string like "₹89 / bottle"
  const getNumericPrice = (priceStr) => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (getNumericPrice(item.price) * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 999
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '400px',
              backgroundColor: 'var(--bg-color)',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.2)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid var(--border-color)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={20} /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: item.color || 'var(--secondary-bg)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>₹{getNumericPrice(item.price)}</p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--secondary-bg)', borderRadius: '8px', padding: '0.2rem' }}>
                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: 'var(--text-color)' }}>
                              <Minus size={14} />
                            </button>
                            <span style={{ fontSize: '0.9rem', padding: '0 0.5rem', minWidth: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: 'var(--text-color)' }}>
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--secondary-bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onCheckout) onCheckout();
                  }}
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
