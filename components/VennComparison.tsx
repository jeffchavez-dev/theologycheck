const cream = '#f5ede0'
const cinzel = "Cinzel, Georgia, serif"
const garamond = "'EB Garamond', Georgia, serif"

// Circle centers and radii
// 1689: (435, 200, r=175)  Prog: (215, 440, r=175)  West: (655, 440, r=175)  20thCRB: (435, 455, r=160)
// Progressive ↔ Westminster do NOT overlap (d=440 > 2*175=350) — theologically accurate

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
        <h2 className="fed-infographic-title">Four Covenant Traditions Compared</h2>
        <svg
          viewBox="0 0 870 700"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 870, display: 'block', margin: '1.25rem auto 0', height: 'auto' }}
          aria-label="Venn diagram comparing 1689 Federalism, Progressive Covenantalism, Westminster Covenant Theology, and 20th Century Reformed Baptist"
        >
          {/* Draw order: West (back), Prog, 20th C RB, 1689 (front) */}
          <circle cx="655" cy="440" r="175" fill="#0e1a2d" />
          <circle cx="215" cy="440" r="175" fill="#0e2d1a" />
          <circle cx="435" cy="455" r="160" fill="#1a0e28" />
          <circle cx="435" cy="200" r="175" fill="#2d1808" />

          {/* ════ SYSTEM TITLES ════ */}

          {/* 1689 Federalism — top of top circle */}
          <text fontFamily={cinzel} fontSize="16" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="435" y="34">1689</tspan>
            <tspan x="435" dy="19">Federalism</tspan>
          </text>

          {/* Progressive Covenantalism — bottom-left */}
          <text fontFamily={cinzel} fontSize="12" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="130" y="566">Progressive</tspan>
            <tspan x="130" dy="15">Covenantalism</tspan>
          </text>

          {/* Westminster Covenant Theology — bottom-right */}
          <text fontFamily={cinzel} fontSize="12" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="740" y="566">Westminster</tspan>
            <tspan x="740" dy="15">Covenant Theology</tspan>
          </text>

          {/* 20th C. Reformed Baptist — bottom center */}
          <text fontFamily={cinzel} fontSize="11" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="435" y="590">20th C.</tspan>
            <tspan x="435" dy="14">Reformed Baptist</tspan>
          </text>

          {/* ════ EXCLUSIVE ZONES ════ */}

          {/* 1689 exclusive (top of 1689 circle, verified outside all others) */}
          <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
            <tspan x="435" y="88">{'• NC = first formal administration of CoG'}</tspan>
            <tspan x="435" dy="14">{'• OT covenants subservient,'}</tspan>
            <tspan x="435" dy="13">not administrations of CoG</tspan>
            <tspan x="435" dy="14">{'• CoG revealed but not formally'}</tspan>
            <tspan x="435" dy="13">established in the OT</tspan>
          </text>

          {/* Progressive exclusive (far left of Prog circle) */}
          <text fontFamily={garamond} fontSize="9.5" fill={cream} textAnchor="middle">
            <tspan x="90" y="405">{'• No CoG promised in OT'}</tspan>
            <tspan x="90" dy="14">{'• Covenant with Adam'}</tspan>
            <tspan x="90" dy="13">not a CoW per se</tspan>
            <tspan x="90" dy="14">{'• Law = old covenant'}</tspan>
          </text>

          {/* Westminster exclusive (far right of West circle) */}
          <text fontFamily={garamond} fontSize="9.5" fill={cream} textAnchor="middle">
            <tspan x="775" y="405">{'• Paedobaptism'}</tspan>
            <tspan x="775" dy="14">{'• CoG administered'}</tspan>
            <tspan x="775" dy="13">since Gen 3:15</tspan>
            <tspan x="775" dy="14">{'• One covenant'}</tspan>
            <tspan x="775" dy="13">with Abraham</tspan>
          </text>

          {/* 20th C RB exclusive (bottom of 20th C RB circle) */}
          <text fontFamily={garamond} fontSize="9.5" fill={cream} textAnchor="middle">
            <tspan x="435" y="535">{'• CoG begins at Gen 3:15'}</tspan>
            <tspan x="435" dy="14">{'• Perpetuity of Moral Law'}</tspan>
          </text>

          {/* ════ OVERLAP ZONES ════ */}

          {/* 1689 ∩ Prog ONLY — top-left sliver (verified: outside 20th C RB and West) */}
          <text fontFamily={garamond} fontSize="9" fontWeight="600" fill={cream} textAnchor="middle">
            <tspan x="295" y="295">Each covenant</tspan>
            <tspan x="295" dy="12">truly distinct</tspan>
          </text>

          {/* 1689 ∩ West ONLY — top-right sliver */}
          {/* (small zone; CoW/CoG moved to 3-way zone below) */}

          {/* 1689 ∩ 20th C RB — center vertical band (verified: outside Prog and West) */}
          <text fontFamily={garamond} fontSize="9.5" fontStyle="italic" fill={cream} textAnchor="middle">
            <tspan x="435" y="308">CoG progressively revealed</tspan>
            <tspan x="435" dy="13">CoG fulfilled in the NC</tspan>
            <tspan x="435" dy="13">Scripture by way of covenant</tspan>
          </text>

          {/* 1689 ∩ Prog ∩ 20th C RB — 3-way left zone (verified ~370, 360) */}
          <text fontFamily={garamond} fontSize="9.5" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="368" y="358">Believers'</tspan>
            <tspan x="368" dy="12">Baptism</tspan>
          </text>

          {/* 1689 ∩ West ∩ 20th C RB — 3-way right zone (verified ~500, 360) */}
          <text fontFamily={garamond} fontSize="9.5" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="502" y="354">Covenant</tspan>
            <tspan x="502" dy="12">of works</tspan>
            <tspan x="502" dy="12">Covenant</tspan>
            <tspan x="502" dy="12">of grace</tspan>
          </text>

          {/* West ∩ 20th C RB — bottom-right 2-way (verified ~575, 490) */}
          <text fontFamily={garamond} fontSize="9.5" fontWeight="600" fill={cream} textAnchor="middle">
            <tspan x="577" y="484">OT covenants =</tspan>
            <tspan x="577" dy="13">admin. of CoG</tspan>
          </text>

        </svg>

        <p className="fed-infographic-footer" style={{ marginTop: '0.5rem' }}>
          Adapted from 1689federalism.com · Progressive ↔ Westminster share no overlap zone
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
    a: 'Promised and revealed in the OT from Gen 3:15; formally established only in the New Covenant',
    b: 'No covenant of grace promised in the Old Testament',
    c: 'Covenant of grace made and administered from Gen 3:15 onward',
    d: 'Covenant of grace begins at Gen 3:15; progressively revealed throughout the OT',
  },
  {
    topic: 'Old covenants (Abrahamic, Mosaic, Davidic)',
    a: 'Distinct, subservient covenants in their own right — not administrations of the covenant of grace',
    b: 'Progressive unfolding of redemption; Law and old covenant are identified together',
    c: 'Administrations of the one covenant of grace',
    d: 'Administrations of the covenant of grace',
  },
  {
    topic: 'New Covenant',
    a: 'The first and only formal administration of the covenant of grace; the NC is the covenant of grace',
    b: 'Inaugurates a decisively new redemptive-historical era; all members know the Lord',
    c: 'The fullest administration of the one covenant of grace; visible church remains mixed',
    d: 'The covenant of grace is fulfilled and fully administered in the New Covenant',
  },
  {
    topic: 'CoG revealed vs. established',
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
    d: 'An administration of the covenant of grace',
  },
  {
    topic: 'Baptism',
    a: 'Believers\' baptism only — NC members are regenerate; no basis for paedobaptism',
    b: 'Believers\' baptism only',
    c: 'Paedobaptism — children of believers included in the covenant of grace',
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
