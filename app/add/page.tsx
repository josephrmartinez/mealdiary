'use client'

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader"
import { uploadToSupabase } from "./actions"
import { AnalyzeImage } from "@/utils/ai/predictions";
import MealForm from "./MealForm";

export default function LogMeal() {
    const [results, setresults] = useState<string | null>(null)

    const handleUpload = async (image: File) => {
        const imageUrl = await uploadToSupabase(image);
        console.log("imageUrl", imageUrl)

        if (imageUrl) {
        const prediction = await AnalyzeImage(imageUrl)
        console.log("results", prediction.choices[0].message.content)

        if (prediction.choices[0].message.content) {
            const predictionObject = JSON.parse(prediction.choices[0].message.content)
            setresults(prediction.choices[0].message.content)
        }
        
        }
      };

      const handleSubmitMeal = () => {
        console.log("meal logged")
      }


      const test = 
        {
        mealDescription: "Plate with scrambled eggs, pulled chicken, avocado, and onions",
        protein: 35, 
        carbs: 15, 
        sugar: 3, 
        fat: 25, 
        fiber: 7, 
        calories: 450 }

    return (
        <div className="flex flex-col w-[512px] mt-4">

            <ImageUploader onUpload={handleUpload} />
            <div>
                <MealForm initialValues={test} onSubmit={handleSubmitMeal}/>

            </div>

        </div>
    )
}