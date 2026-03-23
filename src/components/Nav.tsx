import Link from 'next/Link'

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
    </nav>
  )
}
