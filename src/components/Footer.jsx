import React from 'react'

export default function Footer() {
  return (
    <footer className="footer-section text-light pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h4 className="fw-bold brand-font mb-3">
              <i className="bi bi-bag-check-fill me-2 text-brand"></i>
              Shop<span className="text-brand">Ease</span>
            </h4>
            <p className="text-secondary-light">
              Your one-stop destination for fashion, electronics, and lifestyle
              products at unbeatable prices.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="fw-semibold mb-3">Shop</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#products">New Arrivals</a></li>
              <li><a href="#products">Best Sellers</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#products">Deals</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Shipping Info</a></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="fw-semibold mb-3">Get in Touch</h6>
            <ul className="list-unstyled footer-links">
              <li><i className="bi bi-geo-alt me-2"></i>123 Market Street, NY</li>
              <li><i className="bi bi-telephone me-2"></i>+1 (555) 123-4567</li>
              <li><i className="bi bi-envelope me-2"></i>support@shopease.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary-light small">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
