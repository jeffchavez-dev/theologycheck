'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('tc-auth') === '1') {
      setAuthed(true)
    } else {
      router.replace('/admin')
    }
  }, [router])

  if (!authed) return null

  return <>{children}</>
}
