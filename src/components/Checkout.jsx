import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Reveal } from './Reveal';
import { FaPaypal, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Input = ({ id, label, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
    {label && <label htmlFor={id} style={{ fontSize: '0.9rem', fontWeight: 500 }}>{label}</label>}
    <input
      id={id}
      style={{
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
      {...props}
    />
  </div>
);

const Checkout = ({ onComplete, onCancel }) => {
  const { cartItems } = useCart();
  const [step, setStep] = useState(1);
  
  // Extract the numeric value from price string like "₹89 / bottle"
  const getNumericPrice = (priceStr) => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (getNumericPrice(item.price) * item.quantity), 0);

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <section className="section" style={{ background: 'var(--secondary-bg)', paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <Reveal style={{ width: '100%', maxWidth: '500px' }}>
          <div style={{
            background: 'var(--bg-color)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)'
          }}>
            {step === 1 ? (
              // Step 1: Delivery Details
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Delivery Details</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Where should we send your fresh juice?</p>
                </div>
                
                <form onSubmit={handleDeliverySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <Input id="name" label="Customer Name" placeholder="Enter your full name" required />
                  <Input id="email" type="email" label="Email ID" placeholder="you@example.com" required />
                  <Input id="phone" type="tel" label="Phone Number" placeholder="+91 00000 00000" required />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <label htmlFor="address" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Delivery Address</label>
                    <textarea
                      id="address"
                      required
                      rows={3}
                      placeholder="Enter your full delivery address"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-color)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ padding: '1rem' }}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>
                      Proceed to Checkout
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Step 2: Payment Form
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Juicewala Secure Checkout</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Complete your order of ₹{totalAmount}</p>
                </div>

                {/* Express Checkout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <FaPaypal size={20} color="#003087" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>PayPal</span>
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <FaApple size={22} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pay</span>
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <FcGoogle size={24} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pay</span>
                  </button>
                </div>

                {/* Separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or pay with card</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                </div>

                {/* Form */}
                <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <Input id="cardholder" label="Cardholder full name" placeholder="Enter your full name" required />
                  <Input id="cardnumber" label="Card Number" placeholder="0000 0000 0000 0000" inputMode="numeric" required />
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Input id="expiry" label="Expiry Date" placeholder="MM/YY" required />
                    <Input id="cvv" label="CVV" placeholder="123" inputMode="numeric" type="password" required />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setStep(1)} className="btn btn-secondary" style={{ padding: '1rem' }}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>
                      Pay ₹{totalAmount}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Checkout;
