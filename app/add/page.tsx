'use client'

import ImageUploader from "@/components/ImageUploader"
import { uploadToSupabase } from "./actions"

export default function LogMeal() {

    const handleUpload = (image: File) => {
        uploadToSupabase(image);
      };

    return (
        <div>

            <ImageUploader onUpload={handleUpload} />

        </div>
    )
}