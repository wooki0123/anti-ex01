'use client'

import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase.from('posts').select('*')
    setPost(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div>{post.id} 번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.id}</div>
    </>
  )
}
