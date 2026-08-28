export function HistoryView({ history, onClear }) {
  if (history.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: '#222', letterSpacing: 3 }}>0</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#444', textAlign: 'center' }}>
          Nog geen workouts.<br/>Start je eerste op de home tab.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '0 24px 24px', flex: 1, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#555' }}>
          {history.length} SESSIES
        </div>
        <button onClick={onClear} style={{
          background: 'transparent', border: '1px solid #222',
          color: '#444', borderRadius: 8, padding: '4px 12px',
          fontSize: 10, cursor: 'pointer',
          fontFamily: "'DM Mono', monospace",
        }}>WISSEN</button>
      </div>

      {history.map((h, i) => {
        const date = new Date(h.timestamp)
        const dateStr = date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
        const timeStr = date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
        return (
          <div key={i} style={{
            background: '#141414', borderRadius: 14,
            padding: '16px 18px', marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            border: '1px solid #1e1e1e',
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: '#c8f55a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3.5 3.5L12 3" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Training</div>
              <div style={{ fontSize: 10, color: '#555', fontFamily: "'DM Mono', monospace" }}>
                {dateStr} · {timeStr}
              </div>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#c8f55a' }}>
              ✓ VOLLEDIG
            </div>
          </div>
        )
      })}
    </div>
  )
}
