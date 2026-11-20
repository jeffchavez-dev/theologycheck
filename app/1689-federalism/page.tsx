import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'
import DownloadDiagram from '@/components/DownloadDiagram'

export const metadata: Metadata = {
  title: '1689 Federalism',
  description: 'An introduction to 1689 Federalism and the Particular Baptist understanding of the biblical covenants, with key infographics and articles.',
}

const timelineNodes = [
  { x: 62,  label: 'Fall',    ref: 'Gen 3:15'  },
  { x: 212, label: 'Abraham', ref: 'Gen 12/15' },
  { x: 362, label: 'Moses',   ref: 'Ex 19'     },
  { x: 512, label: 'David',   ref: '2 Sam 7'   },
]

const ncPromises = [
  { ref: 'Heb 8:10a', quote: '"I will put my laws into their minds, and write them on their hearts"', note: 'Internal transformation: not an external code but inward obedience' },
  { ref: 'Heb 8:10b', quote: '"I will be their God, and they shall be my people"', note: 'Covenant union: personal, unbreakable, already accomplished' },
  { ref: 'Heb 8:11',  quote: '"They shall all know me, from the least of them to the greatest"', note: 'Universal knowledge: no mediator required between members' },
  { ref: 'Heb 8:12',  quote: '"I will be merciful toward their iniquities, and I will remember their sins no more"', note: 'Full and final forgiveness: not typified, but accomplished' },
]

const subForm = [
  { text: '"Do this and live" sanctions', ref: 'Ex 19:5' },
  { text: 'National blessings and curses', ref: 'Deut 28' },
  { text: 'Could be, and was, broken', ref: 'Jer 31:32' },
  { text: 'Ministration of condemnation', ref: '2 Cor 3:9' },
]

const subPurpose = [
  { text: 'Handmaid to the Covenant of Grace', ref: 'Coxe' },
  { text: 'Shadow of the heavenly substance', ref: 'Col 2:17' },
  { text: 'Schoolmaster to lead to Christ', ref: 'Gal 3:24' },
  { text: 'Frame for Christ born under the law', ref: 'Gal 4:4' },
]

// Diagram 4 — Westminster vs 1689
const wm1689Subs = [
  { name: 'Abrahamic', ref: 'Gen 15 · 17', y: 28 },
  { name: 'Mosaic',    ref: 'Ex 19 · Deut', y: 80 },
  { name: 'Davidic',  ref: '2 Sam 7',      y: 132 },
]

// Diagram 5 — Covenant membership
const oldCovFeatures = [
  { text: 'Entry by circumcision, a physical, outward sign', ref: 'Gen 17:12' },
  { text: 'Mixed membership: regenerate and unregenerate together', ref: 'Rom 9:6–7' },
  { text: 'National and ethnic: the people of Israel', ref: 'Ex 19:5' },
  { text: 'Law on stone tablets, imposed externally', ref: 'Ex 31:18' },
  { text: 'Many members did not personally know the Lord', ref: 'Jer 31:34' },
]
const newCovFeatures = [
  { text: 'Entry by faith and profession, sealed in baptism', ref: 'Acts 2:38' },
  { text: 'Regenerate only: all members truly know the Lord', ref: 'Heb 8:11' },
  { text: 'All nations: no ethnic boundary', ref: 'Gal 3:28' },
  { text: 'Law on the heart: inward transformation', ref: 'Heb 8:10' },
  { text: '"They shall all know me, from least to greatest"', ref: 'Jer 31:34' },
]

