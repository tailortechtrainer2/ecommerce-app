import React, { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="newsletter" className="py-5 newsletter-section">
      <div className="container text-center">
        <i className="bi bi-envelope-paper-heart display-4 text-brand mb-3 d-block"></i>
        <h2 className="fw-bold brand-font mb-2 text-ink">Join Our Newsletter</h2>
        <p className="text-secondary mb-4">
          Subscribe to get special offers, free giveaways, and updates.
        </p>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-sm-row justify-content-center gap-2 mx-auto"
          style={{ maxWidth: '480px' }}
        >
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-brand btn-lg fw-semibold px-4">
            Subscribe
          </button>
        </form>

        {submitted && (
          <div className="alert alert-success mt-3 mx-auto" style={{ maxWidth: '480px' }}>
            <i className="bi bi-check-circle me-2"></i>Thanks for subscribing!
          </div>
        )}
      </div>
    </section>
  )
}
