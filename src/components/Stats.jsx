const stats = [
  { num: '100%', label: 'Custom-built solutions' },
  { num: '10+', label: 'Core technologies' },
  { num: 'E2E', label: 'Full-lifecycle ownership' },
  { num: '\u221e', label: 'Scalability by design' },
]

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className={`stat reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <div className="stat-num"><em>{s.num}</em></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
