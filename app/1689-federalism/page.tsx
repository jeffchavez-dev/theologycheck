import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1689 Federalism',
  description: 'An introduction to 1689 Federalism and the Particular Baptist understanding of the biblical covenants — with key infographics and articles.',
}

const timelineNodes = [
  { x: 62,  label: 'Fall',    ref: 'Gen 3:15'  },
  { x: 212, label: 'Abraham', ref: 'Gen 12/15' },
  { x: 362, label: 'Moses',   ref: 'Ex 19'     },
  { x: 512, label: 'David',   ref: '2 Sam 7'   },
]

const ncPromises = [
  { ref: 'Heb 8:10a', quote: '"I will put my laws into their minds, and write them on their hearts"', note: 'Internal transformation — not an external code but inward obedience' },
  { ref: 'Heb 8:10b', quote: '"I will be their God, and they shall be my people"', note: 'Covenant union — personal, unbreakable, already accomplished' },
  { ref: 'Heb 8:11',  quote: '"They shall all know me, from the least of them to the greatest"', note: 'Universal knowledge — no mediator required between members' },
  { ref: 'Heb 8:12',  quote: '"I will be merciful toward their iniquities, and I will remember their sins no more"', note: 'Full and final forgiveness — not typified, but accomplished' },
]

const subForm = [
  { text: '"Do this and live" sanctions', ref: 'Ex 19:5' },
  { text: 'National blessings and curses', ref: 'Deut 28' },
  { text: 'Could be — and was — broken', ref: 'Jer 31:32' },
  { text: 'Ministration of condemnation', ref: '2 Cor 3:9' },
]

const subPurpose = [
  { text: 'Handmaid to the Covenant of Grace', ref: 'Coxe' },
  { text: 'Shadow of the heavenly substance', ref: 'Col 2:17' },
  { text: 'Schoolmaster to lead to Christ', ref: 'Gal 3:24' },
  { text: 'Frame for Christ born under the law', ref: 'Gal 4:4' },
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
        1689 Federalism holds that the New Covenant <em>is</em> the Covenant of Grace — not merely its final administration. The Old Testament covenants were real and distinct, but subservient: they revealed and anticipated the covenant that Christ would enact. This is not a retrieval project. It is a way of reading Scripture.
      </p>

      {/* ── Diagram 1: Covenant Timeline ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">One Covenant of Grace, Revealed by Steps</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">John Owen <em>· Hebrews Commentary, 1680</em></span>
          <span className="fed-figure-chip">Edward Hutchinson <em>· Particular Baptist, 1676</em></span>
        </div>
        <p className="fed-infographic-desc">
          The substance of the Covenant of Grace — Christ — is present from Genesis 3:15. But a promise is not yet a covenant. The Old Testament covenants reveal and anticipate. The New Covenant <em>enacts</em>. John Owen and Edward Hutchinson both argued from the Greek of Hebrews 8:6: the New Covenant was <em>νενομοθέτηται</em> — legislated, ratified, brought formally into force.
        </p>

        <div className="fed-svg-wrap">
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
      </section>

      {/* ── Diagram 2: NC = CoG ── */}
      <section className="fed-infographic-section">
        <h2 className="fed-infographic-title">The New Covenant Is the Covenant of Grace</h2>
        <div className="fed-figures-row">
          <span className="fed-figure-chip">Hercules Collins <em>· 1689 LBCF Signer</em></span>
          <span className="fed-figure-chip">Thomas Patient <em>· Particular Baptist, c. 1654</em></span>
        </div>
        <p className="fed-infographic-desc">
          Hebrews 8:10–12, quoting Jeremiah 31:33–34, gives the definition of the New Covenant. These four promises are what the Covenant of Grace <em>is</em>. This is why the Particular Baptists equated the two — not by assertion, but by exegesis.
        </p>

        <div className="fed-def-diagram">
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
          The Mosaic Covenant has a works-structure — <em>do this and live</em> — but it is neither the original Covenant of Works nor the Covenant of Grace. It is a third thing: the <em>foedus subserviens</em>. Works-featured in form; grace-serving in purpose.
        </p>

        <div className="fed-rel-diagram">
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
