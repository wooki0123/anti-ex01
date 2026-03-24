'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content }])
      .select()

    if (error) {
      console.log(error)
    } else {
      alert('글쓰기 성공!')
      router.push('/posts')
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
      <button className="p-2 rounded border-1 hover:bg-gray-200">등록</button>
    </form>
  )
}
