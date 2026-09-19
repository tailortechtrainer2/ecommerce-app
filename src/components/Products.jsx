import React, { useState, useMemo } from 'react'
import { products } from '../data.js'
import ProductCard from './ProductCard.jsx'

const filters = ['All', 'Footwear', 'Electronics', 'Accessories', 'Apparel', 'Bags', 'Home']

export default function Products({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return products
    return products.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="products" className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h6 className="text-brand fw-bold text-uppercase">Our Collection</h6>
          <h2 className="fw-bold brand-font text-ink">Featured Products</h2>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`btn btn-sm rounded-pill px-3 ${
                activeFilter === f ? 'btn-brand' : 'btn-outline-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filtered.map((product) => (
            <div className="col-6 col-md-4 col-lg-3" key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
