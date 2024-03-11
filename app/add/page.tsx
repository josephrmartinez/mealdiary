'use client'

import ImageUploader from "@/components/ImageUploader"
import { uploadToSupabase } from "./actions"

export default function LogMeal() {

    const handleUpload = (imageData: string) => {
        uploadToSupabase(imageData);
      };

    return (
        <div>

            <ImageUploader onUpload={handleUpload} />

        </div>
    )
}