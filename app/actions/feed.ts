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

  // 1. Fetch Posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (postsError) {
    console.error('Error fetching posts:', postsError)
    return []
  }

  if (!posts || posts.length === 0) return []

  // 2. Extract User IDs for Profiles
  const userIds = Array.from(new Set(posts.map(p => p.user_id)))

  // 3. Fetch Profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, display_name, avatar_url')
    .in('id', userIds)

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
  }

  // Define Profile Type to allow mapping
  interface Profile {
    id: string;
    display_name: string;
    avatar_url: string | null;
  }

  const profilesMap = new Map((profiles as Profile[])?.map(p => [p.id, p]) || [])

  // 4. Fetch Likes for Current User
  let userLikes = new Set<string>()
  if (userId) {
    const { data: likes } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', userId)
      .in('post_id', posts.map(p => p.id))

    if (likes) {
      likes.forEach(l => userLikes.add(l.post_id))
    }
  }

  // 5. Merge Data
  return posts.map((post) => {
    const profile = profilesMap.get(post.user_id)
    return {
      ...post,
      profiles: profile ? { display_name: profile.display_name, avatar_url: profile.avatar_url } : null,
      liked: userLikes.has(post.id),
      likes: post.likes_count || 0,
      replies: post.comments_count || 0
    }
  })
}

export async function likePost(postId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: existingLike } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    await supabase.from('post_likes').delete().eq('id', existingLike.id)
  } else {
    await supabase.from('post_likes').insert({
      post_id: postId,
      user_id: user.id
    })
  }

  revalidatePath('/feed')
}
