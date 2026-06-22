import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Theology Check',
  description: 'Jeff F. Chavez — classical theist, Particular Reformed Baptist, and student of the biblical languages.',
}

export default function AboutPage() {
  return (
    <main className="main" style={{ maxWidth: '680px' }}>
      <div className="post-header" style={{ borderBottom: '1px solid #e8ddd0', marginBottom: '2rem', paddingBottom: '1.5rem' }}>
        <p className="post-meta" style={{ marginBottom: '0.5rem' }}>About</p>
        <h1 className="post-title">Jeff F. Chavez</h1>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.15em', color: '#8b1a1a', textTransform: 'uppercase' }}>
          Soli Deo Gloria
        </p>
      </div>

      <div className="post-content">
        <p>
          My name is <strong>Jeff F. Chavez</strong>, a servant of the Lord Jesus Christ, joyfully married to{' '}
          <strong>Gloryben</strong>, and the father of our daughter, <strong>Mira</strong> — a daily reminder of
          God&apos;s covenant faithfulness. I am a Christian.
        </p>

        <p>
          I write and teach with a heart set on the <strong>glory of the holy, simple, impassible,
          self-sufficient, eternal, sovereign, glorious, and good Triune God</strong>, aiming to magnify Him
          through clear, reverent, and faithful handling of His Word.
        </p>

        <p>
          My theological focus encompasses{' '}
          <a href="/blog/2026-01-09-what-is-classical-theism">classical theism</a>, the biblical languages
          (Hebrew and Greek), and historic Particular Baptist doctrine (as outlined in the 1689 Baptist
          Confession), intending to equip the saints and exalt Christ in all things.
        </p>

        <p>
          I am currently taking the Greek Pedagogy course with{' '}
          <a href="https://www.taal-academy.org/" target="_blank" rel="noopener noreferrer">
            Tyndale Academy of Ancient Languages
          </a>
          . I am a student of the Reformed Baptist Institute of Pastoral Theology (modular courses).
        </p>

        <p>
          I am a covenant member of Trinity Reformed Baptist Church of Cavite, and I love the brethren there.
        </p>

        <p>My present labors include:</p>

        <ul>
          <li>
            A <strong>Tagalog exposition of the Baptist Catechism for children</strong>, praying that the next
            generation would treasure the gospel and delight in sound doctrine.
          </li>
          <li>
            <strong>Theoglossa</strong> – <em>παραβολη</em> — a{' '}
            <strong>beginner-friendly story in Biblical (Koine) Greek</strong> designed to help students retain
            and enjoy their Greek through an accessible narrative.
          </li>
        </ul>

        <blockquote>
          <p>&ldquo;None but the Triune God is worthy of our whole life&apos;s devotion, time, and effort.&rdquo;</p>
        </blockquote>

        <p>
          <strong>Contact:</strong>{' '}
          <a href="mailto:jeffchavez@1689.com">jeffchavez@1689.com</a>
        </p>

        <p>
          <em>To Him be glory in the church and in Christ Jesus throughout all generations.</em>
        </p>
      </div>
    </main>
  )
}
