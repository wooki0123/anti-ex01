'use client'

import { supabase } from '@/app/supabase/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostList() {
  const [posts, setPosts] = useState([])

  const fetchData = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*')
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
