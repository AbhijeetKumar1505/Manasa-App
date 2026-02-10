'use client'

import { logMood } from '@/app/actions/mood'
import { useState, useTransition } from 'react'

const MOODS = [
  { rating: 5, emoji: '😊', label: 'Great' },
  { rating: 4, emoji: '🙂', label: 'Good' },
  { rating: 3, emoji: '😐', label: 'Meh' },
  { rating: 2, emoji: '😔', label: 'Low' },
  { rating: 1, emoji: '😰', label: 'Anxious' },
]

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleLog = async () => {
    if (selectedMood === null) return
    startTransition(async () => {
      try {
        await logMood(selectedMood, note)
        setSelectedMood(null)
        setNote('')
        // Ideally show success toast
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        {MOODS.map((mood) => (
          <button
            key={mood.rating}
            onClick={() => setSelectedMood(mood.rating)}
            className={`flex flex-col items-center gap-2 group transition-all ${
              selectedMood === mood.rating ? 'scale-110' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-transform duration-150 ${
                selectedMood === mood.rating
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-background-light dark:bg-slate-800'
              }`}
            >
              {mood.emoji}
            </div>
            <span
              className={`text-xs font-medium ${
                selectedMood === mood.rating ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white transition-all disabled:opacity-50"
          placeholder="Want to say more?"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLog()}
          disabled={isPending}
        />
        {selectedMood !== null && (
          <button
            onClick={handleLog}
            disabled={isPending}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary p-2 hover:bg-primary/10 rounded-full transition-colors"
          >
            <span className="material-icons-round text-xl">send</span>
          </button>
        )}
      </div>
    </div>
  )
}
