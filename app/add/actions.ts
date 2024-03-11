'use client'
// Upload from client or server?

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client';


export const uploadToSupabase = async (imageData: string) => {
    const supabase = createClient()
    // Your Supabase upload logic here
    // Example:
    await supabase.storage.from('bucket_name').upload('file_name.jpg', imageData.split(';base64,')[1], { contentType: 'image/jpeg' });
  };