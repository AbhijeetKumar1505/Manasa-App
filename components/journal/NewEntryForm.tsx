'use client'

import { createEntry } from '@/app/actions/journal'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

const MOOD_TAGS = ['Calm', 'Stressed', 'Grateful', 'Overwhelmed', 'Hopeful']

export default function NewEntryForm() {
  const [content, setContent] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = () => {
    if (!content.trim()) return

    const title = content.split('\n')[0].substring(0, 50) + (content.length > 50 ? '...' : '')

    startTransition(async () => {
      try {
        await createEntry(title, content, selectedMood, isPrivate)
        // Redirect handled in server action via revalidatePath?
        // No, revalidatePath refreshes data, but redirect needs to happen.
        // Wait, server action can return redirect? No, I need to check auth.ts.
        // auth.ts uses redirect().
        // journal.ts does not.
        // I should verify if I need to redirect manually.
        // The action revalidates '/journal'. I should redirect to '/journal'.
        router.push('/journal')
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main Writing Space */}
      <div className="flex-1 px-8 py-4 overflow-y-auto hide-scrollbar">
        <textarea
          className="w-full h-full bg-transparent border-none p-0 text-lg leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none focus:ring-0 outline-none"
          placeholder="Start typing your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        ></textarea>
      </div>

      {/* Tool & Actions Bar */}
      <div className="px-6 pb-2">
        {/* Contextual Toolbar */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-2 flex items-center justify-between mb-4 border border-primary/5">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400">
              <span className="material-icons-round text-lg text-primary">add_reaction</span>
              <span className="text-xs font-medium">Add Mood</span>
            </button>
            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button className="p-2 rounded-xl text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-round text-lg">image</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
                onClick={() => setIsPrivate(!isPrivate)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${isPrivate ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}
            >
              <span className="material-icons-round text-sm">{isPrivate ? 'lock' : 'public'}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">{isPrivate ? 'Private' : 'Public'}</span>
            </button>
          </div>
        </div>

        {/* Mood Tag Suggestions */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
          {MOOD_TAGS.map(mood => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood === selectedMood ? '' : mood)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                selectedMood === mood
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Primary Action */}
        <button
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="material-icons-round text-xl">cloud_done</span>
          {isPending ? 'Saving...' : 'Save to My Space'}
        </button>
      </div>
    </div>
  )
}