// Diagram 6 — Covenant capabilities
const covenantCapabilities = [
  {
    name: 'Abrahamic',
    ref: 'Gen 15 · 17',
    gave: [
      'Promised seed, land, and blessing to Abraham',
      'Foundation of the nation of Israel',
      'Circumcision as the sign of national covenant membership',
    ],
    limit: [
      'Could not secure eternal inheritance by circumcision',
      'Did not justify; faith counted Abraham as righteous (Gen 15:6)',
    ],
    points: 'Christ as the true Seed in whom all nations are blessed (Gal 3:16)',
  },
  {
    name: 'Mosaic',
    ref: 'Ex 19 · Deut',
    gave: [
      'National law governing Israel\'s life in Canaan',
      'A sacrificial system of types and shadows pointing forward',
      'The legal frame for the second Adam to be born under the law',
    ],
    limit: [
      'Could not give life: the law is not of faith (Gal 3:21)',
      'Could not write the law on the heart or finally forgive (Heb 10:1–4)',
    ],
    points: 'Christ born under the law to redeem those under it: the Mosaic typified the terms he would fulfill in the Covenant of Redemption (Gal 4:4; Rom 8:3–4)',
  },
  {
    name: 'Davidic',
    ref: '2 Sam 7 · Ps 89',
    gave: [
      'Promise of an eternal throne for the line of David',
      'A royal dynasty typifying the coming eternal King',
      'The hope of a Son whose kingdom would have no end',
    ],
    limit: [
      'Could not secure an eternal kingdom through any earthly son',
      'Every king in the line eventually died; the throne could not hold',
    ],
    points: 'Christ as the eternal Son of David, reigning forever (Luke 1:32–33)',
  },
]

