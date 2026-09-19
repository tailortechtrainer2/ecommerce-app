import React from 'react'

const perks = [
  { icon: 'bi-truck', title: 'Free Shipping', text: 'On all orders over $50' },
  { icon: 'bi-arrow-repeat', title: 'Easy Returns', text: '30-day return policy' },
  { icon: 'bi-shield-check', title: 'Secure Payment', text: '100% secure checkout' },
  { icon: 'bi-headset', title: '24/7 Support', text: 'Dedicated support team' },
]

export default function Perks() {
  return (
    <section className="py-5 perks-section">
      <div className="container">
        <div className="row g-4 text-center">
          {perks.map((p) => (
            <div className="col-6 col-lg-3" key={p.title}>
              <i className={`bi ${p.icon} display-5 text-brand mb-3 d-block`}></i>
              <h6 className="fw-semibold text-ink">{p.title}</h6>
              <small className="text-secondary">{p.text}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
