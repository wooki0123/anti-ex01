'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostList() {
  const [posts, setPosts] = useState<
    Array<{ id: number; title: string; content: string }>
  >([])

  const fetchData = async () => {
    let { data: posts, error } = await supabase.from('posts').select('*')
    setPosts(posts ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ul className="p-2">
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.id}/ {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
