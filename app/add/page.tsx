'use client'

import ImageUploader from "@/components/ImageUploader"
import { uploadToSupabase } from "./actions"

export default function LogMeal() {

    const handleUpload = async (image: File) => {
        const imageUrl = await uploadToSupabase(image);

        // Send image URL to Vision GPT, update data state with results
        console.log("imageUrl", imageUrl)
      };

    return (
        <div>

            <ImageUploader onUpload={handleUpload} />

        </div>
    )
}