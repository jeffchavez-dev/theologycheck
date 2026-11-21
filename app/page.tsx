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
            &ldquo;[Theology is] a work of pious intelligence whose foundation and first moving cause is God&rsquo;s loving communication of knowledge of himself to the saints, and whose end is the vision of God.&rdquo;<br />
            <span className="hero-ref">— John Webster</span>
          </p>
        </div>
      </div>

      <div className="home-wrapper">
        <PostsFilter featured={featured} rest={rest} allTags={allTags} />
        <div className="divider">✦ ✦ ✦</div>
      </div>
    </>
  )
}
