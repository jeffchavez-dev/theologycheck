const cards = [
  {
    n: '01', label: 'Novelty',
    claim: 'Invented by James Renihan',
    fact: 'The view traces to 17th-century Particular Baptists — Nehemiah Coxe and the framers of the 1689 LBC. Renihan recovered and articulated it; he did not invent it.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 3 C22 9 12 20 9 37"/><path d="M34 3 C38 13 30 26 9 37"/>
        <path d="M9 37 L7 42 L13 40"/>
        <path d="M28 9 C24 13 18 18 14 24" strokeWidth="0.9" strokeDasharray="2.5,1.5"/>
        <path d="M31 11 C26 15 20 20 16 27" strokeWidth="0.9" strokeDasharray="2.5,1.5"/>
      </svg>
    ),
  },
  {
    n: '02', label: 'Confusion',
    claim: 'The Old Covenant = Covenant of Works',
    fact: '1689 Federalism distinguishes the Mosaic covenant from the CoW. The OC is not a republication of the pre-fall covenant of works; it has its own distinct character.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="12" height="19" rx="4"/><rect x="16" y="5" width="12" height="19" rx="4"/>
        <line x1="4" y1="11" x2="10" y2="11"/><line x1="4" y1="14.5" x2="10" y2="14.5"/><line x1="4" y1="18" x2="10" y2="18"/>
        <line x1="19" y1="11" x2="25" y2="11"/><line x1="19" y1="14.5" x2="25" y2="14.5"/><line x1="19" y1="18" x2="25" y2="18"/>
        <line x1="31" y1="12" x2="41" y2="12"/><line x1="31" y1="17" x2="41" y2="17"/>
        <line x1="39" y1="8.5" x2="33" y2="20.5"/>
      </svg>
    ),
  },
  {
    n: '03', label: 'Law',
    claim: 'OT salvation by law was hypothetically possible',
    fact: '1689 Federalism denies this entirely. No sinner was or could be justified by the law. The ground of salvation in both Testaments is grace alone, through faith alone, in Christ alone.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 38 L7 18 Q7 8 21 8 Q35 8 35 18 L35 38"/>
        <line x1="4" y1="38" x2="38" y2="38"/>
        <line x1="14" y1="18" x2="14" y2="38"/><line x1="21" y1="14" x2="21" y2="38"/><line x1="28" y1="18" x2="28" y2="38"/>
        <line x1="9" y1="12" x2="33" y2="36" strokeWidth="2"/><line x1="33" y1="12" x2="9" y2="36" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    n: '04', label: 'Sources',
    claim: 'Borrowed from Meredith Kline',
    fact: 'Both critique the OC-as-CoG view, but 1689 Federalism derives its position from the Particular Baptist tradition and confessional documents — not from Kline\'s framework.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 36 L5 32 L5 8 L21 12 Z"/>
        <line x1="8" y1="13" x2="18" y2="16"/><line x1="8" y1="18" x2="18" y2="21"/><line x1="8" y1="23" x2="18" y2="26"/>
        <line x1="21" y1="12" x2="21" y2="36"/>
        <path d="M21 36 L37 32 L37 8 L21 12 Z"/>
        <line x1="34" y1="13" x2="24" y2="16"/><line x1="34" y1="18" x2="24" y2="21"/><line x1="34" y1="23" x2="24" y2="26"/>
      </svg>
    ),
  },
  {
    n: '05', label: 'Grace',
    claim: 'OT believers were not saved by grace',
    fact: '1689 Federalism fully affirms salvation by grace in both Testaments. OT saints were saved by the same Christ, through the same gospel promise, by faith alone.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="21,4 25,13 35,13 27,19 30,29 21,23 12,29 15,19 7,13 17,13"/>
        <line x1="21" y1="31" x2="21" y2="38"/>
        <line x1="13" y1="34" x2="16" y2="31"/><line x1="29" y1="34" x2="26" y2="31"/>
        <line x1="10" y1="40" x2="13" y2="37"/><line x1="32" y1="40" x2="29" y2="37"/>
      </svg>
    ),
  },
  {
    n: '06', label: 'Preaching',
    claim: 'Inhibits preaching the gospel from the OT',
    fact: 'The CoG was present and proclaimed in the OT — to Adam, Abraham, David. The gospel is woven through the OT promise-covenant structures, and 1689 Federalism affirms this fully.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 32 Q2 32 2 26 L2 14 Q2 8 6 8 L36 8 L36 32 Q36 36 32 36 L6 36 Q2 36 2 32"/>
        <ellipse cx="6" cy="20" rx="3" ry="12"/><ellipse cx="36" cy="20" rx="3" ry="12"/>
        <line x1="10" y1="14" x2="31" y2="14"/><line x1="10" y1="19" x2="31" y2="19"/><line x1="10" y1="24" x2="24" y2="24"/>
        <line x1="34" y1="30" x2="41" y2="30"/>
        <polyline points="38,27 41,30 38,33"/>
      </svg>
    ),
  },
  {
    n: '07', label: 'Decalogue',
    claim: 'Leads to rejecting the Ten Commandments',
    fact: '1689 Federalists affirm the moral law\'s perpetuity. The NC\'s distinctiveness does not entail that the Decalogue\'s moral content is abolished or no longer binding on believers.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="10" height="14" rx="3"/><rect x="20" y="2" width="10" height="14" rx="3"/>
        <line x1="11" y1="7" x2="15" y2="7"/><line x1="11" y1="10" x2="15" y2="10"/>
        <line x1="23" y1="7" x2="27" y2="7"/><line x1="23" y1="10" x2="27" y2="10"/>
        <path d="M7 20 L21 16 L35 20 L35 30 Q21 40 7 30 Z"/>
        <polyline points="13,27 18,32 29,22" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    n: '08', label: 'Israel',
    claim: 'The Church replaces Israel',
    fact: '1689 Federalism upholds a clear distinction between typological-national Israel and the spiritual seed of the covenant. It does not absorb or replace one with the other.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="3.5"/>
        <path d="M3 24 Q3 17 10 17 Q17 17 17 24"/>
        <line x1="21" y1="3" x2="21" y2="39" strokeDasharray="3.5,2.5"/>
        <polygon points="31,5 33.5,10 38,10 34.5,13.5 36,19 31,16 26,19 27.5,13.5 24,10 28.5,10"/>
        <line x1="13" y1="33" x2="29" y2="33"/><line x1="13" y1="37" x2="29" y2="37"/>
        <line x1="27" y1="30" x2="23" y2="40"/>
      </svg>
    ),
  },
  {
    n: '09', label: 'Exclusivity',
    claim: 'The only valid reading of the 1689 LBC',
    fact: '1689 Federalism claims exegetical and confessional warrant — not exclusive ownership. Other readings within the Particular Baptist tradition have standing and deserve honest engagement.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="14" width="11" height="24" rx="0.5"/><path d="M1 14 Q6.5 6 12 14"/>
        <rect x="15" y="10" width="12" height="28" rx="0.5"/><path d="M15 10 Q21 2 27 10"/>
        <rect x="30" y="14" width="11" height="24" rx="0.5"/><path d="M30 14 Q35.5 6 41 14"/>
        <circle cx="10.5" cy="27" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="25" cy="25" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="39.5" cy="27" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    n: '10', label: 'Revelation',
    claim: 'No progressive revelation of the Covenant of Grace',
    fact: '1689 Federalism affirms progressive revelation. The CoG was disclosed incrementally — from Gen 3:15 through Abraham, David, and the prophets — until its full NC administration.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4,38 4,32 10,32 10,26 16,26 16,20 22,20 22,14 28,14 28,8 34,8"/>
        <polyline points="31,5 34,8 37,5"/>
        <circle cx="7" cy="32" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="13" cy="26" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="19" cy="20" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="25" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="31" cy="8" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    n: '11', label: 'Covenant',
    claim: 'No Covenant of Grace in the Old Testament',
    fact: '1689 Federalism affirms a CoG in the OT — rooted in Gen 3:15 and present through the patriarchal and Mosaic periods — administered through types and shadows pointing to Christ.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="32" height="26" rx="1"/>
        <ellipse cx="21" cy="8" rx="16" ry="3"/><ellipse cx="21" cy="34" rx="16" ry="3"/>
        <line x1="10" y1="14" x2="32" y2="14"/><line x1="10" y1="18.5" x2="32" y2="18.5"/><line x1="10" y1="23" x2="23" y2="23"/>
        <line x1="29" y1="31" x2="29" y2="24"/>
        <path d="M29 28 Q25 25 23 26" strokeWidth="1.2"/>
        <path d="M29 26 Q33 23 35 24" strokeWidth="1.2"/>
        <line x1="27" y1="24" x2="31" y2="24" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    n: '12', label: 'Typology',
    claim: 'Rejects the promise-fulfillment model',
    fact: '1689 Federalism fully embraces promise and fulfillment. The OT covenants contained and administered the promise of Christ who was to come; the NC is its fulfillment.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="8" cy="36" rx="4.5" ry="3"/>
        <line x1="8" y1="33" x2="8" y2="30"/>
        <path d="M10 32 Q20 18 28 12" strokeDasharray="3,2.5"/>
        <line x1="34" y1="40" x2="34" y2="24"/><circle cx="34" cy="16" r="9"/>
        <circle cx="30" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="37" cy="12" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="34" cy="20" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    n: '13', label: 'Diversity',
    claim: 'Flattens the OC covenants into a single CoW',
    fact: '1689 Federalism distinguishes the Noahic, Abrahamic, Mosaic, and Davidic covenants — each with unique purposes and character. It does not flatten them all into one works-covenant.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="38" height="6" rx="1"/>
        <line x1="8" y1="8" x2="14" y2="8" strokeWidth="0.9"/>
        <rect x="6" y="14" width="30" height="6" rx="1"/>
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
        <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none"/>
        <circle cx="22" cy="17" r="1" fill="currentColor" stroke="none"/>
        <rect x="3" y="23" width="24" height="6" rx="1"/>
        <line x1="7" y1="26" x2="13" y2="26" strokeWidth="0.9"/><line x1="7" y1="28.5" x2="13" y2="28.5" strokeWidth="0.9"/>
        <rect x="16" y="32" width="22" height="6" rx="1"/>
        <line x1="20" y1="35" x2="24" y2="35" strokeWidth="0.9"/>
      </svg>
    ),
  },
  {
    n: '14', label: 'Obedience',
    claim: 'The Mosaic = CoW because it demands obedience',
    fact: 'Demand alone does not make a covenant a CoW. The Mosaic demanded obedience as its national-typological structure — but obedience and a covenant of works are not the same thing.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="11" height="17" rx="3.5"/><rect x="14" y="5" width="11" height="17" rx="3.5"/>
        <line x1="4" y1="10" x2="9" y2="10"/><line x1="4" y1="13.5" x2="9" y2="13.5"/>
        <line x1="17" y1="10" x2="22" y2="10"/><line x1="17" y1="13.5" x2="22" y2="13.5"/>
        <line x1="27" y1="11" x2="35" y2="11"/><line x1="27" y1="16" x2="35" y2="16"/>
        <line x1="34" y1="8" x2="29" y2="19"/>
        <rect x="31" y="23" width="10" height="6" rx="1"/>
        <line x1="36" y1="29" x2="36" y2="36"/>
        <ellipse cx="36" cy="37.5" rx="4.5" ry="2" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    n: '15', label: 'Presence',
    claim: 'The CoG is only "in some sense" present in the OT',
    fact: '1689 Federalism affirms a genuine — not merely nominal — CoG in the OT. The substance of the CoG (Christ and his benefits) was truly present (mystery).',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10 Q4 6 8 6 Q12 6 12 10 Q12 14 8 15 L6 18"/>
        <path d="M14 10 Q14 6 18 6 Q22 6 22 10 Q22 14 18 15 L16 18"/>
        <line x1="6" y1="26" x2="36" y2="26"/>
        <line x1="6" y1="30" x2="36" y2="30" strokeDasharray="3,2"/>
        <line x1="21" y1="32" x2="21" y2="38"/>
        <polyline points="18,36 21,39 24,36"/>
      </svg>
    ),
  },
  {
    n: '16', label: 'Origins',
    claim: 'The CoG did not begin after the Fall',
    fact: '1689 Federalism teaches that the CoG was inaugurated after the Fall — with the protoevangelion in Gen 3:15. It does not exist in eternity or prior to sin, but was revealed immediately after it.',
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="38" y2="21"/>
        <circle cx="8" cy="21" r="2.5"/>
        <line x1="16" y1="16" x2="20" y2="20"/><line x1="20" y1="16" x2="16" y2="20"/>
        <circle cx="18" cy="21" r="2.5" fill="currentColor" stroke="none"/>
        <circle cx="26" cy="21" r="2.5" fill="currentColor" stroke="none"/>
        <circle cx="34" cy="21" r="2.5" fill="currentColor" stroke="none"/>
        <polyline points="36,18 39,21 36,24"/>
        <line x1="8" y1="21" x2="8" y2="27"/><line x1="18" y1="21" x2="18" y2="27"/>
        <line x1="26" y1="21" x2="26" y2="27"/><line x1="34" y1="21" x2="34" y2="27"/>
      </svg>
    ),
  },
]

export default function Misconceptions1689() {
  return (
    <section className="fed-infographic-section">
      <h2 className="fed-infographic-title">Common Misconceptions</h2>
      <p className="fed-infographic-desc">
        A working catalogue of frequently heard objections and misreadings of 1689 Federalism — with brief corrections. More entries forthcoming.
      </p>
      <div className="misc-grid">
        {cards.map(c => (
          <div key={c.n} className="misc-card">
            <div className="misc-icon">{c.icon}</div>
            <p className="misc-n">{c.n} — {c.label}</p>
            <p className="misc-claim">{c.claim}</p>
            <p className="misc-fact">{c.fact}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
