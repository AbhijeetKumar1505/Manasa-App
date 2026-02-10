'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signInAnonymously() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInAnonymously()

  if (error) {
    console.error('Error logging in anonymously:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/home')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
