'use client'

import { createClient } from "@/utils/supabase/client";
import { MealInfo } from "../database.types";

export const uploadImageToSupabase = async (image: File) => {

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


export const logMeal = async (mealInfo: MealInfo) => {

    const supabase = createClient()

    try {
        const { data, error } = await supabase
            .from('meals')
            .insert(mealInfo)
            .select()


        if (error) {
            console.error('Error inserting new row:', error.message);
            
        }
        return data;
    } catch (error) {
        console.error('Error inserting new row:', error);
    }

    
 };