export default function FederalismPage() {
  const posts = getAllPosts().filter(p => p.tags.includes('1689 Federalism'))

  return (
    <div className="fed-page-wrap">
      <div className="study-page-header">
        <div className="section-label">1689 Federalism</div>
        <h1 className="study-book-title">Particular Baptist Covenant Theology</h1>
        <p className="study-book-subtitle">
          What the Particular Baptists believed about the biblical covenants, why it matters, and how Scripture drives every conclusion.
        </p>
      </div>

      <p className="fed-page-intro">
        I hold with the Particular Baptists that the New Covenant <em>is</em> the Covenant of Grace, not merely its final administration. The Old Testament covenants were real and distinct, but subservient: they revealed and anticipated the covenant that Christ would enact. This is not a retrieval project. It is a way of reading Scripture.
      </p>

      {/* ── Diagram 1: Covenant Timeline ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">One Covenant of Grace, Revealed by Farther Steps</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">John Owen <em>· Hebrews Commentary, 1680</em></span>
          <span className="fed-figure-chip">Edward Hutchinson <em>· Particular Baptist, 1676</em></span>
        </div>
        <p className="fed-infographic-desc">
          The substance of the Covenant of Grace (Christ) is present from Genesis 3:15. But a promise is not yet a covenant. The Old Testament covenants reveal and anticipate. The New Covenant <em>enacts</em>. John Owen and Edward Hutchinson both argued from the Greek of Hebrews 8:6: the New Covenant was <em>νενομοθέτηται</em>: legislated, ratified, brought formally into force.
        </p>

        <div className="fed-svg-wrap" id="diagram-timeline">
          <svg viewBox="0 0 900 190" xmlns="http://www.w3.org/2000/svg" className="fed-timeline-svg" aria-label="Covenant timeline from Fall to New Covenant">
            {/* Dashed promise track */}
            <line x1="62" y1="90" x2="556" y2="90" strokeDasharray="7 4" strokeWidth="2" className="fed-svg-dashed" />
            {/* Solid enacted track */}
            <line x1="556" y1="90" x2="808" y2="90" strokeWidth="2.5" className="fed-svg-solid" />
            {/* Arrowhead */}
            <polygon points="820,90 806,83 806,97" className="fed-svg-arrowhead" />

            {/* Promise nodes */}
            {timelineNodes.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy="90" r="8" className="fed-svg-promise-node" />
                <text x={n.x} y="73" textAnchor="middle" className="fed-svg-node-label">{n.label}</text>
                <text x={n.x} y="110" textAnchor="middle" className="fed-svg-node-ref">{n.ref}</text>
              </g>
            ))}

            {/* New Covenant node */}
            <circle cx="820" cy="90" r="12" className="fed-svg-nc-node" />
            <circle cx="820" cy="90" r="20" fill="none" strokeWidth="1.5" strokeOpacity="0.3" className="fed-svg-nc-ring" />
            <text x="820" y="58" textAnchor="middle" className="fed-svg-nc-label">New Covenant</text>
            <text x="820" y="44" textAnchor="middle" className="fed-svg-node-ref">Jer 31 / Heb 8</text>
            <text x="820" y="118" textAnchor="middle" className="fed-svg-nc-greek">νενομοθέτηται</text>
            <text x="820" y="134" textAnchor="middle" className="fed-svg-nc-enacted">— enacted —</text>

            {/* Legend */}
            <line x1="48" y1="168" x2="82" y2="168" strokeDasharray="6 3" strokeWidth="1.5" className="fed-svg-dashed" />
            <text x="90" y="172" className="fed-svg-legend">Promise Revealed</text>
            <line x1="262" y1="168" x2="296" y2="168" strokeWidth="2" className="fed-svg-solid" />
            <text x="304" y="172" className="fed-svg-legend">Covenant Enacted</text>
          </svg>
        </div>
        <DownloadDiagram targetId="diagram-timeline" filename="covenant-timeline" />
      </section>

      {/* ── Diagram 2: NC = CoG ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">The New Covenant Is the Covenant of Grace</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">Hercules Collins <em>· 1689 LBCF Signer</em></span>
          <span className="fed-figure-chip">Thomas Patient <em>· Particular Baptist, c. 1654</em></span>
        </div>
        <p className="fed-infographic-desc">
          Hebrews 8:10–12, quoting Jeremiah 31:33–34, gives the definition of the New Covenant. These four promises are what the Covenant of Grace <em>is</em>. I find it remarkable that the Particular Baptists grounded this equation not in a bare assertion but in a close reading of this single passage. The identification is exegetical through and through.
        </p>

        <div className="fed-def-diagram" id="diagram-nc-cog">
          <div className="fed-def-header">
            <span className="fed-def-header-ref">Hebrews 8:10–12</span>
            <span className="fed-def-header-eq">defines</span>
            <span className="fed-def-header-claim">the Covenant of Grace</span>
          </div>
          <div className="fed-def-arrow-down">↓</div>
          <div className="fed-nc-grid">
            {ncPromises.map((p, i) => (
              <div key={i} className="fed-nc-card">
                <div className="fed-nc-ref">{p.ref}</div>
                <blockquote className="fed-nc-quote">{p.quote}</blockquote>
                <p className="fed-nc-note">{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="fed-infographic-footer">
          "Let us give a Definition of the Covenant of Grace… The Sum of this Covenant we have in Heb. 8. 10, 11, 12." — Hercules Collins (1695)
        </p>
        <DownloadDiagram targetId="diagram-nc-cog" filename="new-covenant-covenant-of-grace" />
      </section>

      {/* ── Diagram 3: Subservient Covenant ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">The Mosaic Covenant: Subservient, Not Identical</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">John Cameron <em>· coined foedus subserviens, 1608</em></span>
          <span className="fed-figure-chip">Nehemiah Coxe <em>· Particular Baptist, 1681</em></span>
          <span className="fed-figure-chip">Samuel Renihan <em>· 1689 Federalist, 2019</em></span>
        </div>
        <p className="fed-infographic-desc">
          The Mosaic Covenant has a works-structure (<em>do this and live</em>), but it is neither the original Covenant of Works nor the Covenant of Grace. It is a third thing: the <em>foedus subserviens</em>. Works-featured in form; grace-serving in purpose. This distinction, I am convinced, is one of the most clarifying contributions of the Particular Baptist tradition to Reformed covenant theology.
        </p>

        <blockquote className="fed-infographic-pullquote">
          "A subserviency in any thing to promote the ends of something else, does not make it to be the thing itself; the ends whereof are promoted thereby." — Philip Cary, <em>A Solemn Call</em> (1690)
        </blockquote>

        <div className="fed-rel-diagram" id="diagram-subservient">
          {/* Three-box relationship row */}
          <div className="fed-rel-row">
            <div className="fed-rel-box fed-rel-box--left">
              <div className="fed-rel-box-title">Covenant of Works</div>
              <div className="fed-rel-box-sub">Adam · Eden</div>
            </div>
            <div className="fed-rel-connector">
              <div className="fed-rel-conn-label">shares form</div>
              <div className="fed-rel-conn-line" />
              <div className="fed-rel-conn-arrow">›</div>
            </div>
            <div className="fed-rel-box fed-rel-box--center">
              <div className="fed-rel-box-title">Mosaic Covenant</div>
              <div className="fed-rel-box-latin">foedus subserviens</div>
              <div className="fed-rel-box-sub">Sinai · Ex 19</div>
            </div>
            <div className="fed-rel-connector">
              <div className="fed-rel-conn-label">serves purpose</div>
              <div className="fed-rel-conn-line" />
              <div className="fed-rel-conn-arrow">›</div>
            </div>
            <div className="fed-rel-box fed-rel-box--right">
              <div className="fed-rel-box-title">Covenant of Grace</div>
              <div className="fed-rel-box-sub">New Covenant · Jer 31</div>
            </div>
          </div>

          {/* Form / Purpose detail rows */}
          <div className="fed-rel-detail">
            <div className="fed-rel-col fed-rel-col--form">
              <div className="fed-rel-col-head">In Form</div>
              <ul>
                {subForm.map((item, i) => (
                  <li key={i}>{item.text} <span className="fed-sub-ref">{item.ref}</span></li>
                ))}
              </ul>
            </div>
            <div className="fed-rel-col-sep" />
            <div className="fed-rel-col fed-rel-col--purpose">
              <div className="fed-rel-col-head">In Purpose</div>
              <ul>
                {subPurpose.map((item, i) => (
                  <li key={i}>{item.text} <span className="fed-sub-ref">{item.ref}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="fed-infographic-footer">
          "The former was added and made subservient to the latter's great ends… which was designed by God only to be a handmaid to it." — Nehemiah Coxe
        </p>
        <DownloadDiagram targetId="diagram-subservient" filename="mosaic-subservient-covenant" />
      </section>

      {/* ── Diagram 4: Westminster vs 1689 ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Westminster vs. 1689: Two Models of Covenant</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">Westminster Confession <em>· 1647</em></span>
          <span className="fed-figure-chip">1689 London Baptist Confession <em>· 1689</em></span>
        </div>
        <p className="fed-infographic-desc">
          Both traditions confess one Covenant of Grace. The difference is structural. Westminster sees the Old and New Testaments as two administrations of a single covenant. 1689 Federalism sees the Old Testament covenants as distinct and subservient: real covenants in their own right, each designed to serve the one Covenant of Grace that Christ would formally enact in the New Covenant.
        </p>
        <div className="fed-compare-svg-wrap" id="diagram-comparison">
          <svg viewBox="0 0 820 215" xmlns="http://www.w3.org/2000/svg" className="fed-compare-svg" aria-label="Diagram comparing Westminster and 1689 covenant models">
            {/* ── LEFT: Westminster ── */}
            <text x="195" y="18" textAnchor="middle" className="fed-cmp-heading">Westminster Federalism</text>
            <rect x="45" y="28" width="300" height="42" rx="4" className="fed-cmp-cog-rect" />
            <text x="195" y="46" textAnchor="middle" className="fed-cmp-cog-label">Covenant of Grace</text>
            <text x="195" y="62" textAnchor="middle" className="fed-cmp-cog-sub">one covenant</text>
            {/* Fork down */}
            <line x1="195" y1="70" x2="195" y2="86" className="fed-svg-solid" strokeWidth="1.5" />
            <line x1="118" y1="86" x2="272" y2="86" className="fed-svg-solid" strokeWidth="1.5" />
            <line x1="118" y1="86" x2="118" y2="100" className="fed-svg-solid" strokeWidth="1.5" />
            <line x1="272" y1="86" x2="272" y2="100" className="fed-svg-solid" strokeWidth="1.5" />
            {/* OT Admin */}
            <rect x="48" y="100" width="140" height="58" rx="4" className="fed-cmp-admin-rect" />
            <text x="118" y="122" textAnchor="middle" className="fed-cmp-admin-label">Old Testament</text>
            <text x="118" y="136" textAnchor="middle" className="fed-cmp-admin-sub">Administration</text>
            <text x="118" y="150" textAnchor="middle" className="fed-cmp-admin-ref">Gen – Mal</text>
            {/* NT Admin */}
            <rect x="202" y="100" width="140" height="58" rx="4" className="fed-cmp-admin-rect" />
            <text x="272" y="122" textAnchor="middle" className="fed-cmp-admin-label">New Testament</text>
            <text x="272" y="136" textAnchor="middle" className="fed-cmp-admin-sub">Administration</text>
            <text x="272" y="150" textAnchor="middle" className="fed-cmp-admin-ref">Matt – Rev</text>
            <text x="195" y="186" textAnchor="middle" className="fed-cmp-caption">"one covenant, two forms"</text>

            {/* ── DIVIDER ── */}
            <line x1="405" y1="8" x2="405" y2="207" className="fed-cmp-divider" strokeDasharray="4 3" />

            {/* ── RIGHT: 1689 ── */}
            <text x="613" y="18" textAnchor="middle" className="fed-cmp-heading">1689 Federalism</text>
            {wm1689Subs.map((c, i) => (
              <g key={i}>
                <rect x="420" y={c.y} width="148" height="38" rx="4" className="fed-cmp-sub-rect" />
                <text x="494" y={c.y + 16} textAnchor="middle" className="fed-cmp-sub-label">{c.name}</text>
                <text x="494" y={c.y + 29} textAnchor="middle" className="fed-cmp-sub-ref">{c.ref}</text>
                <line x1="568" y1={c.y + 19} x2="594" y2={c.y + 19} className="fed-svg-dashed" strokeWidth="1.5" />
              </g>
            ))}
            {/* Vertical convergence bar + arrow */}
            <line x1="594" y1="47" x2="594" y2="151" className="fed-svg-dashed" strokeWidth="1.5" />
            <line x1="594" y1="99" x2="628" y2="99" className="fed-svg-solid" strokeWidth="2" />
            <polygon points="640,99 628,92 628,106" className="fed-svg-arrowhead" />
            {/* NC = CoG */}
            <rect x="642" y="69" width="158" height="60" rx="4" className="fed-cmp-nc-rect" />
            <text x="721" y="91" textAnchor="middle" className="fed-cmp-nc-main">New Covenant</text>
            <text x="721" y="107" textAnchor="middle" className="fed-cmp-nc-eq">= Covenant of Grace</text>
            <text x="721" y="121" textAnchor="middle" className="fed-cmp-nc-ref">Jer 31 · Heb 8</text>
            <text x="613" y="186" textAnchor="middle" className="fed-cmp-caption">"distinct covenants, one purpose"</text>
          </svg>
        </div>
        <DownloadDiagram targetId="diagram-comparison" filename="westminster-vs-1689-federalism" />
      </section>

      {/* ── Diagram 5: Covenant Membership ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Who Belongs? Old Covenant vs. New Covenant Membership</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">Nehemiah Coxe <em>· Discourse of the Covenants, 1681</em></span>
          <span className="fed-figure-chip">Benjamin Keach <em>· The Everlasting Covenant, 1693</em></span>
        </div>
        <p className="fed-infographic-desc">
          If the New Covenant is the Covenant of Grace itself and not merely its latest administration, then its membership is not national or ethnic but spiritual. This is one of the most practically significant implications of the 1689 Federalist reading: all who are in the New Covenant truly and personally know the Lord. The community of the New Covenant is therefore constituted differently from the community of the Old.
        </p>
        <div className="fed-mem-compare" id="diagram-membership">
          <div className="fed-mem-side fed-mem-side--old">
            <span className="fed-mem-head">Old Covenant</span>
            <span className="fed-mem-sign">Circumcision</span>
            <ul className="fed-mem-list">
              {oldCovFeatures.map((f, i) => (
                <li key={i} className="fed-mem-item">
                  <span className="fed-mem-text">{f.text}</span>
                  <span className="fed-mem-ref">{f.ref}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fed-mem-divider" />
          <div className="fed-mem-side fed-mem-side--new">
            <span className="fed-mem-head">New Covenant</span>
            <span className="fed-mem-sign">Baptism</span>
            <ul className="fed-mem-list">
              {newCovFeatures.map((f, i) => (
                <li key={i} className="fed-mem-item">
                  <span className="fed-mem-text">{f.text}</span>
                  <span className="fed-mem-ref">{f.ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="fed-infographic-footer">
          "The New Covenant is not like the old covenant which was made with Israel, that national church... It is a spiritual covenant, made only with the spiritual seed." — Benjamin Keach
        </p>
        <DownloadDiagram targetId="diagram-membership" filename="old-new-covenant-membership" />
      </section>

      {/* ── Diagram 6: Covenant Capabilities ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">What Each Covenant Could and Could Not Do</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">Nehemiah Coxe <em>· Discourse of the Covenants, 1681</em></span>
          <span className="fed-figure-chip">John Owen <em>· Hebrews Commentary, 1680</em></span>
        </div>
        <p className="fed-infographic-desc">
          Every Old Testament covenant gave something real. None gave everything. Each had a form suited to its purpose and a limitation that pointed beyond itself to Christ. This is precisely why the Particular Baptists called them subservient: not because they were false, but because they were temporary instruments designed to serve a greater covenant they could not themselves become.
        </p>
        <div className="fed-cap-grid" id="diagram-capabilities">
          {covenantCapabilities.map((cov, i) => (
            <div key={i} className="fed-cap-card">
              <div className="fed-cap-card-header">
                <span className="fed-cap-card-name">{cov.name}</span>
                <span className="fed-cap-card-ref">{cov.ref}</span>
              </div>
              <div className="fed-cap-section fed-cap-gave">
                <div className="fed-cap-section-head">Gave</div>
                <ul>{cov.gave.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </div>
              <div className="fed-cap-section fed-cap-limit">
                <div className="fed-cap-section-head">Could not</div>
                <ul>{cov.limit.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </div>
              <div className="fed-cap-points">
                <span className="fed-cap-points-label">Points to Christ</span>
                <span className="fed-cap-points-text">{cov.points}</span>
              </div>
            </div>
          ))}
        </div>
        <DownloadDiagram targetId="diagram-capabilities" filename="covenant-capabilities" />
      </section>

      {/* ── Study Guide ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Go Deeper</h2>
        <div className="fed-study-callout">
          <div className="fed-study-callout-label">Study Guide</div>
          <div className="fed-study-callout-title">The Mystery of Christ, His Covenant, and His Kingdom</div>
          <div className="fed-study-callout-author">Samuel D. Renihan</div>
          <p className="fed-study-callout-desc">
            The most accessible single-volume introduction to 1689 Federalism. Renihan traces the full covenantal structure of Scripture from creation to consummation, showing how the Particular Baptist reading differs from both Westminster and Baptist theology that follows the Westminster pattern. I have put together a chapter-by-chapter study guide for this book.
          </p>
          <Link href="/study/mystery-of-christ" className="fed-study-callout-link">Open Study Guide →</Link>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">Articles</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#8a6040', fontStyle: 'italic' }}>No posts yet.</p>
        ) : (
          <ul className="federalism-post-list">
            {posts.map(post => (
              <li key={post.slug} className="federalism-post-item">
                <span className="federalism-post-date">
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
                <Link href={`/blog/${post.slug}`} className="federalism-post-title">
                  {post.title}
                </Link>
                {post.excerpt && (
                  <p className="federalism-post-excerpt">{post.excerpt}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
