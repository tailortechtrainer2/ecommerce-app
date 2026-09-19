import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import Products from './components/Products.jsx'
import Perks from './components/Perks.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState(null)

  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1)
    setToast(product.name)
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />
      <Categories />
      <Products onAddToCart={handleAddToCart} />
      <Perks />
      <Newsletter />
      <Footer />

      {toast && (
        <div className="toast-cart position-fixed bottom-0 end-0 m-4 bg-dark text-white px-4 py-3 rounded-3 shadow-lg d-flex align-items-center gap-2">
          <i className="bi bi-check-circle-fill text-success"></i>
          <span>{toast} added to cart!</span>
        </div>
      )}
    </>
  )
}
