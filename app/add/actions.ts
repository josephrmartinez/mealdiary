'use client'

import { createClient } from "@/utils/supabase/client";

export const uploadToSupabase = async (image: File) => {

    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const userId = user.data.user?.id

    const fileName = image.name + '-' + Date.now();

    try {
        const { data, error } = await supabase
            .storage
            .from('meals')
            .upload(`${userId}/${fileName}`, image)


        if (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }

        // If upload was successful, construct the URL
        const imageUrl = supabase
            .storage
            .from('meals')
            .getPublicUrl(`${userId}/${fileName}`)
        
        return imageUrl.data.publicUrl;
        } catch (error) {
            console.error('Error during file upload:', error);
            return null;
        }
 };