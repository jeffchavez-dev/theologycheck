const cream = '#f5ede0'
const cinzel = "Cinzel, Georgia, serif"
const garamond = "'EB Garamond', Georgia, serif"

export default function VennComparison() {
  return (
    <section className="fed-infographic-section">
      <h2 className="fed-infographic-title">Three Covenant Traditions Compared</h2>
      <svg
        viewBox="0 0 820 670"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 820, display: 'block', margin: '1.25rem auto 0', height: 'auto' }}
        aria-label="Venn diagram comparing 1689 Federalism, Progressive Covenantalism, and Westminster Covenant Theology"
      >
        {/* Draw order: Westminster (back), Progressive, 1689 (front) */}
        <circle cx="560" cy="445" r="186" fill="#0e1a2d" />
        <circle cx="260" cy="445" r="186" fill="#0e2d1a" />
        <circle cx="410" cy="200" r="186" fill="#2d1808" />

        {/* ── 1689 Federalism title ── */}
        <text fontFamily={cinzel} fontSize="17" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="410" y="27">1689</tspan>
          <tspan x="410" dy="20">Federalism</tspan>
        </text>

        {/* 1689 left bullets */}
        <text fontFamily={garamond} fontSize="10.5" fill={cream} textAnchor="middle">
          <tspan x="330" y="72">{'• Two covenants in Abraham:'}</tspan>
          <tspan x="330" dy="13">circumcision and grace</tspan>
          <tspan x="330" dy="19">{'• Covenant of grace promised'}</tspan>
          <tspan x="330" dy="13">to, not made, with Abraham</tspan>
        </text>

        {/* 1689 right bullets */}
        <text fontFamily={garamond} fontSize="10.5" fill={cream} textAnchor="middle">
          <tspan x="490" y="72">{'• Circumcision covenant and'}</tspan>
          <tspan x="490" dy="13">grace covenant are distinct</tspan>
          <tspan x="490" dy="19">{'• Circumcision covenant is'}</tspan>
          <tspan x="490" dy="13">{'a "covenant of works"'}</tspan>
        </text>

        {/* ── Left overlap: 1689 ∩ Progressive ── */}
        <text fontFamily={garamond} fontSize="10.5" fontWeight="600" fill={cream} textAnchor="middle">
          <tspan x="316" y="308">Covenant made with Adam</tspan>
          <tspan x="316" dy="15">Each covenant is truly</tspan>
          <tspan x="316" dy="13">distinct from the other</tspan>
        </text>

        {/* ── Right overlap: 1689 ∩ Westminster ── */}
        <text fontFamily={garamond} fontSize="10.5" fontWeight="600" fill={cream} textAnchor="middle">
          <tspan x="504" y="308">Covenant of works</tspan>
          <tspan x="504" dy="15">Covenant of grace</tspan>
        </text>

        {/* ── Center: all three ── */}
        <text fontFamily={garamond} fontSize="10" fontStyle="italic" fill={cream} textAnchor="middle">
          <tspan x="410" y="348">Scripture organized</tspan>
          <tspan x="410" dy="13">by way of covenant</tspan>
        </text>

        {/* ── Progressive Covenantalism bullets ── */}
        <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
          <tspan x="162" y="467">{'• Covenant with Adam not a'}</tspan>
          <tspan x="162" dy="13">covenant of works per se</tspan>
          <tspan x="162" dy="18">{'• No covenant of grace'}</tspan>
          <tspan x="162" dy="13">promised in the OT</tspan>
          <tspan x="162" dy="18">{'• The Law and the old'}</tspan>
          <tspan x="162" dy="13">covenant are identified</tspan>
        </text>

        {/* Progressive Covenantalism title */}
        <text fontFamily={cinzel} fontSize="13" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="162" y="563">Progressive</tspan>
          <tspan x="162" dy="16">Covenantalism</tspan>
        </text>

        {/* ── Westminster Covenant Theology bullets ── */}
        <text fontFamily={garamond} fontSize="10" fill={cream} textAnchor="middle">
          <tspan x="656" y="455">{'• One covenant with Abraham'}</tspan>
          <tspan x="656" dy="18">{'• Covenant of grace in'}</tspan>
          <tspan x="656" dy="13">the garden (Gen 3:15)</tspan>
          <tspan x="656" dy="18">{'• Circumcision = administration'}</tspan>
          <tspan x="656" dy="13">of the covenant of grace</tspan>
          <tspan x="656" dy="18">{'• Circumcision = covenant'}</tspan>
          <tspan x="656" dy="13">of grace</tspan>
        </text>

        {/* Westminster Covenant Theology title */}
        <text fontFamily={cinzel} fontSize="13" fontWeight="700" fill={cream} textAnchor="middle">
          <tspan x="656" y="563">Westminster</tspan>
          <tspan x="656" dy="16">Covenant Theology</tspan>
        </text>

      </svg>

      <p className="fed-infographic-footer" style={{ marginTop: '0.5rem' }}>
        Adapted from 1689federalism.com
      </p>
    </section>
  )
}
