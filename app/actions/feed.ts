'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(content: string, isAnonymous: boolean) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase.from('posts').insert({
    user_id: user.id,
    content: content,
    is_anonymous: isAnonymous,
  })

  if (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }

  revalidatePath('/feed')
  return { success: true }
}

export async function getPosts() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  // We want to fetch posts, and ideally know if the current user liked them.
  // Supabase complex joins can be tricky in one go without types.
  // For MVP, fetch posts, then fetch likes for this user.

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (display_name, avatar_url),
      post_likes (user_id)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  // Transform data to include 'liked' status
  return posts.map((post) => ({
    ...post,
    liked: post.post_likes.some((like: { user_id: string }) => like.user_id === userId),
    likes: post.post_likes.length,
    replies: post.comments_count || 0
  }))
}

export async function likePost(postId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Check if already liked
  const { data: existingLike } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    // Unlike
    await supabase.from('post_likes').delete().eq('id', existingLike.id)
  } else {
    // Like
    await supabase.from('post_likes').insert({
      post_id: postId,
      user_id: user.id
    })
  }

  revalidatePath('/feed')
}
