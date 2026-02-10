'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEntry(title: string, content: string, moodTag: string, isPrivate: boolean) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase.from('journal_entries').insert({
    user_id: user.id,
    title: title,
    content: content,
    mood_tag: moodTag,
    is_private: isPrivate,
  })

  if (error) {
    console.error('Error creating journal entry:', error)
    throw new Error('Failed to create journal entry')
  }

  revalidatePath('/journal')
  revalidatePath('/home')
  return { success: true }
}

export async function getEntries() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching journal entries:', error)
    return []
  }

  return data
}
