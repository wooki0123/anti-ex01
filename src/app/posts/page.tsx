'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])

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
