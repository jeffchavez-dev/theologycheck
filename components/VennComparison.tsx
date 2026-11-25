const cream = '#f5ede0'
const cinzel = "Cinzel, Georgia, serif"
const garamond = "'EB Garamond', Georgia, serif"

const thStyle: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderBottom: '2px solid #d4c4a8',
  textAlign: 'left',
  color: '#2a1a0e',
  fontFamily: cinzel,
  fontSize: '0.72rem',
  letterSpacing: '0.04em',
  fontWeight: 700,
  verticalAlign: 'bottom',
}

const tdBase: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderBottom: '1px solid #d4c4a8',
  color: '#3a2a1a',
  fontFamily: garamond,
  fontSize: '0.95rem',
  lineHeight: '1.5',
  verticalAlign: 'top',
}

const tdTopic: React.CSSProperties = {
  ...tdBase,
  color: '#8b6040',
  fontWeight: 600,
  fontSize: '0.88rem',
}

export default function VennComparison() {
  return (
    <>
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">1689 · Progressive · Westminster Compared</h2>
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

          {/* 1689 left bullets */}
          <text fontFamily={garamond} fontSize="10.5" fill={cream} textAnchor="middle">
            <tspan x="345" y="96">{'• Two covenants in'}</tspan>
            <tspan x="345" dy="13">Abraham: circumcision</tspan>
            <tspan x="345" dy="13">and grace</tspan>
            <tspan x="345" dy="18">{'• CoG revealed, not formally'}</tspan>
            <tspan x="345" dy="13">established, in the OT</tspan>
          </text>

          {/* 1689 right bullets */}
          <text fontFamily={garamond} fontSize="10.5" fill={cream} textAnchor="middle">
            <tspan x="472" y="96">{'• OT covenants subservient,'}</tspan>
            <tspan x="472" dy="13">not administrations of CoG</tspan>
            <tspan x="472" dy="18">{'• NC is the first formal'}</tspan>
            <tspan x="472" dy="13">administration of the CoG</tspan>
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
          <text fontFamily={cinzel} fontSize="13" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="662" y="568">Westminster</tspan>
            <tspan x="662" dy="16">Covenant Theology</tspan>
          </text>

        </svg>
        <p className="fed-infographic-footer" style={{ marginTop: '0.5rem' }}>
          Adapted from 1689federalism.com
        </p>
      </section>

      {/* ── Four-tradition comparison table ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Four Traditions: Positions Side by Side</h2>
        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{ width: '100%', minWidth: 700, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '16%' }}>Position</th>
                <th style={{ ...thStyle, width: '21%' }}>1689 Federalism</th>
                <th style={{ ...thStyle, width: '21%' }}>Progressive Covenantalism</th>
                <th style={{ ...thStyle, width: '21%' }}>Westminster</th>
                <th style={{ ...thStyle, width: '21%' }}>20th C. Reformed Baptist</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fdfaf4' : '#f0e8d8' }}>
                  <td style={tdTopic}>{row.topic}</td>
                  <td style={tdBase}>{row.a}</td>
                  <td style={tdBase}>{row.b}</td>
                  <td style={tdBase}>{row.c}</td>
                  <td style={tdBase}>{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

const rows: { topic: string; a: string; b: string; c: string; d: string }[] = [
  {
    topic: 'Covenant with Adam',
    a: 'Covenant of works made with Adam in the garden',
    b: 'Covenant with Adam was not a covenant of works per se',
    c: 'Covenant of works made with Adam in the garden',
    d: 'Covenant of works made with Adam in the garden',
  },
  {
    topic: 'Covenant of grace — origin',
    a: 'Promised and revealed in the OT from Gen 3:15 onward, but not formally established until the New Covenant',
    b: 'No covenant of grace promised in the Old Testament',
    c: 'Covenant of grace made and administered from Gen 3:15 onward; one continuous covenant through both Testaments',
    d: 'Covenant of grace begins at Gen 3:15; progressively revealed throughout the OT',
  },
  {
    topic: 'Old covenants (Abrahamic, Mosaic, Davidic)',
    a: 'Subservient, distinct covenants in their own right — not administrations of the covenant of grace',
    b: 'Progressive unfolding of redemption; Law and old covenant are identified together',
    c: 'Administrations of the one covenant of grace made with Abraham and later with Israel',
    d: 'Administrations of the covenant of grace (aligns with Westminster on this point)',
  },
  {
    topic: 'New Covenant',
    a: 'The first and only formal administration of the covenant of grace; the NC is the covenant of grace',
    b: 'Inaugurates a decisively new redemptive-historical era; all members know the Lord',
    c: 'The fullest, clearest administration of the one covenant of grace; visible church remains mixed',
    d: 'The covenant of grace is fulfilled and fully administered in the New Covenant',
  },
  {
    topic: 'Covenant of grace — revealed vs. established',
    a: 'The CoG was revealed and promised throughout the OT, but not formally established until the NC',
    b: 'No formal CoG in the OT at all',
    c: 'The CoG was both revealed and formally administered from Genesis onward',
    d: 'The CoG was progressively revealed in the OT; fulfilled in the NC',
  },
  {
    topic: 'Circumcision covenant',
    a: 'Distinct from the covenant of grace; a national covenant of works for Israel',
    b: 'Identified with the Law; not a separate covenant of works',
    c: 'An administration of the covenant of grace; pattern continues in infant baptism',
    d: 'An administration of the covenant of grace (aligns with Westminster here)',
  },
  {
    topic: 'Baptism',
    a: 'Believers\' baptism only — NC members are regenerate; no basis for paedobaptism',
    b: 'Believers\' baptism only',
    c: 'Paedobaptism — children of believers are included in the covenant of grace',
    d: 'Believers\' baptism only — despite holding that the OT covenants are CoG administrations',
  },
  {
    topic: 'Perpetuity of moral law',
    a: 'Threefold distinction upheld; moral law is perpetually binding',
    b: 'Skeptical of the threefold distinction; law functions differently across redemptive history',
    c: 'Threefold distinction upheld; moral law (including Sabbath) perpetually binding',
    d: 'Perpetuity of the moral law affirmed; threefold distinction upheld',
  },
  {
    topic: 'Scripture\'s organizing principle',
    a: 'Scripture is organized by way of covenant',
    b: 'Scripture is organized by way of covenant',
    c: 'Scripture is organized by way of covenant',
    d: 'Scripture is organized by way of covenant',
  },
]
