'use client'
// Upload from client or server?

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client';

// Upload image into user subfolder. Specity type of file. Return download url. Call first AI function
export const uploadToSupabase = async (image: File) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const userId = user.data.user?.id

    const fileName = `image_${Date.now()}.jpg`; // Generate a unique file name here

    const { data, error } = await supabase
  .storage
  .from('meals')
  .upload(`${userId}/${fileName}`, image, {
    cacheControl: '3600',
    upsert: false
  }) 
 };