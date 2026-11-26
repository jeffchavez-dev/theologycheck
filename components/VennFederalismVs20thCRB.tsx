import React from 'react'

// 1689: cx=215 cy=220 r=185
// 20th C RB: cx=485 cy=220 r=185
// distance=270, overlap=100px

const cream   = '#f5ede0'
const cinzel  = "Cinzel, Georgia, serif"
const garamond = "'EB Garamond', Georgia, serif"

export default function VennFederalismVs20thCRB() {
  return (
    <section className="fed-infographic-section">
      <h2 className="fed-infographic-title">1689 Federalism &amp; 20th C. Reformed Baptist — Compared</h2>

      <svg
        viewBox="0 0 700 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 700, display: 'block', margin: '1.25rem auto 0', height: 'auto' }}
        aria-label="Venn diagram comparing 1689 Federalism and 20th Century Reformed Baptist"
      >
        {/* ── CIRCLES ── */}
        <circle cx="215" cy="230" r="185" fill="#2d1808" />   {/* 1689 — dark sepia   */}
        <circle cx="485" cy="230" r="185" fill="#1a0e28" />   {/* 20th C RB — indigo  */}

        {/* ── TITLES ── */}
        <text fontFamily={cinzel} fontSize="15" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="120" y="50">1689</tspan>
          <tspan x="120" dy="18">Federalism</tspan>
        </text>
        <text fontFamily={cinzel} fontSize="13" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="580" y="50">20th C.</tspan>
          <tspan x="580" dy="17">Reformed</tspan>
          <tspan x="580" dy="16">Baptist</tspan>
        </text>

        {/* ── LEFT EXCLUSIVE: 1689 unique ── */}
        <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
          <tspan x="145" y="155">• NC = first formal</tspan>
          <tspan x="145" dy="14">administration of CoG</tspan>
          <tspan x="145" dy="17">• OT covenants subservient;</tspan>
          <tspan x="145" dy="13">NOT administrations of CoG</tspan>
          <tspan x="145" dy="17">• CoG revealed but NOT</tspan>
          <tspan x="145" dy="13">formally established in OT</tspan>
          <tspan x="145" dy="17">• Mosaic covenant = national</tspan>
          <tspan x="145" dy="13">covenant of works for Israel</tspan>
        </text>

        {/* ── OVERLAP ZONE: shared positions ── */}
        <text fontFamily={garamond} fontSize="9.5" fontStyle="italic" fill={cream} textAnchor="middle">
          <tspan x="350" y="150">CoG progressively</tspan>
          <tspan x="350" dy="14">revealed in OT</tspan>
        </text>
        <text fontFamily={garamond} fontSize="9.5" fontStyle="italic" fill={cream} textAnchor="middle">
          <tspan x="350" y="195">CoG fulfilled</tspan>
          <tspan x="350" dy="13">in New Covenant</tspan>
        </text>
        <text fontFamily={garamond} fontSize="9.5" fontStyle="italic" fill={cream} textAnchor="middle">
          <tspan x="350" y="236">Scripture organized</tspan>
          <tspan x="350" dy="13">by covenant</tspan>
        </text>
        <text fontFamily={garamond} fontSize="9.5" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="350" y="278">Believers'</tspan>
          <tspan x="350" dy="13">Baptism</tspan>
        </text>
        <text fontFamily={garamond} fontSize="9.5" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="350" y="318">Covenant of works</tspan>
          <tspan x="350" dy="13">Covenant of grace</tspan>
        </text>

        {/* ── RIGHT EXCLUSIVE: 20th C RB unique ── */}
        <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
          <tspan x="556" y="155">• CoG begins at Gen 3:15</tspan>
          <tspan x="556" dy="17">• Perpetuity of Moral Law</tspan>
          <tspan x="556" dy="17">• OT covenants =</tspan>
          <tspan x="556" dy="13">administrations of CoG</tspan>
          <tspan x="556" dy="17">• Uses WCF framework</tspan>
          <tspan x="556" dy="13">but rejects paedobaptism</tspan>
        </text>

        {/* ── FOOTER LABEL ── */}
        <text fontFamily={garamond} fontSize="10" fontStyle="italic" fill="#c8b090" textAnchor="middle">
          <tspan x="350" y="470">Key difference: 1689 Federalism denies OT covenants are administrations of the CoG</tspan>
        </text>
      </svg>
    </section>
  )
}
