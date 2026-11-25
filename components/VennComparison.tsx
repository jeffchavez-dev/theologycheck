const cream = '#f5ede0'
const cinzel = "Cinzel, Georgia, serif"
const garamond = "'EB Garamond', Georgia, serif"

export default function VennComparison() {
  return (
    <>
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Three Covenant Traditions Compared</h2>
        <svg
          viewBox="0 0 820 680"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 820, display: 'block', margin: '1.25rem auto 0', height: 'auto' }}
          aria-label="Venn diagram comparing 1689 Federalism, Progressive Covenantalism, and Westminster Covenant Theology"
        >
          {/* Draw order: Westminster (back), Progressive, 1689 (front) */}
          <circle cx="560" cy="455" r="186" fill="#0e1a2d" />
          <circle cx="260" cy="455" r="186" fill="#0e2d1a" />
          <circle cx="410" cy="210" r="186" fill="#2d1808" />

          {/* ── 1689 Federalism title ── */}
          <text fontFamily={cinzel} fontSize="17" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="410" y="38">1689</tspan>
            <tspan x="410" dy="20">Federalism</tspan>
          </text>

          {/* 1689 left bullets — moved down so circle is wider */}
          <text fontFamily={garamond} fontSize="10.5" fill={cream} textAnchor="middle">
            <tspan x="345" y="96">{'• Two covenants in'}</tspan>
            <tspan x="345" dy="13">Abraham: circumcision</tspan>
            <tspan x="345" dy="13">and grace</tspan>
            <tspan x="345" dy="18">{'• Covenant of grace'}</tspan>
            <tspan x="345" dy="13">promised to, not made,</tspan>
            <tspan x="345" dy="13">with Abraham</tspan>
          </text>

          {/* 1689 right bullets */}
          <text fontFamily={garamond} fontSize="10.5" fill={cream} textAnchor="middle">
            <tspan x="472" y="96">{'• Circumcision covenant'}</tspan>
            <tspan x="472" dy="13">and grace covenant are</tspan>
            <tspan x="472" dy="13">two distinct covenants</tspan>
            <tspan x="472" dy="18">{'• Circumcision covenant'}</tspan>
            <tspan x="472" dy="13">{'is a "covenant of works"'}</tspan>
          </text>

          {/* ── Left overlap: 1689 ∩ Progressive ── */}
          <text fontFamily={garamond} fontSize="10.5" fontWeight="600" fill={cream} textAnchor="middle">
            <tspan x="316" y="318">Covenant made with Adam</tspan>
            <tspan x="316" dy="15">Each covenant is truly</tspan>
            <tspan x="316" dy="13">distinct from the other</tspan>
          </text>

          {/* ── Right overlap: 1689 ∩ Westminster ── */}
          <text fontFamily={garamond} fontSize="10.5" fontWeight="600" fill={cream} textAnchor="middle">
            <tspan x="504" y="318">Covenant of works</tspan>
            <tspan x="504" dy="15">Covenant of grace</tspan>
          </text>

          {/* ── Center: all three ── */}
          <text fontFamily={garamond} fontSize="10" fontStyle="italic" fill={cream} textAnchor="middle">
            <tspan x="410" y="360">Scripture organized</tspan>
            <tspan x="410" dy="13">by way of covenant</tspan>
          </text>

          {/* ── Progressive Covenantalism bullets ── */}
          <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
            <tspan x="155" y="480">{'• Covenant with Adam not a'}</tspan>
            <tspan x="155" dy="13">covenant of works per se</tspan>
            <tspan x="155" dy="18">{'• No covenant of grace'}</tspan>
            <tspan x="155" dy="13">promised in the OT</tspan>
            <tspan x="155" dy="18">{'• The Law and the old'}</tspan>
            <tspan x="155" dy="13">covenant are identified</tspan>
          </text>

          {/* Progressive Covenantalism title — inside circle, moved up from bottom */}
          <text fontFamily={cinzel} fontSize="13" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="155" y="568">Progressive</tspan>
            <tspan x="155" dy="16">Covenantalism</tspan>
          </text>

          {/* ── Westminster Covenant Theology bullets ── */}
          <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
            <tspan x="662" y="468">{'• One covenant with Abraham'}</tspan>
            <tspan x="662" dy="18">{'• Covenant of grace in'}</tspan>
            <tspan x="662" dy="13">the garden (Gen 3:15)</tspan>
            <tspan x="662" dy="18">{'• Circumcision = administration'}</tspan>
            <tspan x="662" dy="13">of the covenant of grace</tspan>
            <tspan x="662" dy="18">{'• Circumcision = covenant'}</tspan>
            <tspan x="662" dy="13">of grace</tspan>
          </text>

          {/* Westminster Covenant Theology title — inside circle */}
          <text fontFamily={cinzel} fontSize="13" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="662" y="568">Westminster</tspan>
            <tspan x="662" dy="16">Covenant Theology</tspan>
          </text>

        </svg>

        <p className="fed-infographic-footer" style={{ marginTop: '0.5rem' }}>
          Adapted from 1689federalism.com
        </p>
      </section>

      {/* ── Comparison table ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Positions Side by Side</h2>
        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: garamond,
            fontSize: '0.95rem',
            lineHeight: '1.5',
          }}>
            <thead>
              <tr>
                <th style={{ width: '20%', padding: '0.6rem 0.75rem', borderBottom: '2px solid #d4c4a8', textAlign: 'left', color: '#2a1a0e', fontFamily: cinzel, fontSize: '0.78rem', letterSpacing: '0.04em', fontWeight: 700 }}>Position</th>
                <th style={{ width: '27%', padding: '0.6rem 0.75rem', borderBottom: '2px solid #d4c4a8', textAlign: 'left', color: '#2a1a0e', fontFamily: cinzel, fontSize: '0.78rem', letterSpacing: '0.04em', fontWeight: 700 }}>1689 Federalism</th>
                <th style={{ width: '27%', padding: '0.6rem 0.75rem', borderBottom: '2px solid #d4c4a8', textAlign: 'left', color: '#2a1a0e', fontFamily: cinzel, fontSize: '0.78rem', letterSpacing: '0.04em', fontWeight: 700 }}>Progressive Covenantalism</th>
                <th style={{ width: '26%', padding: '0.6rem 0.75rem', borderBottom: '2px solid #d4c4a8', textAlign: 'left', color: '#2a1a0e', fontFamily: cinzel, fontSize: '0.78rem', letterSpacing: '0.04em', fontWeight: 700 }}>Westminster</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fdfaf4' : '#f0e8d8' }}>
                  <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid #d4c4a8', color: '#8b6040', fontWeight: 600, fontSize: '0.88rem' }}>{row.topic}</td>
                  <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid #d4c4a8', color: '#3a2a1a' }}>{row.a}</td>
                  <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid #d4c4a8', color: '#3a2a1a' }}>{row.b}</td>
                  <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid #d4c4a8', color: '#3a2a1a' }}>{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

const rows = [
  {
    topic: 'Covenant with Adam',
    a: 'A covenant of works was made with Adam in the garden',
    b: 'Covenant with Adam was not a covenant of works per se',
    c: 'A covenant of works was made with Adam in the garden',
  },
  {
    topic: 'Covenant of grace in the OT',
    a: 'Covenant of grace promised in the OT — to Adam, Abraham, David — but not formally administered until the New Covenant',
    b: 'No covenant of grace promised in the Old Testament',
    c: 'Covenant of grace made and administered in the garden (Gen 3:15) onward',
  },
  {
    topic: 'Abrahamic covenant',
    a: 'Two covenants in Abraham: the covenant of circumcision (a national covenant of works) and the covenant of grace (promise to faith)',
    b: 'One covenant structure — the Law and old covenant are identified together',
    c: 'One covenant of grace with Abraham, later administered through Moses',
  },
  {
    topic: 'Covenant of circumcision',
    a: 'Distinct covenant from the covenant of grace; functions as a covenant of works for the nation',
    b: 'Identified with the Law; not a separate covenant of works',
    c: 'An administration of the one covenant of grace; not a covenant of works',
  },
  {
    topic: 'OT covenant membership',
    a: 'Mixed: physical descendants only; members were not necessarily elect or regenerate',
    b: 'Mixed: physical membership, but not identical with the covenant of grace',
    c: 'Mixed: same covenant of grace as the NC, but administered differently',
  },
  {
    topic: 'New Covenant',
    a: 'The first and only formal administration of the covenant of grace; all members are regenerate',
    b: 'Inaugurates a new redemptive-historical era; all members know the Lord',
    c: 'A clearer, fuller administration of the one covenant of grace; still mixed in visible church',
  },
  {
    topic: 'Scripture\'s organizing principle',
    a: 'Scripture is organized by way of covenant',
    b: 'Scripture is organized by way of covenant',
    c: 'Scripture is organized by way of covenant',
  },
]
