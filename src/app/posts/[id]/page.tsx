'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

interface Comment {
  id: number
  post_id: number
  content: string
  created_at: string
}

export default function PostDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setPost(post)
  }

  const fetchComments = async () => {
    const { data: comments, error } = await supabase
      .from('comment')
      .select('*')
      .eq('post_id', id as string)
    setComments(comments ?? [])
  }

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  const handleOnClick = async (id: number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      console.log(error)
    } else {
      alert('삭제 성공')
      router.push('/posts')
    }
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>{post.id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}> - {comment.content}</li>
        ))}
      </ul>
      <button
        className="p-2 rounded border-1 hover:bg-gray-200"
        onClick={() => handleOnClick(post.id)}
      >
        삭제
      </button>
      <Link href={`/posts/${post.id}/edit`}>
        <button className="p-2 rounded border-1 hover:bg-gray-200">수정</button>
      </Link>
    </>
  )
}
