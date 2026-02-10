'use client'

import { signInAnonymously } from '@/app/actions/auth'
import { useTransition } from 'react'

export default function GetStartedButton() {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await signInAnonymously()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] text-lg text-center disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Starting...</span>
        </span>
      ) : (
        'Get Started'
      )}
    </button>
  )
}
