'use client'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      alert('로그아웃 성공')
      router.push('/signin')
    }
  }

  return (
    <nav className="flex">
      <Link href="/" className="p-2 rounded hover:bg-gray-200">
        메인
      </Link>
      <Link href="/posts" className="p-2 rounded hover:bg-gray-200">
        글목록
      </Link>
      {user ? (
        <>
          <div className="p-2 rounded hover:bg-gray-200">
            {user.email}님 반갑습니다.
          </div>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link href="/signup" className="p-2 rounded hover:bg-gray-200">
            회원가입
          </Link>
          <Link href="/signin" className="p-2 rounded hover:bg-gray-200">
            로그인
          </Link>
        </>
      )}
    </nav>
  )
}
