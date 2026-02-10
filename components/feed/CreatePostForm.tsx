'use client'

import { createPost } from '@/app/actions/feed'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePostForm() {
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true) // Default to anonymous for safety
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = () => {
    if (!content.trim()) return

    startTransition(async () => {
      try {
        await createPost(content, isAnonymous)
        router.push('/feed')
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Privacy Indicator */}
      <div className="px-6 mt-2 mb-6">
        <button
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors w-fit ${
            isAnonymous ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
          }`}
        >
          <span className="material-icons text-sm">{isAnonymous ? 'visibility_off' : 'visibility'}</span>
          <span className="text-xs font-semibold">{isAnonymous ? 'Posting anonymously' : 'Posting as You'}</span>
        </button>
      </div>

      {/* Text Area */}
      <div className="flex-1 relative px-6">
        <textarea
          className="w-full h-full bg-transparent border-none focus:ring-0 text-xl md:text-2xl placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none p-0 leading-relaxed font-light outline-none"
          placeholder="Say what you can’t say out loud..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        ></textarea>
      </div>

      {/* Bottom Tools */}
      <div className="pb-10 pt-4 space-y-6 px-6">
        {/* Reminder/Nudge */}
        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="material-icons text-slate-400 text-sm mt-0.5">info</span>
          <p className="text-sm text-slate-500 leading-snug">
            Be kind. Everyone here is human and looking for support, just like you.
          </p>
        </div>

        {/* Action Button Container */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Manasa Safe Space Policy</span>
            <span>{content.length} / 500</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isPending || !content.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="material-icons text-lg">shutter_speed</span>
            {isPending ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
