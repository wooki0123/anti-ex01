'use client'

import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPost() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setTitle(post.title)
    setContent(post.content)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id as string)
    if (error) {
      console.log(error)
    } else {
      alert('수정 성공')
      router.push(`/posts/${id}`)
    }
  }

  return (
    <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="제목"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="content"
        placeholder="내용"
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="p-2 rounded border-1 hover:bg-gray-200">수정</button>
    </form>
  )
}
