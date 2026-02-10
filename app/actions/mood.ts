'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logMood(rating: number, note?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase.from('mood_logs').insert({
    user_id: user.id,
    mood_rating: rating,
    note: note,
  })

  if (error) {
    console.error('Error logging mood:', error)
    throw new Error('Failed to log mood')
  }

  revalidatePath('/home')
  revalidatePath('/profile')
  return { success: true }
}

export async function getRecentMoods() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('mood_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching moods:', error)
    return []
  }

  return data
}
