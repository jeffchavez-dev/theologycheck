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
        <h2><i>A Reformed Baptist and Biblical Language Geek Retrieving Classical Theism</i> </h2>

        <p>I began this blog more than a decade ago, driven by a passion for the Reformed faith and to write reflections about my <a href="https://theologycheckblog.wordpress.com/2020/12/29/why-write-a-blog/">theological journey</a>. With a renewed desire to share the beauty of classical theism and theological retrieval which I gleaned from the books I've read for the past two years, this redesigned blog is dedicated to the public that they may also enjoy and behold the splendid glory of God as it is articulated by the saints of the past.</p>
        <p>
          My name is <strong>Jeff F. Chavez</strong>, a servant of the Lord Jesus Christ, joyfully married to{' '}
          <strong>Gloryben</strong>, and the father of our daughter, <strong>Mira</strong> — a daily reminder of
          God&apos;s covenant faithfulness. I am a Christian.
        </p>

        <p>
          I write and teach with a heart set on the <strong>glory of the holy, simple, impassible,
          self-sufficient, eternal, sovereign, glorious, and good Triune God</strong>, aiming to magnify Him
          through clear, reverent, and faithful handling of His Word and recasting the riches of the past for the edification of the church and the exaltation of Christ.
        </p>

        <p>
          My theological focus encompasses{' '}
          <a href="/blog/2026-01-09-what-is-classical-theism">classical theism</a>, the biblical languages
          (Hebrew and Greek), and historic Particular Baptist doctrine (as outlined in the 1689 Baptist
          Confession). I have developed a passion about theological retrieval. I seek to recover and rearticulate the profound insights of the church fathers, medieval scholastics, and early modern theologians in a way that is accessible and edifying for present church of Christ. I am unashamedly a Reformed Thomist and a confessional Particula Baptist. I wish I can simply say that I am a Christian, plain and simple, but my walk with the Lord has led me to a deeper appreciation of the rich theological heritage of the one, holy, catholic, and apostolic church.
        </p>

        <p>
          Thanks to my friend{' '}
          <a href="https://www.facebook.com/paige.paje" target="_blank" rel="noopener noreferrer">Neiko Guil-an Paje</a>,
          student of IRBS Seminary, who generously allowed me to post his academic papers on classical theism.
        </p>

        <blockquote>
          <p>&ldquo;[Theology is] a work of pious intelligence whose foundation and first moving cause is God’s loving communication of knowledge of himself to the saints, and whose end is the vision of God.&rdquo; (John Webster)</p>
        </blockquote>
            
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
