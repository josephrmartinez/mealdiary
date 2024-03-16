'use client'

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader"
import { uploadToSupabase } from "./actions"
import { AnalyzeImage } from "@/utils/ai/predictions";
import MealForm from "./MealForm";
import { NutritionInfo } from "../database.types";



export default function LogMeal() {
    const [results, setResults] = useState<NutritionInfo | null>(null)

    const handleUpload = async (image: File) => {
        const imageUrl = await uploadToSupabase(image);
        console.log("imageUrl", imageUrl)

        if (imageUrl) {
        const prediction = await AnalyzeImage(imageUrl)
        console.log("prediction", prediction)

        if (prediction) {
            const predictionObject = JSON.parse(prediction)
            setResults(predictionObject)
        }
        
        }
      };

      const handleSubmitMeal = () => {
        console.log("meal logged")
      }

    return (
        <div className="mt-4 grid lg:grid-cols-2 gap-3">
            <ImageUploader onUpload={handleUpload} />
            <MealForm values={results} onSubmit={handleSubmitMeal}/>
        </div>
    )
}



// const test = 
// {
//   "meal_description": "Scrambled eggs, shredded chicken, avocado, and onions",
//   "protein_grams": 35,
//   "carbs_grams": 17,
//   "sugar_grams": 5,
//   "fat_grams": 28,
//   "fiber_grams": 10,
//   "calories": 450
// }