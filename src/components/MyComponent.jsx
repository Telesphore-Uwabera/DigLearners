import React from 'react'

export default function MyComponent({ title, subtitle, children }) {
  return (
    <section className="dl-panel" role="region" aria-label={title || 'Section'}>
      {(title || subtitle) && (
        <header className="dl-header">
          {title && <h2 className="dl-title">{title}</h2>}
          {subtitle && <p className="dl-subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="dl-content">{children}</div>
    </section>
  )
}
