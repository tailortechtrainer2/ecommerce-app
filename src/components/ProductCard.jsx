import React from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const stars = Math.round(product.rating)

  return (
    <div className="card product-card h-100 border-0">
      {product.badge && (
        <span
          className={`badge position-absolute m-3 badge-${
            product.badge === 'Sale' ? 'sale' : product.badge === 'New' ? 'new' : 'best'
          }`}
        >
          {product.badge}
        </span>
      )}
      <button className="btn btn-light btn-sm wishlist-btn rounded-circle">
        <i className="bi bi-heart"></i>
      </button>

      <div className="product-img-wrap">
        <img src={product.image} className="card-img-top product-img" alt={product.name} />
      </div>

      <div className="card-body d-flex flex-column">
        <small className="text-uppercase text-secondary mb-1">{product.category}</small>
        <h6 className="fw-semibold mb-2 text-ink">{product.name}</h6>

        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bi ${i < stars ? 'bi-star-fill' : 'bi-star'} text-rating small`}
            ></i>
          ))}
          <span className="text-secondary small ms-1">({product.rating})</span>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3 mt-auto">
          <span className="fw-bold fs-5 text-ink">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-secondary text-decoration-line-through small">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          className="btn btn-brand w-100 fw-semibold"
          onClick={() => onAddToCart(product)}
        >
          <i className="bi bi-cart-plus me-2"></i>Add to Cart
        </button>
      </div>
    </div>
  )
}
