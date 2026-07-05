import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';
import { CartProvider, useCart } from './context/CartContext';

function AppContent() {
  const [isCheckout, setIsCheckout] = useState(false);
  const { clearCart, cartItems } = useCart();

  useEffect(() => {
    if (isCheckout && cartItems.length === 0) {
      setIsCheckout(false);
    }
  }, [cartItems.length, isCheckout]);

  return (
    <div className="app-container">
      <Navbar />
      <CartSidebar onCheckout={() => setIsCheckout(true)} />
      
      {isCheckout ? (
        <Checkout 
          onCancel={() => setIsCheckout(false)}
          onComplete={() => {
            alert('Order Successful! Thank you for your purchase.');
            clearCart();
            setIsCheckout(false);
          }} 
        />
      ) : (
        <main>
          <Hero />
          <Products />
          <About />
          <Testimonials />
        </main>
      )}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
