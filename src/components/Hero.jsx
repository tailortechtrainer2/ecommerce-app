import React from 'react'

export default function Hero() {
  return (
    <header id="home" className="hero-section">
      <div className="container py-5">
        <div className="row align-items-center min-vh-50 py-5">
          <div className="col-lg-6">
            <span className="badge bg-brand-soft text-brand mb-3 px-3 py-2 rounded-pill fw-semibold">
              <i className="bi bi-stars me-1"></i> New Season Collection
            </span>
            <h1 className="display-3 fw-bold brand-font mb-3 text-ink">
              Style That <span className="text-brand">Speaks</span> For You
            </h1>
            <p className="lead mb-4 text-secondary">
              Discover curated fashion, electronics &amp; lifestyle products —
              all in one place, at prices you'll love.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#products" className="btn btn-brand btn-lg px-4 fw-semibold">
                <i className="bi bi-bag-plus me-2"></i>Shop Now
              </a>
              <a href="#categories" className="btn btn-outline-dark btn-lg px-4">
                Explore Categories
              </a>
            </div>

            <div className="d-flex flex-wrap gap-4 mt-5">
              <div>
                <h4 className="fw-bold mb-0 text-ink">10K+</h4>
                <small className="text-secondary">Happy Customers</small>
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-ink">500+</h4>
                <small className="text-secondary">Premium Products</small>
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-ink">24/7</h4>
                <small className="text-secondary">Customer Support</small>
              </div>
            </div>
          </div>

          <div className="col-lg-6 text-center mt-5 mt-lg-0">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="Shopping"
              className="img-fluid rounded-4 shadow hero-img"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
