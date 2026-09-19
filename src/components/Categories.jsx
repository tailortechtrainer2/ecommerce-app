import React from 'react'
import { categories } from '../data.js'

export default function Categories() {
  return (
    <section id="categories" className="py-5 bg-surface">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-brand fw-bold text-uppercase">Browse</h6>
          <h2 className="fw-bold brand-font text-ink">Shop by Category</h2>
        </div>

        <div className="row g-4">
          {categories.map((cat) => (
            <div className="col-6 col-md-4 col-lg-2" key={cat.id}>
              <div className="card category-card text-center border-0 h-100 py-4">
                <div className="category-icon mx-auto mb-3">
                  <i className={`bi ${cat.icon}`}></i>
                </div>
                <h6 className="fw-semibold mb-1 text-ink">{cat.name}</h6>
                <small className="text-secondary">{cat.count} items</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
