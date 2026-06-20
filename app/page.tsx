import { getAllPosts } from '@/lib/posts'
import PostsFilter from '@/components/PostsFilter'

export default function Home() {
  const posts = getAllPosts()
  const featured = posts[0] ?? null
  const rest = posts.slice(1)

  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags))
  ).sort()

  return (
    <>
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-line" />
          <p>
            &ldquo;Id ergo quod subsistit in Deo, est suum esse.&rdquo;<br />
            <span className="hero-ref">— Thomas Aquinas, Iª q. 3 a. 4 s. c.</span>
          </p>
        </div>
      </div>

      <div className="main">
        <PostsFilter featured={featured} rest={rest} allTags={allTags} />
        <div className="divider">✦ ✦ ✦</div>
      </div>
    </>
  )
}
