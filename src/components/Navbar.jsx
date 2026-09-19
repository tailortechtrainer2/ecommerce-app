import React, { useState } from 'react'

export default function Navbar({ cartCount }) {
  const [query, setQuery] = useState('')

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-3 brand-font text-ink" href="#home">
          <i className="bi bi-bag-check-fill me-2 text-brand"></i>
          Shop<span className="text-brand">Ease.</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <a className="nav-link active" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#categories">Categories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#newsletter">Contact</a>
            </li>
          </ul>

          <form className="d-flex me-lg-3 mb-2 mb-lg-0" role="search">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control border-0"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="d-flex align-items-center gap-3">
            <a href="#" className="text-ink fs-5 position-relative">
              <i className="bi bi-heart"></i>
            </a>
            <a href="#" className="text-ink fs-5 position-relative">
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span className="badge rounded-pill bg-brand text-white position-absolute top-0 start-100 translate-middle cart-badge">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
