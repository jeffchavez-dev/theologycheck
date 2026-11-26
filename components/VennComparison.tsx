import React from 'react'

// ── Layout (verified zone positions)
// 1689:      cx=435 cy=205 r=195
// Prog:      cx=205 cy=450 r=195
// West:      cx=665 cy=450 r=195
// 20th C RB: cx=435 cy=530 r=185
//
// Overlaps that exist:
//  1689 ↔ Prog   : d=336  overlap≈54px
//  1689 ↔ West   : d=336  overlap≈54px
//  1689 ↔ 20thCRB: d=325  overlap≈55px
//  Prog ↔ 20thCRB: d=244  overlap≈136px
//  West ↔ 20thCRB: d=244  overlap≈136px
//  Prog ↔ West   : d=460  NO overlap (theologically accurate)

const cream  = '#f5ede0'
const cinzel  = "Cinzel, Georgia, serif"
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
        <h2 className="fed-infographic-title">Four Covenant Traditions Compared</h2>

        <svg
          viewBox="0 0 870 740"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 870, display: 'block', margin: '1.25rem auto 0', height: 'auto' }}
          aria-label="Venn diagram comparing four covenant traditions"
        >
          {/* ── CIRCLES: draw order back→front: West, Prog, 20thCRB, 1689 ── */}
          <circle cx="665" cy="450" r="195" fill="#0e1a2d" />   {/* Westminster — navy  */}
          <circle cx="205" cy="450" r="195" fill="#0e2d1a" />   {/* Progressive  — green */}
          <circle cx="435" cy="530" r="185" fill="#1a0e28" />   {/* 20th C RB    — indigo */}
          <circle cx="435" cy="205" r="195" fill="#2d1808" />   {/* 1689         — sepia  */}

          {/* ── SYSTEM TITLES ── */}

          {/* 1689 Federalism */}
          <text fontFamily={cinzel} fontSize="16" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="435" y="30">1689</tspan>
            <tspan x="435" dy="19">Federalism</tspan>
          </text>

          {/* Progressive Covenantalism */}
          <text fontFamily={cinzel} fontSize="11" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="120" y="596">Progressive</tspan>
            <tspan x="120" dy="14">Covenantalism</tspan>
          </text>

          {/* Westminster Covenant Theology */}
          <text fontFamily={cinzel} fontSize="11" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="748" y="596">Westminster</tspan>
            <tspan x="748" dy="14">Covenant Theology</tspan>
          </text>

          {/* 20th C. Reformed Baptist */}
          <text fontFamily={cinzel} fontSize="11" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="435" y="668">20th C.</tspan>
            <tspan x="435" dy="14">Reformed Baptist</tspan>
          </text>

          {/* ── EXCLUSIVE ZONE CONTENT ── */}

          {/* 1689 exclusive — top of 1689 circle (outside Prog, West, 20thCRB) */}
          <text fontFamily={garamond} fontSize="9.5" fill={cream} textAnchor="middle">
            <tspan x="435" y="72">• NC = first formal administration of CoG</tspan>
            <tspan x="435" dy="13">• OT covenants subservient,</tspan>
            <tspan x="435" dy="12">not administrations of CoG</tspan>
            <tspan x="435" dy="13">• CoG revealed but not formally</tspan>
            <tspan x="435" dy="12">established in the OT</tspan>
          </text>

          {/* Progressive exclusive — far left (outside all others) */}
          <text fontFamily={garamond} fontSize="9" fill={cream} textAnchor="middle">
            <tspan x="78" y="425">• No CoG promised in OT</tspan>
            <tspan x="78" dy="13">• Covenant with Adam</tspan>
            <tspan x="78" dy="12">not a CoW per se</tspan>
            <tspan x="78" dy="13">• Law = old covenant</tspan>
          </text>

          {/* Westminster exclusive — far right */}
          <text fontFamily={garamond} fontSize="9" fill={cream} textAnchor="middle">
            <tspan x="790" y="425">• Paedobaptism</tspan>
            <tspan x="790" dy="13">• CoG administered</tspan>
            <tspan x="790" dy="12">since Gen 3:15</tspan>
            <tspan x="790" dy="13">• One covenant</tspan>
            <tspan x="790" dy="12">with Abraham</tspan>
          </text>

          {/* 20th C RB exclusive — bottom (outside 1689, Prog, West) */}
          <text fontFamily={garamond} fontSize="9.5" fill={cream} textAnchor="middle">
            <tspan x="435" y="650">• CoG begins at Gen 3:15</tspan>
            <tspan x="435" dy="13">• Perpetuity of Moral Law</tspan>
          </text>

          {/* ── 2-WAY OVERLAP ZONES ── */}

          {/* 1689 ∩ Progressive ONLY — top-left sliver (outside 20thCRB, West) */}
          <text fontFamily={garamond} fontSize="8.5" fontWeight="600" fill={cream} textAnchor="middle">
            <tspan x="284" y="291">Each covenant</tspan>
            <tspan x="284" dy="11">truly distinct</tspan>
          </text>

          {/* 1689 ∩ Westminster ONLY — top-right sliver (outside 20thCRB, Prog) */}
          {/* Small zone — CoW/CoG belong in 3-way zone below */}

          {/* 1689 ∩ 20th C RB — center vertical band (outside Prog, West) */}
          <text fontFamily={garamond} fontSize="9.5" fontStyle="italic" fill={cream} textAnchor="middle">
            <tspan x="435" y="308">CoG progressively revealed in OT</tspan>
            <tspan x="435" dy="13">CoG fulfilled in the New Covenant</tspan>
            <tspan x="435" dy="13">Scripture organized by covenant</tspan>
          </text>

          {/* Progressive ∩ 20th C RB — bottom-left (outside 1689, West) */}
          {/* Content in 3-way zone below */}

          {/* Westminster ∩ 20th C RB — bottom-right (outside 1689, Prog) */}
          <text fontFamily={garamond} fontSize="9.5" fontWeight="600" fill={cream} textAnchor="middle">
            <tspan x="566" y="514">OT covenants =</tspan>
            <tspan x="566" dy="13">admin. of CoG</tspan>
          </text>

          {/* ── 3-WAY OVERLAP ZONES ── */}

          {/* 1689 ∩ Progressive ∩ 20th C RB — Believers' Baptism */}
          <text fontFamily={garamond} fontSize="9" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="389" y="386">Believers'</tspan>
            <tspan x="389" dy="12">Baptism</tspan>
          </text>

          {/* 1689 ∩ Westminster ∩ 20th C RB — Covenant of works / Covenant of grace */}
          <text fontFamily={garamond} fontSize="9" fontWeight="700" fill={cream} textAnchor="middle">
            <tspan x="481" y="383">Covenant of works</tspan>
            <tspan x="481" dy="12">Covenant of grace</tspan>
          </text>

        </svg>

        <p className="fed-infographic-footer" style={{ marginTop: '0.5rem' }}>
          Adapted from 1689federalism.com · Progressive ↔ Westminster share no overlap
        </p>
      </section>

      {/* ── Comparison table ── */}
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
    a: "Believers' baptism only — NC members are regenerate; no basis for paedobaptism",
    b: "Believers' baptism only",
    c: 'Paedobaptism — children of believers included in the covenant of grace',
    d: "Believers' baptism only — despite holding that the OT covenants are CoG administrations",
  },
  {
    topic: 'Perpetuity of moral law',
    a: 'Threefold distinction upheld; moral law is perpetually binding',
    b: 'Skeptical of the threefold distinction; law functions differently across redemptive history',
    c: 'Threefold distinction upheld; moral law (including Sabbath) perpetually binding',
    d: 'Perpetuity of the moral law affirmed; threefold distinction upheld',
  },
  {
    topic: "Scripture's organizing principle",
    a: 'Scripture is organized by way of covenant',
    b: 'Scripture is organized by way of covenant',
    c: 'Scripture is organized by way of covenant',
    d: 'Scripture is organized by way of covenant',
  },
]
